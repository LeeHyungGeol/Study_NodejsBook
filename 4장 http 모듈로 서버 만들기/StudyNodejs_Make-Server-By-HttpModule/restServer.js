const http = require('http');
const fs = require('fs').promises;

const users = {}; //object literal // 데이터 저장용

http.createServer( async (req, res) => {
    try {
        //req.method로 HTTP 요청 메서드를 구분, req.url로 요청 주소를 구분한다.
        console.log(req.method, req.url);
        if(req.method === 'GET') {
            if(req.url==='/') {
                const data = await fs.readFile('./restFront.html');
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                return res.end(data);
            }
            else if(req.url === '/about') {
                const data = await fs.readFile('./about.html');
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                return res.end(data);
            }
            else if(req.url === '/users') {
                res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                // Object to JSON -> stringify(obj)
                // object --------serialize--->>> JSON(String)
                return res.end(JSON.stringify(users));
            }
            // req.url이 /도 /about도 /users도 아닐 때
            try {
                const data = await fs.readFile(`.${req.url}`);
                return res.end(data);
            } catch (err) {
                // 주소에 해당하는 못 찾았다는 404 Not Found Error 발생
                console.error(err);
            }
        }
        else if(req.method === 'POST') {
            if(req.url === '/user') {
                let body = '';
                
                //req의 body를 Stream형식으로 받는다.
                //req와 res도 내부적으로는 스트림(각각 readStream, writeStream)으로 되어있으므로
                //요청/응답의 데이터가 각각 Stream 형식으로 전달된다.
                //받은 데이터는 문자열(String)이므로 JSON.parse()과정이 필요하다.
                req.on('data', (data)=>{
                    body += data;
                });

                //req의 body를 다 받은 후에 실행한다.
                return req.on('end', () => {
                    console.log('POST 본문(Body) :',body);
                    //JSON to Object
                    // parse(JSON)
                    const {name} = JSON.parse(body);
                    const id = Date.now();
                    users[id]=name;
                    res.writeHead(200);
                    res.end('등록 성공');
                });
            }
        }
        else if(req.method === 'PUT') {
            if(req.url.startsWith('/user/')) {

                const key = req.url.split('/')[2];
                let body = '';

                //req의 body를 Stream형식으로 받는다.
                //req와 res도 내부적으로는 스트림(각각 readStream, writeStream)으로 되어있으므로
                //요청/응답의 데이터가 각각 Stream 형식으로 전달된다.
                //받은 데이터는 문자열(String)이므로 JSON.parse()과정이 필요하다.
                req.on('data', (data) => {
                    body += data;
                });

                return req.on('end', () => {
                    console.log('PUT 본문(Body) : ',body);
                    users[key]=JSON.parse(body).name;
                    return res.end(JSON.stringify(users));
                });
            }
        }
        else if(req.method === 'DELETE') {
            if(req.url.startsWith('/user/')) {
                const key = req.url.split('/')[2];
                delete users[key];
                return res.end(JSON.stringify(users));
            }
            res.writeHead(404);
            return res.end('NOT FOUND');
        }
        // 서버 오류 5XX : 응답 과정 중에 예기치 못한 에러가 발생한 경우(실무에서 500을 전송하는 경우는 드물다.)
    } catch (err) {
        console.error(err);
        res.writeHead(500);
        res.end(err);
    }
})
.listen(8082, ()=> {
    console.log('8082번 포트에서 서버 대기 중입니다.');
});

