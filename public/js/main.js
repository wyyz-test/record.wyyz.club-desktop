// 假设我们有一个数组，包含了我们想在表格中展示的数据

var tableData = JSON.parse(localStorage.getItem('tableData')) || [];
var tempTableData = JSON.parse(localStorage.getItem('tableData')) || [];
var autoLogin = localStorage.getItem('autoLogin') === "true";
var newVersionChecked = localStorage.getItem('newVersionChecked') === "true";

const version = '0.1.0'

// 可用的Bootstrap颜色类
const classes = [
    "table-primary", "table-secondary", "table-success",
    "table-danger", "table-warning", "table-info", "table-light"
];

let lastClass = '';  // 用来保持上一次添加的颜色类
let clickHandler = null
let isLogin = false
let userData = {}

// 随机选择一个颜色类，但不能与上一个相同
function getRandomClass() {
    let newClass = classes[Math.floor(Math.random() * classes.length)];
    while (newClass === lastClass) {
        newClass = classes[Math.floor(Math.random() * classes.length)];
    }
    lastClass = newClass;
    return newClass;
}

// 截断文本并添加悬浮工具提示
function truncateText(text, length) {
    return text.length <= length ? text : `<span class="text-truncate" title="${text}">${text.substring(0, length)}...</span>`;
}

// 动态生成下拉选择框选项的函数
function generateSelectOptions(selectElement, options) {
    selectElement.innerHTML = ""; // 清空现有选项
    options.forEach(option => {
        const opt = document.createElement('option');
        if (newVersionChecked) {
            option = old_to_new[option] !== undefined ? old_to_new[option] : option
        }
        opt.value = option;
        opt.textContent = option;
        selectElement.appendChild(opt);
    });
}

// 更新部位选择框
function updatePartsSelect() {
    const category = document.getElementById('categorySelect').value;
    const partsSelect = document.getElementById('partsSelect');
    partsSelect.innerHTML = ''; // 清空现有选项

    let partsOptions = [];
    if (category === '防具') {
        partsOptions = ['上衣', '下装', '腰带', '头肩', '鞋子'];
    } else if (category === '首饰') {
        partsOptions = ['手镯', '项链', '戒指'];
    } else if (category === '特殊') {
        partsOptions = ['左槽', '右槽', '耳环'];
    }

    partsOptions.forEach(part => {
        const option = document.createElement('option');
        option.value = part;
        option.textContent = part;
        partsSelect.appendChild(option);
    });

    updateSelectors(); // 更新其他选择器
}

async function hashPassword(password) {
    // 将字符串密码转换为ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    // 使用SHA-256进行哈希处理
    const hash = await crypto.subtle.digest('SHA-256', data);

    // 将ArrayBuffer转换为十六进制字符串
    const hashArray = Array.from(new Uint8Array(hash)); // 转换为字节数组
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return hashHex;
}

function sortData() {
    // 根据role属性进行排序
    tableData.sort((a, b) => a.role.localeCompare(b.role));
    console.log(tableData);
    localStorage.setItem('tableData', JSON.stringify(tableData));
    updataData()
    transferToNewVersion()
    refreshPage()
}

function showData() {
    let data = tableData;
    const roleStats = data.reduce((acc, item) => {
        if (!acc[item.role]) {
            acc[item.role] = {total: 0, parts: {}};
        }
        acc[item.role].total += 1;
        acc[item.role].parts[item.partsSelect] = (acc[item.role].parts[item.partsSelect] || 0) + 1;
        return acc;
    }, {});

    const gridContainer = document.getElementById('roleStatsGrid');
    gridContainer.innerHTML = ''; // 清除之前的内容

    Object.entries(roleStats).forEach(([role, stats], index) => {
        const col = document.createElement('div');
        // 每行显示6个元素，减小外边距
        col.className = 'col-2 mb-2';
        const partsTooltip = Object.entries(stats.parts).map(([part, count]) => `${part}: ${count}件`).join("\n");
        col.innerHTML = `
      <div class="card custom-card h-100" data-bs-toggle="tooltip" data-bs-html="true" title="${partsTooltip}" style="padding: 0.5rem; font-size: 0.75rem;">
        <div class="card-body" style="padding: 0.25rem;">
          <h5 class="card-title" style="font-size: 0.9rem;">${role}</h5>
          <p class="card-text" style="font-size: 0.75rem;">总件数: ${stats.total}</p>
        </div>
      </div>
    `;
        gridContainer.appendChild(col);
    });

    // 初始化Bootstrap工具提示
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {boundary: document.body}); // 确保工具提示不会被裁剪
    });

    var myModal = new bootstrap.Modal(document.getElementById('roleStatsModal'));
    myModal.show();
}

