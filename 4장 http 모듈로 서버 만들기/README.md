## http모듈 사용 : http 서버가 있어야 웹 브라우저의 요청에 대해 처리할 수가 있다.

<img src="https://user-images.githubusercontent.com/56071088/111643758-8d03fd00-8842-11eb-9a6b-f46a6b881c88.jpg" width="400" height="300">

* **localhost(127.0.0.1)** : ***현재 컴퓨터의 내부 주소.*** 외부에서는 접근할 수 없고, 자신의 컴퓨터에서만 접근 가능, 서버 개발 시 테스트 용으로 많이 사용된다.
* **포트(Port)** : ***같은 IP주소 내에서 Processs를 구분.*** 서버는 프로세스에 포트를 다르게 할당하여 요청을 구분한다. 포트번호는 IP 주소 뒤에 콜론(:)과 함께 붙여 사용한다.
  * 보통 포트 하나에 하나의 서비스를 할당. 다른 서버가 사용하고 있는 포트를 사용할 경우 에러가 발생. 에러 메시지 : ***Error: listen EADDRINUSE :::포트번호***
  * 에러가 발생할 경우 그 서비스를 종료하거나 노드의 포트를 다른 번호로 바꾸자. 
 
<img src="https://user-images.githubusercontent.com/56071088/111643864-a6a54480-8842-11eb-85db-3c06624367d9.png" width="400" height="300">

* http.createServer((req, res)=> {}).listen(); 
  * createServer메서드  
    * 인수로 요청에 대한 CallBack 함수를 넣는다. 
    * 요청이 들어올 때 마다 CallBack 함수를 실행한다.
    * CallBack 함수에 응답에 관한 것을 넣는다.
    * ``` 'Content-Type': 'text/html; charset=utf-8'```
  
  * listen(8080, ()=> {}); : 클라이언트에 공개할 포트 번호를 붙이고, 포트(Port)연결 완료 후 실행할 CallBack 함수를 넣는다.
  * server.listen(8080); server.on('listening', ()=>{}); 
    * listen메서드에 콜백 함수를 넣는 대신, listening Event listener를 붙인다.
    * server.on('error', ()=> {}); : error Event Listener를 붙일 수도 있다.
  
  * res.writeHead : 응답에 대한 정보를 기록하는 메서드. 이 정보가 기록되는 부분 : **Header**
  * res.write : 첫번째 인수는 클라이언트로 보낼 데이터. HTML문자열, Buffer등을 보낼 수 있다. res.write메서드 여러번 호출 가능
  * res.end : 응답을 종료하는 메서드. 만약 인수가 있다면 그 데이터도 클라이언트로 보내고 응답을 종료

* 서버는 무조건 요청에 대한 응답을 보내야 한다!!
  * 서버가 클라이언트로 요청에 대해 응답을 보내지 않을 경우, 클라이언트는 서버로부터 응답이 오길 하염없이 기다리다가 일정 시간 후 **Timeout(시간초과)** 처리를 한다. 

---

## HTTP 상태 코드 

* ***res.writeHead()의 첫번째 인수***로 **상태 코드**를 넣는다. **HTTP 상태 코드**
* 2XX : ***성공을 알리는 상태 코드.*** 
  * 대표적으로 **200(성공), 201(작성됨)을 많이 사용.**
* 3XX : ***Redirection(다른 페이지로 이동)을 알리는 상태 코드.*** 어떤 주소를 입력했는데, 다른 주소로 이동할 경우 이 코드가 사용된다.
  * 대표적으로 **301(영구 이동), 302(임시 이동), 304(수정되지 않음)은 요청의 응답으로 캐시를 사용한다는 뜻**이다. 
* 4XX : ***클라이언트의 요청 오류.*** 요청 자체에 오류가 있을 때 표시된다. 
  * 대표적으로 **400(잘못된 요청), 401(권한 없음), 403(금지됨), 404(찾을 수가 없음)을 의미**
