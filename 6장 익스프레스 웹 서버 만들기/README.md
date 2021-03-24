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

### **`Middleware` 는 `Express 의 핵심`이다.**

### 미들웨어는 app.use와 함께 사용된다.

요청(req)과 응당(res)의 중간(middle)에 위치하여 미들웨어(middleware)라고 부른다.

라우터(router) 와 에러헨들러(errorhandler) 도 미들웨어의 일종이므로 미들웨어가 Express 의 전부라고 할 수 있다.

**미들웨어는 app.use와 함께 사용된다.** `app.use(미들웨어)꼴`입니다.

ex) **미들웨어가 실행되는 경우**

app.use('주소', 미들웨어) or app.httpMethod('주소', 미들웨어) 의 형식

|형식|의미|
|---|---|
|app.use(미들웨어)|모든 요청에서 미들웨어가 실행|
|app.use('/abc', 미들웨어)|abc로 시작한는 요청에서 미들웨어가 실행된다.|
|app.post('/abc', 미들웨어)|abc로 시작하는 POST 요청에서 미들웨어가 실행된다.|

미들웨어는 위에서부터 아래로 순서대로 실행된다.

`app.use((req, res, next) => {});` : app.use 에 **(req, res, next) 함수**를 넣는다.
* `next` : 다음 미들웨어로 넘어가는 함수. **next를 실행하지 않으면 다음 미들웨어가 실행되지 않는다.**
* 주소를 첫번째 인수로 주지 않는다면 미들웨어는 모든 요청에서 실행된다. 주소를 넣는다면 해당 요청에서만 미들웨어가 실행.
  
`app.use 또는 app.get('/', (req, res, next) => {}, (req, res) => {}...);`
* 라우터에 **미들웨어를 여러개 장착**할 수 있다. 
* 이때도 next를 호출해야만 다음 미들웨어로 넘어간다.

```js
app.get('/', (req, res, next) => {
    console.log(' GET / 요청에서만 실행된다. ');
    next();
}, (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로 간다.');
});
```

### **에러 처리 미들웨어**

`app.use((err, req, res, next) => {});` : **에러 처리 미들웨어**는 매개변수를 모두 사용하지 않더라도 ***4개***여야만 한다.
* `err` : 에러에 관한 정보가 담겨 있다.
* `res.status 메서드`로 HTTP 상태 코드를 지정할 수 있다. 기본값은 200(성공)이다.
* 에러 처리 미들웨어는 특별한 경우가 아니라면 ***맨 밑에 위치***하는 것이 좋다. 실무에서는 직접 에러 처리 미들웨어를 연결해주는 것이 좋다.

```js
// 404 응답 미들웨어
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV === 'production' ? {} : err;
    res.status(err.status || 500);
    res.render('error');
});
```

* 404 에러가 발생한다면 res.locals.message 는 *${req.method} ${req.url} 라우터가 없습니다* 가 된다.

* 에러 처리 미들웨어는 **error라는 템플릿 파일을 렌더링**한다.

* 렌더링 시 **res.locals.message 와 res.locals.error 가 함께 렌더링** 된다.

* ***res.render 에 변수값을 대입하는 것 외에도, res.locals 속성에 값을 넣어서 템플릿 엔진에 변수를 주입할 수 있다.***

* error 객체의 스택 트레이스(error.html 의 error.stack)는 시스템 환경(process.env.NODE_ENV)이 배포 환경(production)이 아닌 경우에만 표시한다.
  * 배포환경인 경우에는 에러 메시지만 표시된다. 
  * ***에러 스택 트레이스가 노출되면 보안에 취약할 수 있기 때문이다.***

---

### **dotenv**

`dotenv` 는 **process.env 를 관리**하기 위해 설치한다.

`dotenv` 는 미들웨어가 아닌 **패키지**이다.

`.env 파일`을 직접 만들어서 **COOKIE_SECRET=cookiesecret** 과 같은 key=value 형식으로 추가한다.

dotenv 패키지는 `.env` 파일을 읽어서 `process.env` 로 만든다.
* process.env.COOKIE_SECRET 에 cookiesecret 값이 할당된다.
* 보안과 설정의 편의성 때문에 dotenv 패키지로 process.env 를 관리한다.
* .env 같은 별도의 파일에 비밀 키를 적어두고 dotenv 패키지로 비밀 키를 로딩하는 방식으로 관리한다.
* 소스 코드가 유출되더라도 .env 파일만 잘 관리하면 비밀 키는 지킬 수 있다.