function showToast(title, message) {
    // 获取Toast元素和其子元素
    const toastEl = document.querySelector('#toastContainer .toast');
    const toastTitle = document.getElementById('toastTitle');
    const toastBody = document.getElementById('toastBody');

    // 设置标题和消息内容
    toastTitle.textContent = title;
    toastBody.textContent = message;

    // 初始化并显示Toast
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

function updateLoginName(username) {
    // 假设您有一个元素用于显示用户名，ID为"user-name"
    const userNameDisplay = document.getElementById('user-name');
    userNameDisplay.textContent = username;
}

function closeLoginModal() {
    try {
        // 获取已经初始化的Modal实例
        const loginModalEl = document.getElementById('loginModal');
        const loginModalInstance = bootstrap.Modal.getInstance(loginModalEl);
        loginModalInstance.hide();
    } catch (e) {
        // 在这里处理异常
        console.error(e);
        // 你可以在这里添加更多的错误处理逻辑，比如显示用户友好的错误消息等
    }
}


function login(username, password, type) {
    // 在登录逻辑中使用
    searchData(username)
        .then(data => {
            hashPassword(password).then(hashHex => {
                userData = {
                    username: username,
                    pwd: hashHex,
                    data: tableData
                };
                if (data['result'] == null) {
                    setData(username, userData)
                        .then(result => {
                            showToast("登录提示", "初次登录，密码设置成功");
                            updateLoginName(username); // 更新登录名
                            if (type === "manual") {
                                closeLoginModal()
                                saveUserInfoLocal(username, password)
                            }
                            isLogin = true
                            checkLogin(type)
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            showToast("登录提示", "登录失败~");
                        });
                } else if (JSON.parse(data['result'])['pwd'] === hashHex) {
                    showToast("登录提示", "登录成功~");
                    updateLoginName(username); // 更新登录名
                    if (type === "manual") {
                        closeLoginModal()
                        saveUserInfoLocal(username, password)
                    }
                    isLogin = true
                    checkLogin(type)
                } else {
                    showToast("登录提示", "登录失败~");
                }

            });
        })
        .catch(error => {
            console.error('Error:', error);
            showToast("操作失败", false);
        });
}

function saveUserInfoLocal(username, password) {
    let userInfo = {
        "用户名": username,
        "密码": password
    }
    localStorage.setItem('userNameAndPassWord', JSON.stringify(userInfo));
}


function updataData() {
    if (userData['data'] == null || userData['data'] == undefined || !isLogin) {
        console.log("未登录或用户数据不存在", userData['data'])
        return
    }
    userData['data'] = tableData
    setData(userData['username'], userData)
        .then(result => {
            showToast("上传提示", "上传成功~数据已保存~");
        })
        .catch(error => {
            console.error('Error:', error);
            showToast("上传提示", "上传失败~");
        })
}

function initialLogin() {
    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault(); // 阻止表单默认提交行为

        // 获取用户输入
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // 检查用户名和密码是否都已输入
        if (!username.trim() || !password.trim()) {
            showConfirmModal('错误提示', '用户名和密码都是必填项！', false)
                .then(() => {
                    console.log('知道了');
                    // 处理用户点击确认后的逻辑
                })
            return; // 中止函数执行
        }

        login(username, password, 'manual')

    });
}

