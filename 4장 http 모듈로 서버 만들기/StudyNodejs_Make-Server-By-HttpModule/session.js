const http= require('http');
const fs = require('fs').promises;
const url = require('url');
//search 부분을 사용하기 쉽게 객체로 만드는 모듈
//search는 물음표(?)로 시작하고, 그 뒤에 키=값 형식으로 데이터를 전달한다.
const qs = require('querystring');

const parseCookies = (cookie = '') => 
    cookie
        .split(';')
        .map(v=>v.split('='))
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});    

//cookie2.js와 다른 부분
const session = {}; //object literal
/////////////

http.createServer( async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);

    // 주소가 /login으로 시작하는 경우
    if(req.url.startsWith('/login')) {
        const { query } = url.parse(req.url);
        //WHATWG 방식이 url 대신 기존 Node의 url을 사용
        const { name } = qs.parse(query);
        const expires = new Date();

        //쿠키 유효 시간을 현재 시간 + 1분으로 설정
        expires.setMinutes(expires.getMinutes + 1);

        //cookie2.js와 다른 부분
        const uniqueInt = Date.now();
        session[uniqueInt] = {
            name,
            expires,
        };
        /////////////

        res.writeHead(302, {
            Location : '/',
            //cookie2.js와 다른 부분
            'Set-Cookie' : `session=${uniqueInt}; Expires = ${expires.toGMTString()}; HttpOnly; Path=/`,
            /////////////
        });
        res.end();
    }
    //세션 쿠키가 존재하고, 만료 기간이 지나지 않았다면
    //cookie2.js와 다른 부분
    else if(cookies.session && session[cookies.session].expires > new Date()) {
        res.writeHead(200, { 'Content-Type' : 'text/plain; charset=utf-8'});
        res.end(`${cookies.name}님 안녕하세요.`);
    }
    else {
        try {
        const data = await fs.readFile('./cookie2.html');
        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
        res.end(data);
        } catch (err) {
            console.error(err);
            res.writeHead(500, {'Content-Type' : 'text/plain; charset=utf-8'});
            res.end(err.message);
        }
    }
})
.listen(8085, () => {
    console.log('8085번 포트에서 서버 대기 중입니다!');
})