---

### **morgan**

`morgan 미들웨어`는 **요청과 응답에 대한 정보**를 **console 에 기록**한다.

```js
// dev, combined, common, short, tiny
app.use(morgan('dev'));
```

인수로 ***dev*** 이외에도 ***combined, common, short, tiny*** 등을 넣을 수 있다.
* 인수를 바꾸면 로그도 달라진다.
* 보통 `개발 환경`에서는 **dev**, `배포 환경`에서는 **combined**
* dev 모드 기준 [HTTP 메서드][주소][HTTP 상태 코드][응답 속도]-[응답 바이트]

---

### **static**

`static 미들웨어`는 `정적인 파일들`을 제공하는 **라우터 역할**

기본적으로 제공되기 때문에 따로 설치할 필요 없이 express 객체에서 꺼내어 장착한다.

```js
app.use('요청 경로', express.static('실제 경로'));

app.use('/', express.static(path.join(__dirname, 'public')));
```

**함수의 인수**로 **정적 파일들**이 담겨 있는 **폴더를 지정**하면 된다. 여기서는 public 을 사용하였다.

public 폴더를 만들고 css, js, img 파일들을 public 폴더에 넣으면 브라우저에서 접근할 수 있게 된다.

***요청 주소에는 public이 들어있지 않고, 실제 서버의 폴더 경로에만 public이 들어있다.***
* 요청 주소와 실제 서버의 폴더 경로가 다르기 때문에 외부인이 실제 서버 구조를 파악하기 어렵고 보안에 큰 도움이 된다.

요청 경로에 해당하는 **파일이 없으면** 알아서 **내부적으로 next를 호출**

**파일을 발견했다면 다음 미들웨어는 실행하지 않는다.**
 * 응답으로 파일을 보내고 next를 호출하지 않는다.

---

### **body-parser**

`body-parser`는 **요청의 본문(body)에 있는 데이터**를 해석해서 **req.body 객체**로 만들어주는 미들웨어

보통 폼 데이터나 AJAX 요청의 데이터를 처리한다.

멀티 파트(이미지, 동영사, 파일) 데이터는 처리하지 못하고, multer 미들웨어로 처리한다.

```js
const bodyParser = require('body-parser');
// express 4.16.0 버전 이후로 body-parser 미들웨어의 일부 기능이 express 에 내장되어 있다.
app.use(express.join());
app.use(express.urlencoded({ extended : false }));
// raw, text 는 express 에 내장되어 있지 않다.
app.use(bodyParser.raw());
app.use(bodyParser.text());
```
요청 데이터 종류
* `Raw` : 요청의 본문(body)이 buffer 데이터일 때
* `Text` : 요청의 본문(body)이 text 데이터일 때
* `JSON` : 요청의 본문(body)이 JSON 형식의 전달 방식일 때
* `URL-encoded` : **주소 형식**으로 데이터를 보낼 때
  * `{ extended : false }` : false 이면 `노드의 querystring 모듈`을 사용하여 쿼리스트링을 해석
  * `{ extended : true }` : true 이면 `qs 모듈`을 사용하여 쿼리스트링을 해석. **qs 모듈은 querystring을 확장한 npm 패키지**이다.

`body-parser` 은 **내부적으로 stream** 을 처리해 ***req.body 에 추가***한다.

ex)

`JSON 형식` : { name : 'lee', age : 20 } 을 본문으로 보낸다면 req.body 에 그대로 들어간다.

`URL-encoded 형식` : name=lee&age=20 를 본문으로 보낸다면 req.body 에 그대로 들어간다.

---

### **cookie-parser**

`cookie-parser`는 **요청에 동봉된 쿠키**를 해석하여 **req.cookies 객체**로 만든다.

```js
// 비밀키 = process.env.COOKIE_SECRET
app.use(cookieParser(비밀키));
```

해석된 cookie들은 **req.cookies 객체**에 들어간다. ***유효기간이 지난 쿠키들은 알아서 걸러진다.***

ex) name=lee 쿠키 => req.cookies = { name : 'lee' }

첫번째 인수로 `비밀키`를 넣어줄 수 있다.
* 서명된 쿠키가 있을 경우, 제공한 비밀키를 통해서 해당 쿠키가 내 서버에서 만든 쿠키임을 검증할 수 있다.
* 쿠키는 위조하기 쉬우므로 쿠키 뒤에 **비밀키로 만들어낸 sign을 붙인다.**

