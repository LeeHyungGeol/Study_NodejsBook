# Study Express

## Start Express

폴더를 생성 후, npm init 으로 package.json을 제일 먼저 생성한다.
* `scripts` 부분에 `start 속성`을 꼭 넣어줘야 한다.
* `nodemon app` 을 하면 `app.js` 를 **nodemon 으로 하겠다는 의미**이다.
* 서버 코드에 수정사항이 생길 때마다 매번 서버를 재시작하기 귀찮기 때문에, ***nodemon 모듈로 서버를 자동으로 재시작 한다.***
* `nodemon` 은 `개발용 패키지`로만 사용하는 것을 권장한다. 배포를 하면 코드가 바뀔 일이 빈번히 일어나지 않기 때문에 nodemon 을 사용하지 않아도 된다.

ex) **package.json**

```json
{
  "name": "study-express",
  "version": "0.0.1",
  "description": "\"learn express\"",
  "main": "app3.js",
  "scripts": {
    "start": "nodemon app3"
  },
  "author": "brothergirl",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.19.0",
    "cookie-parser": "^1.4.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "express-session": "^1.17.1",
    "morgan": "^1.10.0",
    "multer": "^1.4.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.7"
  }
}

```

Express 모듈을 실행해서 app 변수에 할당한다.

Express 내부에 http 모듈이 내장되어 있기 때문에 Server의 역할을 할 수 있다.

```js
const express = require('express');
// 단순한 문자열 대신에 HTML 로 응답하고 싶다면 res.sendFile() 메서드를 사용하면 된다. 단 path 모듈로 파일의 경로를 사용해서 지정한다.
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    //res.send('GET / 요청에 대한 라우터 부분');
    // 단순한 문자열 대신에 HTML 로 응답하고 싶다면 res.sendFile() 메서드를 사용하면 된다. 단 path 모듈로 파일의 경로를 사용해서 지정한다.
    res.sendFile(path.join(__dirname, 'index.html'));
});



app.listen(app.get('port'), (req, res) => {
    console.log(app.get('port'), '번 포트에서 대기 중이다, listen에 대한 부분이다.');
});

```

* `app.set(키, 값)` : app 변수에 data를 저장한다. 
* `app.get(키)` : data를 키로 가져올 수 있다.
  * `app.set('port', 포트)` : 서버가 실행될 포트를 설정한다.  
  * process.env 객체에 PORT 속성이 있다면 그 값을 사용하고, 없다면 설정한 PORT 번호를 사용한다.
* `app.get(주소, 라우터)` : `주소`에 대한 `GET 요청`이 들어올 때 `어떤 동작`을 할지 적는다.
  * `라우터` : `라우터 파트`에는 `(req, res)` 으로 어떤 동작을 할지 적는다. 
  * 응답(res)으로 Express 에서는 `res.send` 를 사용하면 된다.
  * GET 요청 이외에도 **POST, PUT, PATCH, DELETE, OPTIONS 에 대한 Router**를 위한 ***app.post, app.put, app.patch, app.delete, app.options 메서드가 존재한다.***
* `listen` : listen을 하는 부분은 http 웹 서버와 동일하다.
  * `app.get('port')`로 port를 가져왔다.   

---

## Middlewares

**Middleware 는 Express 의 핵심이다.**

요청(req)과 응당(res)의 중간(middle)에 위치하여 미들웨어(middleware)라고 부른다.

라우터(router) 와 에러헨들러(errorhandler) 도 미들웨어의 일종이므로 미들웨어가 Express 의 전부라고 할 수 있다.

미들웨어는 app.use와 함께 사용된다. app.use(미들웨어)꼴입니다.