* 5XX : ***서버 오류.*** 요청은 제대로 왔지만 서버에 오류가 생겼을 때 발생한다. 백엔드 개발자는 이 오류가 발생하지 않게 주의해서 프로그래밍을 해야 한다.
  * 이 오류를 res.writeHead()를 통해 클라이언트로 보내는 경우는 거의 없고, 예기치 못한 에러 발생 시 서버가 알아서 5XX대 코드를 내보낸다.
  * **500(내부 서버 오류), 502(불량 게이트웨이), 503(서비스를 사용할 수 없음)을 의미**

---

## REST와 라우팅 사용하기

<img src="https://user-images.githubusercontent.com/56071088/111643989-c0468c00-8842-11eb-9c77-76d4e8ccf0fa.jpg" width="500" height="300">

### `서버에 요청`을 보낼 때는 `주소`를 통해 `요청의 내용`을 표현한다.

**REST : REpresential State Transfer : `서버의 자원`을 정의하고, `자원에 대한 주소`를 지정하는 방법**
* 자원이라고 해서 꼭 파일일 필요는 없다. **서버가 행할 수 있는 것들을 통틀어서 의미**한다.

* GET : 서버 자원을 `가져오고자` 할 때 사용한다. 
  * ***요청의 본문에 데이터를 넣지 않는다.*** 
  * data를 server로 보내야 한다면 **querystring을 사용**한다.

* POST : 서버에 자원을 `새로 등록`하고자 할 때 사용한다.
  * 요청의 본문에 새로 등록할 data를 넣어 보낸다.

* PUT : 서버에 자원을 요청에 들어있는 자원으로 `치환`하고자 할 때 사용한다. 
  * 요청의 본문에 치환할 data를 넣어 보낸다.

* PATCH : 서버 자원을 `일부만 수정`하고자 할 때 사용한다.
  * 요청의 본문에 일부 수정할 data를 넣어 보낸다.

* DELETE : 서버 자원을 `삭제`하고자 할 때 사용한다.
  * 요청의 본문에 data를 넣지 않는다.

* OPTIONS : 요청을 하기 전에 통신 옵션을 설명하기 위해 사용한다.    

* 위의 동작들로 표현하기 애매한 동작이 있다면 POST를 사용한다.
  
* GET 메서드의 경우, 브라우저에서 캐싱(Cacheing)(기억)할 수도 있으므로 GET 요청을 할 때 서버가 아닌 캐시(Cache)에서 가져올 수 있다.

* ***res.end() 앞에 return을 붙이는 이유!!*** 
  * Node도 일반적인 JavaScript문법을 따르므로 return을 붙이지 않는 한 함수가 종료되지 않는다. ***따라서 다음에 코드가 이어질 경우에는 return을 써서 명시적으로 함수를 종료한다.***
  * retuen을 붙이지 않고 res.end()같은 메서드가 여러 번 실행된다면 ***Error: Can't set headers after they are sent to the client*** 에러가 발생한다. 

ex) **REST에 기반한 서버 주소 구조**

|HTTP 메서드|주소|역할
|---|---|---|
|GET|/|restFont.html 파일 제공|
|GET|/about|about.html 파일 제공|
|GET|/users|사용자 목록 제공|
|GET|기타|기타 정적 파일 제공|
|POST|/user|사용자 등록|
|PUT|/user/사용자id|해당 id의 사용자 수정|
|DELETE|/user/사용자id|해당 id의 사용자 제거|

---
## Cookie와 Session

* **사용자가 누구인지 기억하기 위해 Server는 requset에 대한 response를 할 때, Cookie라는 것을 같이 보낸다.**
  * Cookie는 유효기간이 있다.
  * name=hyunggeol처럼 단순한 'key-value'의 쌍이다.
  * Web Browser는 Server로부터 Cookie가 오면 Cookie를 저장해둔다. 다음에 request할 때마다 Cookie를 동봉해서 보낸다.
  * Server는 request에 들어있는 Cookie를 읽어서 사용자가 누구인지 파악한다.
  * ***Server는 미리 Client에 요청자(Requester)를 추정할 만한 정보를 Cookie로 만들어 보내고***
  * ***그 다음부터는 Client로 부터 Cookie를 받아 요청자(Requester)를 파악한다.***
  * Cookie를 주기적으로 지우라고 권고하는 것은 바로 이러한 이유 때문이다.
  