ex) name=lee`.sign` 쿠키 => `req.signedCookies 객체`

#### **쿠키의 생성 및 제거**

`쿠키를 생성 및 제거`하기 위해서는 `res.cookie(키, 값, 옵션)` / `res.clearCookie(키, 값, 옵션)`

```js
res.cookie('name', 'lee', {
    expires : new Date(Date.now() + 10000),
    httpOnly : true,
    secure : true,
    signed : true,
});

res.clearCookie('name', 'lee', { httpOnly : true, secure : true, signed : true });
```

옵션들 : domain, expires, maxAge, httpOnly, path, secure, signed

* `쿠키명=쿠키값` : ***기본적인 쿠키의 값.*** ex) mycookie=test 또는 name=Sam

* `expires=날짜` : ***만료 기한.*** 이 기한이 지나면 쿠키가 제거된다. ***기본값(default)은 클라이언트가 종료될 때까지이다.***
* `maxAge=초` : Expires와 비슷하지만 **날짜 대신 초를 입력할 수 있다.** 해당 초가 지나면 쿠기가 제거된다. ***Expires보다 우선한다.***
* `domain=도메인명` : ***쿠키가 전송될 도메인을 특정***할 수 있다. 기본값은 현재 도메인이다.
* `path=URL` : ***쿠키가 전송될 URL을 특정***할 수 있다. 기본값은 '/'이다. 이 경우 모든 URL에서 쿠키를 전송할 수 있다.
* `secure` : HTTPS일 경우에만 쿠키가 전송된다.
* `httpOnly` : 설정 시 자바스크립트에서 쿠키에 접근할 수 없다. ***쿠키 조작을 방지하기 위해 설정하는 것이 좋다.***   

***쿠키를 지우려면 옵션 값들도 정확히 일치해야 쿠키가 지워진다. 단 expires, maxAge 옵션은 일치하지 않아도 된다.***

`signed 옵션` : signed 옵션을 **true** 로 설정할 시에 **쿠키 뒤에 서명**이 붙는다. 서버가 쿠키를 만들었다는 것을 검증하기 위해 대부분 켜놓는다.

`서명을 위한 비밀키` : cookieParser 미들웨어 인수로 넣은 `process.env.COOKIE_SECRET` 이다.

---

### **express-session**

`express-session`은 session 관리용 미들웨어

로그인 등의 이유로 세션을 구현하거나 특정 사용자를 위한 데이터를 임시적으로 저장해둘 때 매우 유용하다.

세션은 사용자별로 req.session 객체 안에 유지된다.

```js
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET, // 쿠키에 서명을 추가, 쿠키를 서명하는데 secret 값이 필요하다.
    cookie : {
        httpOnly : true,
        secure : false,
    },
    name : 'session-cookie', //`express-session` 은 세션 관리시 `클라이언트에 쿠키를 보낸다.`
}));
```

세션에 대한 설정
* `resave` : 요청이 올 때, 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장할지 설정하는 것
* `saveUninitialized` : 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정하는 것
* **`session-cookie`** : `express-session` 은 세션 관리시 `클라이언트에 쿠키를 보낸다.`
  * `secret` : `쿠키에 서명`을 추가하기 위해 사용한다. **cookie-parser 의 secret 과 같게 설정한다.** 
* `name` : 세션 쿠키의 이름을 설정. 기본값은 connect.sid 이다.
* `cookie` : 쿠키에 대한 옵션을 설정한다. domain, expires, maxAge, httpOnly, path, secure 등 기본적인 쿠키 옵션과 동일하게 설정 가능하다.
* `store` : 현재는 메모리에 세션을 저장하지만, 메모리에 세션을 저장하면 서버가 재시작하면 초기화되어 세션들이 모두 사라진다.
  * 배포시에는 `store`에 `redis` 데이터베이스를 연결하여 저장해서 **세션을 유지한다.**

```js
req.session.name = 'lee'; // 세션 등록
req.sessionID; // 세션 아이디 확인
req.session.destroy(); // 세션 모두 제거
```