// 初始化模态框和倒计时
function initializeModal() {
    const usageModal = new bootstrap.Modal(document.getElementById('usageModal'));
    let countdownInterval;
    const countdownText = document.getElementById('countdownText');

    if (!localStorage.getItem('noShowModalAgain')) {
        usageModal.show();
        let secondsLeft = 10;
        countdownText.innerText = `本提示将在 ${secondsLeft} 秒后自动关闭。`;

        countdownInterval = setInterval(() => {
            if (document.getElementById('disableAutoCloseCheck').checked) {
                clearInterval(countdownInterval);
                countdownText.innerText = '自动关闭已禁用。';
                return;
            }

            secondsLeft--;
            countdownText.innerText = `本提示将在 ${secondsLeft} 秒后自动关闭。`;
            if (secondsLeft <= 0) {
                clearInterval(countdownInterval);
                usageModal.hide();
            }
        }, 1000);
    }

    document.getElementById('noShowAgainCheck').addEventListener('change', (e) => {
        if (e.target.checked) {
            localStorage.setItem('noShowModalAgain', 'true');
        } else {
            localStorage.removeItem('noShowModalAgain');
        }
    });

    var loginButton = document.getElementById('loginButton');

    loginButton.addEventListener('click', function (event) {
        if (isLogin) {
            // 用户已登录，执行相应逻辑
            console.log('用户已登录，执行其他逻辑。');
            console.log("isLogin:", isLogin)
            showConfirmModal('退出登录', '确认要退出登录？', true)
                .then((result) => {
                    if (result) {
                        console.log('用户确认了操作');
                        // 这里处理用户确认的逻辑
                        isLogin = false
                        checkLogin("manual")
                        updateLoginName("未登录")
                        showToast("登录提示", "退出成功~")
                        localStorage.setItem('autoLogin', "false");
                    }
                })
                .catch((result) => {
                    console.log('用户取消了操作');
                    // 这里处理用户取消的逻辑
                });

        } else {
            // 用户未登录，手动打开模态框
            var loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            loginModal.show();
        }
    });
    initialLogin()


}

// 保存数据并更新表格的函数
function saveData() {
    const role = document.getElementById('inputRole').value;
    const categorySelect = document.getElementById('categorySelect').value;
    const partsSelect = document.getElementById('partsSelect').value;
    const name = document.getElementById('inputName').value;
    const icon = icons[name + partsSelect]
    const attr1 = document.getElementById('selectAttr1').value;
    const attr2 = document.getElementById('selectAttr2').value;
    const attr3 = document.getElementById('selectAttr3').value;
    const attr4 = document.getElementById('selectAttr4').value;
    const remark = document.getElementById('inputRemark').value;
    const id = uuid.v4();

    if (role && categorySelect && partsSelect && name && attr1 && attr2 && attr3 && attr4) {
        tableData.push({id, role, categorySelect, partsSelect, name, icon, attr1, attr2, attr3, attr4, remark});
        localStorage.setItem('tableData', JSON.stringify(tableData));
        transferToNewVersion()
        general("all");
        clearInputFields();
        populateAll()
        removeTableEditListener()
        addTableEditListener()
    } else {
        showConfirmModal('错误提示', '请填写所有字段', false).then(() => {
            console.log('知道了');
            // 处理用户点击确认后的逻辑
        });
    }
}

// 清空输入框
function clearInputFields() {
    // document.getElementById('inputRole').value = '';
    document.getElementById('inputName').selectedIndex = 0;
    document.getElementById('categorySelect').selectedIndex = 0;
    document.getElementById('selectAttr1').selectedIndex = 0;
    document.getElementById('selectAttr2').selectedIndex = 0;
    document.getElementById('selectAttr3').selectedIndex = 0;
    document.getElementById('selectAttr4').selectedIndex = 0;
    // document.getElementById('inputRemark').value = '';
    updatePartsSelect();
}