* ***Cookie는 Req의 Header에 담겨 전송된다. Browser는 Res의 헤더(Set-Cookie)에 따라 Cookie를 저장한다.*** 

* **Set-Cookie로 쿠키를 설정할 때 옵션(Option)들을 부여할 수 있다.**

```js
 'Set-Cookie' : `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/` 
```

* 옵션(Option)사이에 `세미콜론(;)`을 써서 구분하면 된다.
* **Cookie에는 들어가면 안되는 글자들이 있다.** 대표적으로 ***한글과 줄바꿈***이다. 
  * 한글은 `encodeURIComponent`로 감싸서 넣는다.

* 옵션들(Options)
  * 쿠키명=쿠키값 : ***기본적인 쿠키의 값.*** ex) mycookie=test 또는 name=Sam
  * Expires=날짜 : ***만료 기한.*** 이 기한이 지나면 쿠키가 제거된다. ***기본값(default)은 클라이언트가 종료될 때까지이다.***
  * Max-age=초 : Expires와 비슷하지만 **날짜 대신 초를 입력할 수 있다.** 해당 초가 지나면 쿠기가 제거된다. ***Expires보다 우선한다.***
  * Domain=도메인명 : ***쿠키가 전송될 도메인을 특정***할 수 있다. 기본값은 현재 도메인이다.
  * Path=URL : ***쿠키가 전송될 URL을 특정***할 수 있다. 기본값은 '/'이다. 이 경우 모든 URL에서 쿠키를 전송할 수 있다.
  * Secure : HTTPS일 경우에만 쿠키가 전송된다.
  * HttpOnly : 설정 시 자바스크립트에서 쿠키에 접근할 수 없다. ***쿠키 조작을 방지하기 위해 설정하는 것이 좋다.***    

* **Session은 서버에 사용자 정보를 저장하고, Client와는 Session ID로만 소통한다.**

```js
'Set-Cookie' : `session=${uniqueInt}; Expires = ${expires.toGMTString()}; HttpOnly; Path=/`
```

  * Session Cookie : Session을 위해 사용하는 Cookie. Session을 구현하기 위해 Cookie를 사용하는 방법이 제일 간단하기 때문에 많은 웹 사이트가 이 방법을 사용한다. 
  * Cookie에 `이름`을 담아서 보내는 대신, `uniqueInt`라는 숫자 값을 보낸다.\
  * 사용자의 이름과 만료 시간은 uniqueInt라는 속성명 아래에 있는 session이라는 객체에 대신 저장한다.
  * cookie.session이 있고 만료 기한을 넘기지 않았다면, session 변수에서 사용자 정보를 가져와 사용한다.
  * ***실제 배포용 서버에서는 세션을 위와 같은 변수에 저장하지 않는다.***
    1. **서버기 멈추거나 재시작되면 메모리에 저장된 변수가 초기화 되기 때문이다.**
    2. **서버의 메모리가 부족하면 세션을 저장하지도 못한다.**
    3. ***따라서 보통은 `세션(Session)`을 `Redis` 혹은 `Memcached`와 같은 `데이터베이스(DB)`에 넣어둔다.*** 

  * ***Session과 Cookie를 안전하게 사용하기 위해서는 직접 구현하는 것보다 다른 사람들이 만든 검증된 코드(모듈)를 사용하는 것이 좋다!!***

---

## HTTP와 HTTP2