express.session 에서 `서명한 쿠키` 앞에는 `s:`이 붙는다. 실제로는 encodeURIComponent 함수로 인해 `s%3A`가 붙는다.
* ex) name=connect.sid, value = s%3A~~~~~
* **s%3A** 의 **뒷부분은 암호화된 쿠키 내용**이다.
* **s%3A** 가 붙어있다면 **express-session 미들웨어에 의해 암호화된 것**이라고 보면 된다.

---

## 미들웨어 특성

### **동시에 여러 개의 미들웨어**를 장착할 수 있다.

```js
app.use(
    morgan('dev'),
    express.static('/', path.join(__dirname, 'public')),
    express.json(),
    express.urlencoded( { extended : false } ),
    cookieParser(process.env.COOKIE_SECRET),
);
```

`next()` : **다음 미들웨어**로 이동.

`express.static` 은 파일이 존재하면 파일을 보내주고 next()를 호출하지 않는다. 파일이 존재하지 않는다면 next()를 호출한다.
* **정적 파일을 제공할 때**, next() 대신 ***res.sendFile 메서드***로 응답을 보내야 한다.
* next를 호출하지 않는 미들웨어는 **res.send, res.sendFile** 등의 메서드로 응답을 보내야 한다.

`next('route')` : `다음 라우터의 미들웨어`로 이동, 'route'라는 문자열 이외에 다른 문자열을 넣을 시, `에러 처리 미들웨어`로 이동

<img src="https://user-images.githubusercontent.com/56071088/112264844-cf9b5e80-8cb4-11eb-8e81-27bcbc81b24f.jpg" width="500" height="400">

### **미들웨어간 데이터**를 전달하는 방법 

**요청이 끝날 때 까지만 데이터를 유지한다.** req 객체안에 데이터를 넣어서 전달한다. ex) req.data = '데이터 넣기'

* 새로운 요청이 들어오면 req.data 는 초기화된다.

```js
app.use((req, res, next) => {
    req.data = '데이터 넣기';
    next();
}, (req, res, next) => {
    console.log(req.data);
    next();
});
```

### **미들웨어 안에 미들웨어**를 넣는 패턴

이 패턴이 유용한 이유는 기존 미들웨어의 기능을 확장한다.

```js 

app.use(morgan('dev'));
// ===
app.use((req, res, next) => {
    morgan('dev')(req, res, next);
})

app.use((req, res, next) => {
    if(process.env.NODE_ENV === 'production') {
        morgan('combined')(req, res, next);
    } else {
        morgan('dev')(req, res, next);
    }
});
```

---

## Router 객체로 routing 분리

`app.get` 같은 것들이 `라우터 부분`이다.

ex) routes/index.js

```js
const express = require('express');

const router = express.Router();

// GET / router
app.get('/', (req, res) => {
    res.send('routes/index.js : GET / router');
});

module.exports = router;
```

ex) routes/user.js

```js
const express = require('express');

const router = express.Router();

// GET /user router
app.get('/user', (req, res) => {
    res.send('routes/user.js : GET /user router');
});

module.exports = router;
```

index.js 와 user.js 를 app.use 를 통해 app.js 에 연결한다.

에러 처리 미들웨어 위에 404 코드를 응답하는 미들웨어 하나를 추가한다.

ex) app.js

```js
const path = require('path');

dotenv.config();
// './routes' === './routes/index'
const indexRouter = require('./routes');
const userRouter = require('./routes/user');

app.use('/', indexRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
    res.stauts(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
```

index.js 와 user.js 는 모양이 비슷하지만, ***다른 주소의 라우터 역할***을 하고 있다.

app.use 로 연결할 때의 차이 때문이다.

1. indexRouter 는 use 의 '/' 와 get 의 '/' 가 합쳐져 `GET / 라우터`가 되었다.
2. userRouter 는 use 의 '/' 와 get 의 '/user' 가 합쳐져 `GET /user 라우터`가 되었다.

이렇게 `app.use 로 연결`할 때 `주소가 합쳐진다`는 것을 기억하자!!

---

## next('route') : ***라우터에 연결된 나머지 미들웨어들을 건너뛰고 싶을 때 사용***

```js
router.get('/', function (req, res, next) {
    //나머지 미들웨어들을 처리하지 않고 바로 다음 라우터로 이동한다.
    next('route');
}, function (req, res, next) {
    console.log('실행되지 않습니다.');
    next();
}, function (req, res, next) {
    console.log('실행되지 않습니다.');
    next();
});

router.get('/', function (req, res) {
    console.log('실행됩니다.');
    res.send('서버의 응답입니다.');
});
```