// 用于更新表格的函数
function general(type, data = tableData) {
    const tbody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // 清空现有的表格内容
    var targetDataNew = type === 'filtered' ? data : tableData;

    if (type === 'all' || type === 'filtered') {
        targetDataNew.forEach((item, index) => appendRow(item, index));
    } else {
        const lastItem = targetDataNew[targetDataNew.length - 1];
        appendRow(lastItem, targetDataNew.length - 1);
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
}

// 向表格中添加一行
function appendRow(item, index) {
    const tbody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    const tr = document.createElement('tr');
    tr.className = getRandomClass(); // 随机颜色类
    tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${truncateText(item.role, 10)}</td>
        <td>${item.categorySelect}</td>
        <td>${item.partsSelect}</td>
        <td>${item.name}</td>
        <td style="width: 20px"><img src="${icons[item.name + item.partsSelect]}" alt="图标"></td>
        <td class="text-truncate editable" title="${item.attr1}" id="${item.id}">${item.attr1}</td>
        <td class="text-truncate editable" title="${item.attr2}" id="${item.id}">${item.attr2}</td>
        <td class="text-truncate editable" title="${item.attr3}" id="${item.id}">${item.attr3}</td>
        <td class="text-truncate editable" title="${item.attr4}" id="${item.id}">${item.attr4}</td>
        <td class="text-truncate editable" title="${item.remark}" id="${item.id}">${item.remark}</td>
        <td>
            <i class="bi bi-trash-fill" style="cursor:pointer;" onclick="deleteRow('${item.id}')"></i>
        </td>
    `;
    tbody.appendChild(tr);
}

// 刷新页面的函数
function refreshPage() {
    window.location.reload();
}

// 删除行的函数
function deleteRow(targetId) {
    // 找到具有给定 UUID 的元素的索引
    const index = tableData.findIndex(item => item.id === targetId);
    // 如果找到了元素，则从数组中移除它
    if (index !== -1) {
        tableData.splice(index, 1);
    }
    localStorage.setItem('tableData', JSON.stringify(tableData));
    transferToNewVersion()
    refreshPage();
}

// 更新属性选择器的函数
function updateSelectors() {
    const attributes = allRandomEquipmentData; // 假定这是一个外部定义的数据对象
    const inputName = document.getElementById('inputName').value;
    const partsSelect = document.getElementById('partsSelect').value;
    const selected = inputName + partsSelect;

    const options = attributes[selected] || [];
    generateSelectOptions(document.getElementById('selectAttr1'), options);
    generateSelectOptions(document.getElementById('selectAttr2'), options);
    generateSelectOptions(document.getElementById('selectAttr3'), options);
    generateSelectOptions(document.getElementById('selectAttr4'), options);
}

function convertToCSV(objArray) {
    // 确保输入是对象数组
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    // 检查数组是否为空
    if (array.length === 0) return '';

    // 提取头部（键名）作为CSV的第一行
    const headers = Object.keys(array[0]);
    const csv = [
        headers.join(','), // 添加标题行
        ...array.map(row =>
            headers.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(',')
        )
    ].join('\n');

    return csv;
}

// 处理特殊字符（如逗号、换行符）的函数
function replacer(key, value) {
    if (typeof value === 'string') {
        // 替换内部的双引号为两个双引号（CSV格式）
        return value.replace(/"/g, '""');
    }
    return value;
}


function downloadFile(dataStr, dataType, fileName) {
    const blob = new Blob([dataStr], {type: dataType});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link); // 为了兼容某些浏览器
    link.click();
    document.body.removeChild(link); // 清理DOM
    URL.revokeObjectURL(url); // 释放URL对象
}

// 导出数据
function exportData() {
    // 获取用户选择的导出类型
    const format = document.getElementById('exportType').value;
    let dataStr = '';
    let exportFileDefaultName = '';

    // 获取当前日期和时间，并格式化为字符串，例如：2023-03-28_15-30
    const date = new Date();
    const dateString = date.toISOString().split('T')[0]; // 获取日期 'YYYY-MM-DD'
    const timeString = date.toTimeString().split(' ')[0].replace(/:/g, '-').slice(0, 5); // 获取时间 'HH-MM'

    if (format === 'json') {
        dataStr = JSON.stringify(tableData);
        exportFileDefaultName = `dnf_record_data_${dateString}_${timeString}.json`;
    } else if (format === 'csv') {
        dataStr = convertToCSV(tableData);
        exportFileDefaultName = `dnf_record_data_${dateString}_${timeString}.csv`;
    }

    // 调用下载函数
    downloadFile(dataStr, format === 'json' ? 'data:text/json;charset=utf-8,' : 'data:text/csv;charset=utf-8,', exportFileDefaultName);

    // 关闭模态框
    var exportModal = bootstrap.Modal.getInstance(document.getElementById('exportModal'));
    exportModal.hide();
}


// 导入数据
function importData() {
    localStorage.setItem('newVersionChecked', "false")
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const result = e.target.result;
            try {
                // 自动根据文件类型解析数据
                if (file.name.endsWith('.json')) {
                    tableData = JSON.parse(result);
                } else if (file.name.endsWith('.csv')) {
                    tableData = parseCSV(result);
                } else {
                    throw new Error('Unsupported file type');
                }
                checkData();
                transferToNewVersion()
                refreshPage();
            } catch (error) {
                showConfirmModal('错误提示', '文件内容格式错误或不支持的文件类型！', false).then(() => {
                    console.log('知道了');
                    // 处理用户点击确认后的逻辑
                });
            }
        };
        reader.readAsText(file);
    }
}

function parseCSV(csvString) {
    const lines = csvString.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split('","');

        for (let j = 0; j < headers.length; j++) {
            // 去除字段值中的转义双引号
            let value = currentLine[j] || "";
            value = value.replace(/^"|"$/g, '').replace(/\\"/g, '"');
            obj[headers[j]] = value;
        }
        result.push(obj);
    }
    return result;
}


// 动态填充属性筛选下拉框
function populateAttrFilter() {
    const attrSet = new Set();
    tableData.forEach(item => {
        ['attr1', 'attr2', 'attr3', 'attr4'].forEach(attr => {
            if (item[attr]) {
                attrSet.add(item[attr]);
            }
        });
    });

    const attrFilter = document.getElementById('attrFilter');
    attrFilter.innerHTML = '<option value="">所有属性</option>';
    attrSet.forEach(attr => {
        const option = document.createElement('option');
        option.value = attr;
        option.textContent = attr;
        attrFilter.appendChild(option);
    });
}

function populateRoleFilter() {
    const roleSet = new Set(tableData.map(item => item.role));
    const roleFilter = document.getElementById('roleFilter');
    roleFilter.innerHTML = '<option value="">所有角色</option>'; // 默认选项

    roleSet.forEach(role => {
        const option = document.createElement('option');
        option.value = role;
        option.textContent = role;
        roleFilter.appendChild(option);
    });
}

function populateLocationFilter() {
    const locationSet = new Set(tableData.map(item => item.partsSelect));
    const locationFilter = document.getElementById('locationFilter');
    locationFilter.innerHTML = '<option value="">所有部位</option>'; // 默认选项

    locationSet.forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.textContent = location;
        locationFilter.appendChild(option);
    });
}

function populateNameFilter() {
    const nameSet = new Set(tableData.map(item => item.name));
    const nameFilter = document.getElementById('nameFilter');
    nameFilter.innerHTML = '<option value="">所有名字</option>'; // 默认选项

    nameSet.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        nameFilter.appendChild(option);
    });
}

function populateMarkFilter() {
    const markSet = new Set(tableData.map(item => item.remark));
    const markFilter = document.getElementById('markFilter');
    markFilter.innerHTML = '<option value="">所有备注</option>'; // 默认选项

    markSet.forEach(mark => {
        const option = document.createElement('option');
        option.value = mark;
        option.textContent = mark;
        markFilter.appendChild(option);
    });
}

// 同时考虑角色和属性进行筛选
function filterTable() {
    tableData = JSON.parse(localStorage.getItem('tableData'))

    const selectedRole = document.getElementById('roleFilter').value;
    const selectedAttr = document.getElementById('attrFilter').value;
    const selectedLocation = document.getElementById('locationFilter').value;
    const selectedName = document.getElementById('nameFilter').value;
    const selectedMark = document.getElementById('markFilter').value;
    const filteredData = tableData.filter(item => {
        const roleMatch = selectedRole ? item.role === selectedRole : true;
        const attrMatch = selectedAttr ? [item.attr1, item.attr2, item.attr3, item.attr4].includes(selectedAttr) : true;
        const locationMatch = selectedLocation ? item.partsSelect === selectedLocation : true;
        const nameMatch = selectedName ? item.name === selectedName : true;
        const markMatch = selectedMark ? item.remark === selectedMark : true;
        return roleMatch && attrMatch && locationMatch && nameMatch && markMatch;
    });

    general('filtered', filteredData);
    removeTableEditListener()
    addTableEditListener()
}

// 清空数据的函数
function clearData() {
    showConfirmModal('清空确认', '您确定要清空吗？请注意，操作不可撤销！', true)
        .then((result) => {
            if (result) {
                console.log('用户确认了操作');
                // 这里处理用户确认的逻辑
                // 清空数据
                tableData = [];
                nullData = []
                localStorage.setItem('tableData', JSON.stringify(tableData));
                localStorage.removeItem('noShowModalAgain');
                localStorage.removeItem('newVersionChecked');
                localStorage.setItem("newVersionTemp", JSON.stringify(nullData))
                localStorage.setItem("oldVersionTemp", JSON.stringify(nullData))
                refreshPage(); // 刷新页面以更新视图
            }
        })
        .catch((result) => {
            console.log('用户取消了操作');
            // 这里处理用户取消的逻辑
        });
}

function copyToClipboard() {
    // 将字典转换为字符串
    var text = JSON.stringify(tableData);

    // 创建临时文本区域
    var tempTextArea = document.createElement('textarea');
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    tempTextArea.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);

    // 显示复制成功的提示
    showToast("复制提示", "自定义信息已复制到剪贴板。");
}

function populateAll() {
    populateRoleFilter();
    populateAttrFilter();
    populateLocationFilter();
    populateNameFilter()
    populateMarkFilter()
}

function initializeScrollBottom() {
    document.getElementById('scrollTopBtn').addEventListener('click', function () {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    document.getElementById('scrollBottomBtn').addEventListener('click', function () {
        window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
    });
}

function removeTableEditListener() {
    // 在需要移除事件监听器时，可以调用以下代码：
    document.querySelectorAll('.editable').forEach(cell => {
        cell.removeEventListener('click', clickHandler);
    });
}

function addTableEditListener() {
    clickHandler = function () {
        // 显示修改提示
        showToast("修改提示", "修改后点击任意位置即可自动保存。");
        // 确保单元格当前不是输入框
        if (this.querySelector('input')) return;

        let originalValue = this.innerText; // 存储原始值
        let uniqueId = this.getAttribute('id'); // 直接从 id 属性获取唯一 ID

        let input = document.createElement('input');
        input.type = 'text';
        input.value = originalValue; // 使用原始值填充输入框
        input.className = 'form-control';

        this.innerHTML = '';
        this.appendChild(input);
        input.focus();

        const blurHandler = function () {
            let newValue = this.value;

            // 根据 id 查找字典数组中的相应字典项
            let editedItem = tableData.find(item => item.id === uniqueId);
            // 使用findIndex方法查找指定name的索引
            const editedIndex = tableData.findIndex(item => item.id === uniqueId);
            // 比较修改前的值和字典中的每个属性值
            let isModified = false;
            let editKey = "";
            for (let key in editedItem) {
                if (editedItem.hasOwnProperty(key) && editedItem[key] === originalValue) {
                    if (key === "role") {
                        continue
                    }
                    isModified = true;
                    editKey = key;
                    tableData[editedIndex][key] = newValue
                    localStorage.setItem('tableData', JSON.stringify(tableData));
                    transferToNewVersion()
                    populateAll()
                    // 显示修改成功提示
                    showToast("修改提示", "修改成功。");
                    break;
                }
            }

            if (isModified) {
                console.log(`已修改 id 为 ${uniqueId} key 为 ${editKey} 的字典项的属性`);
            }

            if (editedItem) {
                let target = this.parentElement
                target.innerText = newValue;
                target.setAttribute("title", newValue); // 修改 title 属性
            }

            // 移除blur事件监听器
            input.removeEventListener('blur', blurHandler);
        };

        input.addEventListener('blur', blurHandler);
    };

    document.querySelectorAll('.editable').forEach(cell => {
        cell.addEventListener('click', clickHandler);
    });
}

function checkData() {
    // 遍历字典数组并添加ID
    tableData.forEach((item, index) => {
        if (!item.hasOwnProperty('id')) {
            item.id = uuid.v4();
        }
    });
    localStorage.setItem('tableData', JSON.stringify(tableData));
    transferToNewVersion()
}

// 检查条件的函数
function checkLogin(type) {
    if (isLogin) {
        document.getElementById('syncButton').removeAttribute('disabled');
        document.getElementById("loginButton").textContent = "登出"

        if (type === "manual") {
            // 获取checkbox元素
            var checkbox = document.getElementById('noLoginAgain');
            // 检查checkbox是否被选中
            var isChecked = checkbox.checked;
            if (isChecked) {
                console.log('Checkbox is checked');
                localStorage.setItem('autoLogin', "true");
            } else {
                console.log('Checkbox is not checked');
            }
        }
    } else {
        document.getElementById('syncButton').setAttribute('disabled', 'disabled');
        document.getElementById("loginButton").textContent = "登录"
    }
}

function syncData() {
    if (isLogin) {
        showConfirmModal('同步确认', '您确定要执行这个操作吗？', true)
            .then((result) => {
                if (result) {
                    console.log('用户确认了操作');
                    searchData(userData['username'])
                        .then(data => {
                            jsonData = JSON.parse(data['result'])
                            tableData = jsonData['data'] != null || jsonData['data'] !== undefined ? jsonData['data'] : tableData
                            console.log(tableData)
                            if (tableData != null) {
                                general('all')
                                populateAll()
                                removeTableEditListener()
                                addTableEditListener()
                                localStorage.setItem('tableData', JSON.stringify(tableData));
                                transferToNewVersion()
                            }
                            console.log(data)
                        })
                }
            })
            .catch((result) => {
                console.log('用户取消了操作');
                // 这里处理用户取消的逻辑
            });
    } else {
        showConfirmModal('错误提示', "请登录后再执行上传操作！", false).then(() => {
            console.log('知道了');
            // 处理用户点击确认后的逻辑
        });
    }
}

function upLoadData() {
    if (tempTableData === tableData) {
        // 数据上传逻辑
        console.log("数据不需要上传...");
    } else {
        console.log("数据正在上传...");
        updataData()
        tempTableData = tableData
    }

}

function updateNow() {
    if (!isLogin) {
        showConfirmModal('错误提示', '请登录后再执行上传操作!', false).then(() => {
            console.log('知道了');
            // 处理用户点击确认后的逻辑
        });
        return
    }
    showConfirmModal('上传确认', '您确定要上传数据到云端吗？', true)
        .then((result) => {
            if (result) {
                console.log('用户确认了操作');
                // 这里处理用户确认的逻辑
                updataData()
            }
        })
        .catch((result) => {
            console.log('用户取消了操作');
            // 这里处理用户取消的逻辑
        });
}

function showConfirmModal(title, message, showCancelButton = true) {
    return new Promise((resolve, reject) => {
        // 获取模态框中的元素
        var modal = document.getElementById('confirmModal');
        var modalTitle = document.getElementById('confirmModalLabel');
        var modalBody = modal.querySelector('.modal-body');
        var confirmBtn = modal.querySelector('#confirmBtn');
        var cancelBtn = modal.querySelector('#cancelBtn');

        // 设置模态框的标题和正文内容
        modalTitle.textContent = title;
        modalBody.textContent = message;

        // 根据showCancelButton参数决定是否显示取消按钮
        cancelBtn.style.display = showCancelButton ? "" : "none";

        // 显示模态框
        var confirmModal = new bootstrap.Modal(modal, {
            keyboard: false
        });
        confirmModal.show();

        // 处理确认按钮点击
        confirmBtn.onclick = () => {
            resolve(true);
            confirmModal.hide();
        };

        // 直接处理模态框关闭事件，包括点击取消按钮或模态框背景
        modal.addEventListener('hidden.bs.modal', function handler(event) {
            modal.removeEventListener('hidden.bs.modal', handler);
            reject(false); // 视为取消
        });
    });
}


function initialEventListener() {
    // 获取复选框元素
    var checkbox = document.getElementById('verSionCheck');

    // 添加事件监听器到复选框
    checkbox.addEventListener('change', function () {
        if (tableData.length === 0) {
            return
        }
        // 检查复选框是否被选中
        if (this.checked) {
            var newVersionTemp = JSON.parse(localStorage.getItem('newVersionTemp')) || []
            console.log('加载最新版本...');
            localStorage.setItem("tableData", JSON.stringify(newVersionTemp))
            localStorage.setItem("newVersionChecked", "true")
            refreshPage()
        } else {
            var oldVersionTemp = JSON.parse(localStorage.getItem('oldVersionTemp')) || [];
            if (oldVersionTemp !== []) {
                localStorage.setItem("tableData", JSON.stringify(oldVersionTemp))
                localStorage.setItem("newVersionChecked", "false")
                refreshPage()
            }
        }
    });

    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    })
}

function initial() {
    transferToNewVersion()
    initialEventListener()
    // 初始化模态框
    initializeModal();
    initializeScrollBottom()
    // 每30秒调用一次upLoadData函数
    setInterval(upLoadData, 30000 * 2 * 5);
    checkData()
    // 渲染表格数据
    general('all');
    populateAll()
    updatePartsSelect()
    addTableEditListener()
    checkAuto()
}

function checkAuto() {
    if (autoLogin) {
        console.log("自动登录已开启~")
        let userInfo = JSON.parse(localStorage.getItem('userNameAndPassWord'));
        login(userInfo["用户名"], userInfo["密码"], 'auto')
    } else {
        console.log("未开启自动登录")
    }
    if (newVersionChecked) {
        console.log("自动登录开启新版本~")
        var newVersionInput = document.getElementById('verSionCheck')
        newVersionInput.checked = true
    } else {
        transferToNewVersion()
    }

}

function transferToNewVersion() {
    console.log("正在进行转换...")
    if (tableData.length === 0) {
        return
    }
    var newVersionTemp = JSON.parse(JSON.stringify(tableData));
    var oldVersionTemp = JSON.parse(JSON.stringify(tableData));

    for (var index = 0; index < newVersionTemp.length; index++) {
        newVersionTemp[index]['attr1'] = (old_to_new[newVersionTemp[index]['attr1']] !== undefined) ? old_to_new[newVersionTemp[index]['attr1']] : newVersionTemp[index]['attr1']
        newVersionTemp[index]['attr2'] = (old_to_new[newVersionTemp[index]['attr2']] !== undefined) ? old_to_new[newVersionTemp[index]['attr2']] : newVersionTemp[index]['attr2']
        newVersionTemp[index]['attr3'] = (old_to_new[newVersionTemp[index]['attr3']] !== undefined) ? old_to_new[newVersionTemp[index]['attr3']] : newVersionTemp[index]['attr3']
        newVersionTemp[index]['attr4'] = (old_to_new[newVersionTemp[index]['attr4']] !== undefined) ? old_to_new[newVersionTemp[index]['attr4']] : newVersionTemp[index]['attr4']
    }
    for (var index2 = 0; index2 < oldVersionTemp.length; index2++) {
        oldVersionTemp[index2]['attr1'] = (new_to_old[oldVersionTemp[index2]['attr1']] !== undefined) ? new_to_old[oldVersionTemp[index2]['attr1']] : oldVersionTemp[index2]['attr1']
        oldVersionTemp[index2]['attr2'] = (new_to_old[oldVersionTemp[index2]['attr2']] !== undefined) ? new_to_old[oldVersionTemp[index2]['attr2']] : oldVersionTemp[index2]['attr2']
        oldVersionTemp[index2]['attr3'] = (new_to_old[oldVersionTemp[index2]['attr3']] !== undefined) ? new_to_old[oldVersionTemp[index2]['attr3']] : oldVersionTemp[index2]['attr3']
        oldVersionTemp[index2]['attr4'] = (new_to_old[oldVersionTemp[index2]['attr4']] !== undefined) ? new_to_old[oldVersionTemp[index2]['attr4']] : oldVersionTemp[index2]['attr4']
    }

    localStorage.setItem('newVersionTemp', JSON.stringify(newVersionTemp))
    localStorage.setItem('oldVersionTemp', JSON.stringify(oldVersionTemp))
}

//just for desktop version
// 使用示例
const rawUrl = 'https://raw.githubusercontent.com/wyyz-test/record.wyyz.club-desktop/main/vesion';

async function fetchFileFromGitHubRawUrl(rawUrl) {
    try {
        const response = await fetch(rawUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        return text;
    } catch (error) {
        console.error('请求GitHub文件时发生错误:', error);
        return '请求失败';
    }
}

function updateRemind(linkHref, newVersion) {
    return new Promise((resolve, reject) => {
        // 获取模态框中的元素
        var modal = document.getElementById('confirmModal');
        var modalTitle = document.getElementById('confirmModalLabel');
        var modalBody = modal.querySelector('.modal-body');
        var confirmBtn = modal.querySelector('#confirmBtn');
        var cancelBtn = modal.querySelector('#cancelBtn');

        // 设置模态框的标题和正文内容
        modalTitle.textContent = '新版本提示';
        modalBody.innerHTML = `有新版本啦~<br><a href="${linkHref}">点此下载最新版本</a>`
        modalBody.style.textAlign = 'center'; // 添加这一行来设置文本居中
        // 根据showCancelButton参数决定是否显示取消按钮
        cancelBtn.style.display = "none"

        // 显示模态框
        var confirmModal = new bootstrap.Modal(modal, {
            keyboard: false
        });
        confirmModal.show();

        // 处理确认按钮点击
        confirmBtn.onclick = () => {
            resolve(true);
            confirmModal.hide();
        };

        // 直接处理模态框关闭事件，包括点击取消按钮或模态框背景
        modal.addEventListener('hidden.bs.modal', function handler(event) {
            modal.removeEventListener('hidden.bs.modal', handler);
            reject(false); // 视为取消
        });
    });
}

function checkNewVersion() {
    fetchFileFromGitHubRawUrl(rawUrl)
        .then(content => {
            console.log(content, typeof (content))
            var versionData = JSON.parse(content)
            if (versionData['version'] > version) {
                updateRemind(versionData['link'])
            }
        })
        .catch(error => console.error(error));
}

// 初始化页面和模态框
window.onload = function () {
    checkNewVersion()
    initial()

};
