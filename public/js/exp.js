var index = 1
const lv_data = {
    "1": {
        "up": 100,
        "acc": 300
    },
    "2": {
        "up": 100,
        "acc": 400
    },
    "3": {
        "up": 100,
        "acc": 500
    },
    "4": {
        "up": 100,
        "acc": 600
    },
    "5": {
        "up": 100,
        "acc": 700
    },
    "6": {
        "up": 100,
        "acc": 800
    },
    "7": {
        "up": 100,
        "acc": 900
    },
    "8": {
        "up": 100,
        "acc": 1000
    },
    "9": {
        "up": 200,
        "acc": 1100
    },
    "10": {
        "up": 100,
        "acc": 1300
    },
    "11": {
        "up": 100,
        "acc": 1400
    },
    "12": {
        "up": 100,
        "acc": 1500
    },
    "13": {
        "up": 100,
        "acc": 1600
    },
    "14": {
        "up": 200,
        "acc": 1700
    },
    "15": {
        "up": 200,
        "acc": 1900
    },
    "16": {
        "up": 200,
        "acc": 2100
    },
    "17": {
        "up": 200,
        "acc": 2300
    },
    "18": {
        "up": 200,
        "acc": 2500
    },
    "19": {
        "up": 600,
        "acc": 2700
    },
    "20": {
        "up": 400,
        "acc": 3300
    },
    "21": {
        "up": 400,
        "acc": 3700
    },
    "22": {
        "up": 500,
        "acc": 4100
    },
    "23": {
        "up": 600,
        "acc": 4600
    },
    "24": {
        "up": 600,
        "acc": 5200
    },
    "25": {
        "up": 700,
        "acc": 5800
    },
    "26": {
        "up": 800,
        "acc": 6500
    },
    "27": {
        "up": 900,
        "acc": 7300
    },
    "28": {
        "up": 1000,
        "acc": 8200
    },
    "29": {
        "up": 2400,
        "acc": 9200
    },
    "30": {
        "up": 1700,
        "acc": 11600
    },
    "31": {
        "up": 2000,
        "acc": 13300
    },
    "32": {
        "up": 2300,
        "acc": 15300
    },
    "33": {
        "up": 2600,
        "acc": 17600
    },
    "34": {
        "up": 3000,
        "acc": 20200
    },
    "35": {
        "up": 3500,
        "acc": 23200
    },
    "36": {
        "up": 4000,
        "acc": 26700
    },
    "37": {
        "up": 4600,
        "acc": 30700
    },
    "38": {
        "up": 5300,
        "acc": 35300
    },
    "39": {
        "up": 12100,
        "acc": 40600
    },
    "40": {
        "up": 9500,
        "acc": 52700
    },
    "41": {
        "up": 11200,
        "acc": 62200
    },
    "42": {
        "up": 13200,
        "acc": 73400
    },
    "43": {
        "up": 15600,
        "acc": 86600
    },
    "44": {
        "up": 18400,
        "acc": 102200
    },
    "45": {
        "up": 21700,
        "acc": 120600
    },
    "46": {
        "up": 25600,
        "acc": 142300
    },
    "47": {
        "up": 30200,
        "acc": 167900
    },
    "48": {
        "up": 35700,
        "acc": 198100
    },
    "49": {
        "up": 77400,
        "acc": 233800
    },
    "50": {
        "up": 65300,
        "acc": 311200
    },
    "51": {
        "up": 79100,
        "acc": 376500
    },
    "52": {
        "up": 95700,
        "acc": 455600
    },
    "53": {
        "up": 115500,
        "acc": 551300
    },
    "54": {
        "up": 139900,
        "acc": 666800
    },
    "55": {
        "up": 169500,
        "acc": 806700
    },
    "56": {
        "up": 206100,
        "acc": 976200
    },
    "57": {
        "up": 249400,
        "acc": 1182300
    },
    "58": {
        "up": 301800,
        "acc": 1431700
    },
    "59": {
        "up": 630000,
        "acc": 1735500
    },
    "60": {
        "up": 566400,
        "acc": 2363500
    },
    "61": {
        "up": 701800,
        "acc": 2929900
    },
    "62": {
        "up": 870200,
        "acc": 3631700
    },
    "63": {
        "up": 1079000,
        "acc": 4501900
    },
    "64": {
        "up": 1338000,
        "acc": 5580900
    },
    "65": {
        "up": 1659000,
        "acc": 6918900
    },
    "66": {
        "up": 2057200,
        "acc": 8577900
    },
    "67": {
        "up": 2551000,
        "acc": 10635100
    },
    "68": {
        "up": 3163200,
        "acc": 13186100
    },
    "69": {
        "up": 6500000,
        "acc": 16349300
    },
    "70": {
        "up": 6170500,
        "acc": 22849300
    },
    "71": {
        "up": 7836500,
        "acc": 29019800
    },
    "72": {
        "up": 9952400,
        "acc": 36856300
    },
    "73": {
        "up": 12639500,
        "acc": 46808700
    },
    "74": {
        "up": 16052200,
        "acc": 59448200
    },
    "75": {
        "up": 20386300,
        "acc": 75500400
    },
    "76": {
        "up": 25890600,
        "acc": 95886700
    },
    "77": {
        "up": 32881100,
        "acc": 121777300
    },
    "78": {
        "up": 41759000,
        "acc": 154658400
    },
    "79": {
        "up": 84459500,
        "acc": 196417400
    },
    "80": {
        "up": 28087690,
        "acc": 280876900
    },
    "神1": {
        "up": 28087690,
        "acc": 280876900
    },
    "神2": {
        "up": 28087690,
        "acc": 308964590
    },
    "神3": {
        "up": 28087690,
        "acc": 337052280
    },
    "神4": {
        "up": 28087690,
        "acc": 365139970
    },
    "神5": {
        "up": 28087690,
        "acc": 393227660
    },
    "神6": {
        "up": 28087690,
        "acc": 421315350
    },
    "神7": {
        "up": 28087690,
        "acc": 449403040
    },
    "神8": {
        "up": 28087690,
        "acc": 477490730
    },
    "神9": {
        "up": 28087690,
        "acc": 505578420
    },
    "神10": {
        "up": 56175380,
        "acc": 533666110
    },
    "神11": {
        "up": 56175380,
        "acc": 589841490
    },
    "神12": {
        "up": 56175380,
        "acc": 646016870
    },
    "神13": {
        "up": 56175380,
        "acc": 702192250
    },
    "神14": {
        "up": 56175380,
        "acc": 758367630
    },
    "神15": {
        "up": 56175380,
        "acc": 814543010
    },
    "神16": {
        "up": 56175380,
        "acc": 870718390
    },
    "神17": {
        "up": 56175380,
        "acc": 926893770
    },
    "神18": {
        "up": 56175380,
        "acc": 983069150
    },
    "神19": {
        "up": 56175380,
        "acc": 1039244530
    },
    "神20": {
        "up": 84263070,
        "acc": 1095419910
    },
    "神21": {
        "up": 84263070,
        "acc": 1179682980
    },
    "神22": {
        "up": 84263070,
        "acc": 1263946050
    },
    "神23": {
        "up": 84263070,
        "acc": 1348209120
    },
    "神24": {
        "up": 84263070,
        "acc": 1432472190
    },
    "神25": {
        "up": 140438450,
        "acc": 1516735260
    },
    "神26": {
        "up": 140438450,
        "acc": 1657173710
    },
    "神27": {
        "up": 140438450,
        "acc": 1797612160
    },
    "神28": {
        "up": 140438450,
        "acc": 1938050610
    },
    "神29": {
        "up": 140438450,
        "acc": 2078489060
    },
    "神30": {
        "up": 196613830,
        "acc": 2218927510
    },
    "神31": {
        "up": 196613830,
        "acc": 2415541340
    },
    "神32": {
        "up": 196613830,
        "acc": 2612155170
    },
    "神33": {
        "up": 196613830,
        "acc": 2808769000
    },
    "神34": {
        "up": 196613830,
        "acc": 3005382830
    },
    "神35": {
        "up": 280876900,
        "acc": 3201996660
    },
    "神36": {
        "up": 280876900,
        "acc": 3482873560
    },
    "神37": {
        "up": 280876900,
        "acc": 3763750460
    },
    "神38": {
        "up": 280876900,
        "acc": 4044627360
    },
    "神39": {
        "up": 280876900,
        "acc": 4325504260
    },
    "神40": {
        "up": 99999999999999,
        "acc": 4606381160
    }
}
var all_data = {
    "装备1": {
        "lv": "1",
        "percent": 0,
        "up": 1,
        'acc': 3,
        'bj': 6,
        "valid": false
    }
}

