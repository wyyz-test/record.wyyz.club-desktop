KV_REST_API_URL="https://singular-catfish-41330.upstash.io"
KV_REST_API_TOKEN="AaFyASQgMjQ2YTUyM2UtMDM1MS00Yzc2LWE1N2ItNGIzYzMxOGRmYzk3NmIxN2FkNTMzNTBlNDljMmEwZGZlMDAwZTlmY2RjMGI="
KV_REST_API_READ_ONLY_TOKEN="AqFyASQgMjQ2YTUyM2UtMDM1MS00Yzc2LWE1N2ItNGIzYzMxOGRmYzk3VF-_JRrTJHFRXSSIh_UvpzJRvaSkOfAaiR0hRM1ir1k="

async function setData(user_name, data) {
    // 使用try-catch处理可能的错误
    try {
        const response = await fetch(`${KV_REST_API_URL}/set/${user_name}`, {
            headers: {
                Authorization: `Bearer ${KV_REST_API_TOKEN}`,
                'Content-Type': 'application/json' // 确保设置了正确的内容类型
            },
            body: JSON.stringify(data),
            method: 'POST',
        });

        const result = await response.json(); // 等待响应并转换为JSON

        // 返回结果
        return result;
    } catch (error) {
        // 错误处理
        console.error('Error setting data:', error);
        throw error; // 抛出错误，允许调用者处理它
    }
}

async function searchData(user_name) {
    try {
        const response = await fetch(`${KV_REST_API_URL}/get/${user_name}`, {
            headers: {
                Authorization: `Bearer ${KV_REST_API_READ_ONLY_TOKEN}`,
                'Content-Type': 'application/json' // 确保设置了正确的内容类型
            }
        });
        const data = await response.json(); // 等待响应并转换为JSON

        // 返回结果
        return data;
    } catch (error) {
        // 错误处理
        console.error('Error fetching data:', error);
        throw error; // 抛出错误，允许调用者处理它
    }
}




