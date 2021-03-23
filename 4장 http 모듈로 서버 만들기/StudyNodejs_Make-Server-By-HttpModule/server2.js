const http = require('http');
const fs = require('fs').promises;


http.createServer(async (req, res) => {
    try {
        //요청이 들어오면 먼저 fs Module로 HTML파일을 읽는다.
        const data = await fs.readFile('./server2.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        //data변수에 저장된 Buffer를 그대로 클라이언트로 보낸다.
        res.end(data);
    } catch (err) {
        //예기치 못한 에러가 발생한 경우, 에러 메시지를 응답한다.
        console.error(err);
        //에러 메시지는 일반 문자열이므로 text/plain을 사용한다.
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8'});
        res.end(err.message);
    }
})
.listen(8081, ()=>{
    console.log('8081번 포트에서 대기 중입니다!');
});