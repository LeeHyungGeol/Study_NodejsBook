const http = require('http');

http.createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    //Set-Cookie는 Browser한테 다음과 같은 Cookie를 저장하라는 의미이다.
    res.writeHead(200, {'Set-Cookie' : 'mycookie=test'});
    res.end('Yummy Cookie');
})
.listen(8083, () => {
    console.log('8083번 포트에서 서버 대기 중입니다!');
});