같은 주소('/')의 라우터를 여러 개 만들어도 된다.

라우터가 몇개이든 next()를 호출하면 다음 미들웨어가 실행된다.

next('route')를 호출하면 `첫번째 라우터`의 `두번째, 세번째 미들웨어`는 실행하지 않고 

***주소와 일치하는 다음 라우터로 넘어간다.***

---

## `라우터 매개변수`라고 불리는 패턴 ex) '/user/:id'
```js
router.get('/user/:id', function (req, res) {
    console.log(req.params, req.query);
})
```

`주소에 :id` 가 있다. 이 부분에는 다른 값을 넣을 수 있다.
* ex) /user/1 , /user/123

**`req.params 객체`** 안에 값이 들어있다.
* id 이면 req.params.id, type 이면 req.params.type 으로 조회할 수 있다.

***주의할 점*** : 다양한 라우터를 아우르는 와일드 카드 역할이므로 ***일반 라우터 보다 뒤에 위치해야 다른 라우터를 방해하지 않는다.***
* '/user/like' 과 같은 라우터도 '/user/:id' 와 같은 라우트 매개변수를 쓰는 라우터보다 위에 위치해야 한다.
```js
router.get('/user/:id', function (req, res) {
    console.log(':id 가 있으므로 이 라우터만 실행된다.');
});

router.get('/user/like', function (req, res) {
    console.log('이 라우터는 실행되지 않습니다.');
});
```

---

### **주소에 querystring을 쓸 때**

querystring 의 key=value 는 **req.query 객체** 안에 들어있다.
* ex) '/user/123?limit=5&skip=10' 일 때
  
|req.parmas|req.query|
|---|---|
| { id : '123' } | { limit : '5', skip = '10' }|

---

### 주소는 같지만 메서드는 다른 코드를 하나로 줄인다.

**app.route 또는 router.route 를 활용한다.**

```js
router.get('/abc', (req, res) => {
    res.send('GET / abc');
});

router.post('/abc', (req, res) => {
    res.send('POST / abc');
});

// --->

router.route('/abc')
    .get((req, res) => {
        res.send('GET / abc');
    })
    .post((req, res) => {
        res.send('POST / abc');
    });
```

---

## **req, res `객체`**

### **req**

* `req.app` :  req 객체를 통해 app 객체에 접근할 수 있다. ex) req.app.get('port') 와 같이 사용 가능하다.
* `req.body` : `body-parser 미들웨어`가 요청의 본문(body)를 해석한 `객체`
* `req.cookies` : `cookie-parser 미들웨어`가 요청의 cookie를 해석한 `객체`
* `req.signedCookies` : 서명된 쿠키들은 req.cookies가 아닌 여기에 담겨있다.
* `req.ip` : 요청의 ip 주소가 담겨있다.
* `req.params` : `라우트 매개변수`에 대한 정보가 담긴 `객체`
* `req.query` : querystring에 대한 정보가 담긴 `객체`
* `req.get(헤더 이름)` : header의 값을 가져오고 싶을 때 사용하는 `메서드`

### **res**

* `res.app` : req.app 처럼 res 를 통해 app 객체에 접근할 수 있다.
* `res.cookie(키, 값, 옵션)` : 쿠키를 설정하는 `메서드`
* `res.clearCookie(키, 값, 옵션)` : 쿠키를 삭제하는 `메서드`
* `res.end()` : 데이터 없이 응답을 보낸다.
* `res.json(JSON)` : JSON 형식으로 응답을 보낸다.
* `res.redirect(주소)` : 리다이렉트할 주소와 함께 응답을 보낸다.
* `res.render(뷰, 데이터)` : `템플릿 엔진을 렌더링`해서 응답할 때 사용하는 메서드
* `res.send(데이터)` : 데이터와 함께 응답한다. 데이터 : 문자열, HTML, Buffer, 객체, 배열일 수도 있다.
* `res.sendFile(경로)` : 경로에 있는 파일을 응답한다.
* `res.set(헤더, 값)` : `응답의 헤더`를 설정한다.
* `res.status(코드)` : 응답 시의 `HTTP 상태 코드`를 지정
  
활용법 : **`메서드 체이닝`** ex) 

```js
res
    .status(201)
    .cookie('name', 'test1')
    .redirect('/admin');
```






