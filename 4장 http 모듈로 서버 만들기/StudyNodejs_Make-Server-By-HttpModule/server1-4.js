const http2 = require('http2');
const fs = require('fs');

// createServer 메서드가 인수를 2개 받는다.
//   첫번째 인수 : 인증서 관련 옵션들
//   두번째 인수 : http모듈과 같은 Server로직

http2.createSecureServer( {
  cert : readFileSync('도메인 인증서 경로'),
  key : readFileSync('도메인 비밀키 경로'),
  ca : [
      fs.readFileSync('상위 인증서 경로'),
      fs.readFileSync('상위 인증서 경로'),
  ]
  }, (req, res) => {
     res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server</p>');
})
.listen(443, () => {
  console.log('443번 포트에서 대기중입니다!');
});