***`https 모듈`은 웹 서버에 `SSL 암호화`를 추가한다.***
  * GET, POST 요청을 할 때 오가는 data를 암호화해서 중간에 다른 사람이 요청을 가로채덜도 내용을 확인할 수 없게 한다.
  * 요즘은 login이나 payment가 필요한 창에서 HTTPS 적용이 필수가 되는 추세이다.
  * `암호화`를 적용하려면 `https 모듈`을 사용해야 한다.
    * https는 아무나 사용할 수 있는 것이 아니다.
    * 암호화를 적용하는 만큼, 그것을 **인증해줄 수 있는 기관이 필요**하다.
    * `인증서`를 `인증 기관`에서 구입하거나, `Let's Encrypt` 같은 기관에서 `무료로 발급`해주기도 한다. 
    * 인증서를 구입하면 `pem, crt, key 확장자를 가진 파일들`을 제공한다. 각각을 `fs.readFileSync 메서드`로 읽어서 `cert(도메인 인증서), key(도메인 비밀키), ca(상위 인증서) 옵션`에 맞게 넣으면 된다.
    * 도메인도 필요하다.
    * 실제 Server에서는 80 Port 대신 `443 Port`를 사용하면 된다.
  
ex) server1-3.js

* createServer 메서드가 인수를 2개 받는다.
  * 첫번째 인수 : 인증서 관련 옵션들
  * 두번째 인수 : http모듈과 같은 Server로직

```js
const https = require('https');
const fs = require('fs');

// createServer 메서드가 인수를 2개 받는다.
//   첫번째 인수 : 인증서 관련 옵션들
//   두번째 인수 : http모듈과 같은 Server로직

https.createServer( {
  cert : readFileSync('도메인 인증서 경로'),
  key : readFileSync('도메인 비밀키 경로'),
  ca : [
      fs.readFileSync('상위 인증서 경로'),
      fs.readFileSync('상위 인증서 경로'),
  ] }, (req, res) => {
     res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server</p>');
})
.listen(443, () => {
  console.log('443번 포트에서 대기중입니다!');
});
```

**`Node의 http2 모듈(Module)`은 `SSL 암호화`와 더불어 최신 HTTP 프로토콜인 `http/2`를 사용할 수 있다.**
  * http/2는 요청 및 응답 방식이 기존 http/1.1보다 개선되어 훨씬 효율적으로 요청을 보낸다.
  * http/2를 사용하면 웹의 속도도 많이 개선된다.
  
ex) HTTP/1.1 과 HTTP/2의 비교

<img src="https://user-images.githubusercontent.com/56071088/111738880-75ba2380-88c5-11eb-8e91-ca384eb5c9b7.png" width="400" height="300">


---

## cluster

**`cluster 모듈`은 기본적으로 `싱글 프로세스로 동작하는 Node`가 `CPU 코어를 모두 사용`할 수 있게 해주는 `모듈`**

  * **`Port를 공유`하는 `노드 프로세스를 여러 개` 둘 수도 있다.**
  * 요청이 많이 들어왔을 때 병렬로 실행된 서버의 개수만큼 `요청이 분산`되게 할 수 있다.
    * 서버에 무리가 덜 간다.
  * Core가 8개인 서버가 있을 때, Node는 보통 Core를 하나만 활용한다.
    * cluster모듈을 설정하여 코어 하나당 노드 프로세스 하나가 돌아갈 수 있게 할 수 있다.
    * 성능이 딱 8배 되는 것은 아니지만 하나를 사용할 때보다는 성능이 개선된다.

  * 단점 
    1.  Memory를 공유하지 못한다.
    2.  Session을 memory에 저장하는 경우 문제가 될 수 있다. -> `Redis등의 서버를 도입`하여 해결할 수 있다.

* cluster에는 `Master Process`와 `Worker Process`가 있다.
  * Master Process는 CPU 개수만큼 워커 프로세스를 만들고 설정된 Port번호에서 대기한다.
  * 요청이 들어오면 워커 프로세스에 요청을 분배한다.
  * Worker Process는 실질적으로 일을 하는 Process이다.

* ***`실무`에서는 `pm2등의 모듈`을 사용하여 `cluter기능`을 사용한다.*** 

<img src="https://user-images.githubusercontent.com/56071088/111744934-4f00ea80-88cf-11eb-8e5b-662e5d87f962.png" width="400" height="300">

  