// 函数：为复选框添加监听器
function addCheckboxListener(checkbox) {
    checkbox.addEventListener('change', function (event) {
        // 获取复选框所在的行
        var row = checkbox.closest('tr');
        // 获取该行的数据
        var rowData = getRowData(row);
        console.log(all_data, rowData)
        if (this.checked === false) {
            all_data[rowData[1]]["valid"] = false
        } else {
            all_data[rowData[1]] = {
                "lv": rowData[2],
                "percent": parseFloat(rowData[3].replace("%", "")),
                "up": parseFloat(rowData[4]),
                'acc': parseFloat(rowData[5]),
                'bj': parseFloat(rowData[6]),
                "valid": true
            }
        }
        // 处理行数据
        handleRowData();
        console.log(all_data)
    });
}

// 函数：获取行数据
function getRowData(row) {
    let rowData = [];
    for (let i = 0; i < row.cells.length - 1; i++) {
        rowData.push(row.cells[i].textContent.trim());
    }
    return rowData;
}

// 函数：处理行数据
function handleRowData() {
    let bbjTrElement = document.getElementById("bbj");
    let bjTrElement = document.getElementById("bj");
    let data_keys = Object.keys(all_data); // 获取lv_data所有的键
    let keys = Object.keys(lv_data); // 获取lv_data所有的键

    //没有元素
    if (keys.length < 1) {
        return;
    }

    //有一个元素
    if (data_keys.length === 1) {
        console.log(all_data[data_keys[0]], "只有一个")
        if (all_data[data_keys[0]]["valid"]) {
            bbjTrElement.cells[2].textContent = all_data[data_keys[0]]["lv"]
            bbjTrElement.cells[3].textContent = all_data[data_keys[0]]["percent"] + "%"
            bjTrElement.cells[2].textContent = all_data[data_keys[0]]["lv"]
            bjTrElement.cells[3].textContent = all_data[data_keys[0]]["percent"] + "%"
        } else {
            bbjTrElement.cells[2].textContent = 0
            bbjTrElement.cells[3].textContent = 0 + "%"
            bjTrElement.cells[2].textContent = 0
            bjTrElement.cells[3].textContent = 0 + "%"
        }
        return;
    }

    var bbj_exp = 0
    var bj_exp = 0

    for (let j = 0; j < data_keys.length; j++) {
        if (!all_data[data_keys[j]]['valid']) {
            continue
        }
        bbj_exp = bbj_exp + all_data[data_keys[j]]['acc']
        let bj_min_exp = Math.min(bj_exp, all_data[data_keys[j]]['acc'])
        let bj_max_exp = Math.max(bj_exp, all_data[data_keys[j]]['acc'])
        bj_exp = bj_max_exp + 2 * bj_min_exp
    }
    console.log("不暴击 暴击：", bbj_exp, bj_exp)

    for (let i = 0; i < keys.length - 1; i++) {
        let key = keys[i];
        if (parseFloat(lv_data[key].acc) <= bbj_exp && parseFloat(lv_data[keys[i + 1]].acc) > bbj_exp) {
            console.log("不暴击", lv_data[key], key);
            let lv = key
            let percent = ((bbj_exp - parseFloat(lv_data[key].acc)) / lv_data[key].up).toFixed(4)
            let bbjCells = bbjTrElement.cells
            bbjCells[2].textContent = lv
            bbjCells[3].textContent = percent * 100 + "%"
            bbjCells[5].textContent = bbj_exp
            break;
        }
    }

    for (let x = 0; x < keys.length - 1; x++) {
        let key = keys[x];
        if (parseFloat(lv_data[key].acc) <= bj_exp && parseFloat(lv_data[keys[x + 1]].acc) > bj_exp) {
            console.log("暴击", lv_data[key], key, parseFloat(lv_data[key].acc), parseFloat(lv_data[keys[x + 1]].acc));
            let lv = key
            let percent = ((bj_exp - parseFloat(lv_data[key].acc)) / lv_data[key].up).toFixed(4)
            let bjCells = bjTrElement.cells
            bjCells[2].textContent = lv
            bjCells[3].textContent = percent * 100 + "%"
            bjCells[5].textContent = bj_exp
            break;
        }
    }

    if (bbj_exp >= lv_data['神40'].acc) {
        let bbjCells = bbjTrElement.cells
        bbjCells[2].textContent = "神40"
        bbjCells[3].textContent = "0%"
        bbjCells[5].textContent = bbj_exp
    }
    if (bj_exp >= lv_data['神40'].acc) {
        let bjCells = bjTrElement.cells
        bjCells[2].textContent = "神40"
        bjCells[3].textContent = "0%"
        bjCells[5].textContent = bj_exp
    }
}

function initial() {
    // 选中全部复选框
    // document.getElementById('selectAll').addEventListener('change', function () {
    //     var checkboxes = document.querySelectorAll('#equipmentTable tbody input[type="checkbox"]');
    //     checkboxes.forEach(function (checkbox) {
    //         checkbox.checked = this.checked;
    //         this.change
    //     }, this);
    // });

    document.addEventListener('click', function (event) {
        // 编辑逻辑
        if (event.target.classList.contains('editLink')) {
            event.preventDefault();
            var link = event.target;
            var row = link.closest('tr');
            var cells = row.cells;

            if (link.textContent === '编辑') {
                // 进入编辑状态
                var cell = cells[2]; // 词条等级单元格
                var text = cell.textContent.trim();
                var isDivine = text.startsWith('神');
                var levelText = isDivine ? text.replace("神", "") : text;

                cell.innerHTML = `<input type="checkbox" class="divineCheckbox" ${isDivine ? 'checked' : ''}> 神 <input type="number" class="form-control levelInput" value="${levelText}" style="width: auto; display: inline-block; max-width: 60px;">`;

                var percentCell = cells[3]; // 词条等级百分比单元格
                var percentText = percentCell.textContent.trim().replace('%', '');
                percentCell.innerHTML = `<input type="text" class="form-control percentInput" value="${percentText}" style="width: auto; max-width: 60px;">%`;

                link.textContent = '保存';
            } else {
                // 保存更改并退出编辑状态
                var divineCheckbox = row.querySelector('.divineCheckbox');
                var levelInput = row.querySelector('.levelInput').value;
                var validLevel = divineCheckbox.checked ? Math.min(Math.max(levelInput, 1), 39) : Math.min(Math.max(levelInput, 1), 80);
                var lv = divineCheckbox.checked ? `神${validLevel}` : validLevel
                cells[2].textContent = lv;

                var percentInput = row.querySelector('.percentInput').value;
                var percent = Math.min(Math.max(percentInput, 0), 99.99).toFixed(2)
                var validPercent = percent + '%';
                cells[3].textContent = validPercent;
                link.textContent = '编辑';

                console.log("修改后的Info:", lv, percent)

                cells[4].textContent = (parseFloat(lv_data[lv].up) * (1 - percent / 100)).toFixed(2)
                cells[5].textContent = (parseFloat(lv_data[lv].acc) + parseFloat(lv_data[lv].up) * percent / 100).toFixed(2)
                cells[6].textContent = ((parseFloat(lv_data[lv].acc) + parseFloat(lv_data[lv].up) * percent / 100) * 2).toFixed(2)

                var newCheckbox = row.querySelector('input[type="checkbox"]');
                if (newCheckbox.checked === true) {
                    var rowData = getRowData(row);
                    all_data[rowData[1]] = {
                        "lv": rowData[2],
                        "percent": parseFloat(rowData[3].replace("%", "")),
                        "up": parseFloat(rowData[4]),
                        'acc': parseFloat(rowData[5]),
                        'bj': parseFloat(rowData[6]),
                        "valid": true
                    }
                    // 处理行数据
                    handleRowData(rowData);
                }
            }
        }
        // 删除逻辑
        else if (event.target.classList.contains('deleteLink')) {
            event.preventDefault();
            var link = event.target;
            var row = link.closest('tr');
            var rowData = getRowData(row);
            all_data[rowData[1]]["valid"] = false
            handleRowData()
            row.remove();
        } else if (event.target.classList.contains('addRow')) {
            var tbody = document.getElementById('equipmentTable').getElementsByTagName('tbody')[0];
            var newRow = tbody.insertRow();
            newRow.innerHTML = `<td><input type="checkbox"></td>
                                    <td>装备${++index}</td>
                                    <td>1</td>
                                    <td>0%</td>
                                    <td>100</td> <!-- 新列初始值 -->
                                    <td>300</td>   <!-- 新列初始值 -->
                                    <td>600</td>   <!-- 新列初始值 -->
                                    <td><a href="#" class="editLink me-2">编辑</a><a href="#" class="deleteLink">删除</a></td>`;
            // document.getElementById('selectAll').checked = false;
            // 直接从newRow中获取新的复选框并为其添加监听器
            var newCheckbox = newRow.querySelector('input[type="checkbox"]');
            addCheckboxListener(newCheckbox);
        }
    });

    var checkboxes = document.querySelectorAll('#equipmentTable tbody input[type="checkbox"]');
    checkboxes.forEach(addCheckboxListener);
}

function search() {
    var showData = ""
    var queryValue = document.getElementById("queryInput").value;
    console.log("查询内容：", queryValue);
    if (lv_data[queryValue] !== undefined || lv_data[queryValue] === null) {
        showData = `等级：${queryValue}  升级所需经验：${lv_data[queryValue].up}  当前装备经验：${lv_data[queryValue].acc}  喂养暴击经验：${lv_data[queryValue].acc * 2}`
    } else {
        showData = "输入的等级不合法"
    }

    // 根据输入的查询内容进行数据的检索或更新页面的显示信息等
    document.getElementById("infoDisplay").innerHTML = showData; // 示例：更新显示信息
}


// 初始化页面
window.onload = function () {
    initial()
};