# `npm`은 Node Package Manager의 약자로 노드 패키지 매니저를 뜻한다.

* `npm에 업로드된 노드 모듈`을 `패키지`라고 부른다.

* `package.json` : 설치한 패키지의 버전을 관리하는 파일
  
* ***노드 프로젝트를 시작하기 전에는 폴더 내부에 무조건 package.json부터 만들고 시작해야 한다!!!***

* **npm은 package.json을 만드는 명령어를 제공한다.**

---

## package.json으로 Package 관리하기

* `npm init` : package.json 파일을 생성한다.
  * **package name** : 패키지의 이름. 
    * package.json의 `name` 속성에 저장된다.
  
  * **version** : 패키지의 버젼. 
    * npm의 버젼은 다소 엄격하게 관리된다.
  
  * **entry point** : ***JavaScript 실행 파일 진입점.*** 
    * 보통 `마지막으로 module.exports를 하는 파일`로 지정한다. 
    * package.json의 `main`속성에 저장된다.
  
  * **test command** : ***code를 test할 때 입력할 명령어.*** 
    * package.json의 scripts속성 안의 `test`속성에 저장된다.
  
  * **git repository** : 코드를 저장해둔 Git 저장소 주소를 의미한다.
    * package.json의 `repository` 속성에 저장된다.
  
  * **keywords** : 키워드는 npm 공식 홈페이지에서 패키지를 쉽게 찾을 수 있도록 해준다.
    * package.json의 `keywords` 속성에 저장된다.

  * **license** : 해당 패키지의 license를 넣으면 된다.
    * 오픈 소스라고 해서 아무런 제약 없이 사용할 수 있는 것은 아니다.
    * license별로 제한사항이 있으므로 설치 전에 반드시 license를 확인하자.
      * `ISC, MIT, BSD` license를 가진 package : 사용한 패키지와 라이선스만 밝히면 자유롭게 사용 가능하다.
      * `Apache` license package : 사용은 자유롭지만 특허권에 대한 제한이 포함되어 있다.
      * `GPL` license package : ***조심해야 한다!*** GPL 계열의 패키지를 사용한 패키지는 배포할 때는 자신의 패키지도 GPL로 배포하고 소스 코드도 공개해야 한다.
    * ***상용 프로그램을 개발했을 때 법적 문제가 생길 수 있으므로 license 세부 내용을 잘 읽어보자!!***

ex) package.json

```json
{
    "name" : "studynpm",
    "version" : "0.0.1",
    "description" : "study npm & package.json",
    "main" : "index.js",
    "scripts" : { 
        "test" : "echo \"Error: no test specified\" && exit 1"
    },
    "author" : "LeeBrotherGirl",
    "license" : "ISC",
    "dependencies" : {
        "express" : "^4.17.1",
        "cookie-parser" : "^1.4.5",
        "express-session" : "^1.17.1",
        "morgan" : "^1.10.0"
    },
     "devDependencies" : {
        "nodemon" : "^2.0.3",
    }
}
```

* **`scripts`** : ***`npm 명령어를 저장`해두는 부분.***
  
  * scripts속성에 명령어 여러 개를 등록해두고 사용할 수 있다.
    * 보통 start 명령어에 node [파일명]을 저장해두고 npm start로 실행한다.
    * start, test 같은 script는 run을 붙이지 않아도 실행된다.   
  
  * `npm run [스크립트 명령어]` : 해당 스크립트가 실행된다. 
    * ex) npm run test
    * echo "Error: no test specified" : 콘솔에 해당 문자열을 출력하라는 의미
    * exit 1 : 에러와 함께 종료하라는 의미 
    
* `npm install [패키지 이름]` : 패키지 설치
* `npm install [패키지 1] [패키지 2] [...]` : 모듈 여러 개 동시에 설치
  * npm install [패키지 이름]을 package.json이 있는 폴더의 콘솔에서 입력하면 된다.
  
  * ex) npm install express
  * 설치한 패키지는 package.json에 기록된다.
  * `package.json`에 `dependencies` 라는 속성이 생긴다.
  * `--save` : npm install 명령어에 `dependencies에 패키지 이름을 추가하는 옵션`으로 붙이지만, ***npm@5 부터는 기본값으로 설정되어 따로 붙이지 않아도 된다.***
  * `node_modules 폴더` : `설치한 패키지들`이 들어 있다.
    * 패키지 하나가 다른 여러 패키지를 의존하고, 그 패키지들은 또 다른 패키지들에 의존한다.
    * 의존 관계가 복잡하게 얽혀 있기 때문에 package.json이 필요하다.
  
  * `package-lock.json` : `node_modules 폴더`에 들어 있는 `패키지들의 정확한 버전과 의존관계`를 이 파일에 저장한다. 

* `npm install --save-dev [패키지] [...]` : `개발용 패키지`, ***실제 배포시에는 사용되지 않고, 개발 중에만 사용되는 패키지***
  * `devDependencies 속성` : 개발용 패키지들만 따로 보관

* rimraf 패키지 : 리눅스나 맥의 rm -rf 명령어를 윈도에서도 사용할 수 있게 해주는 패키지

* `npx` : 패키지를 전역 설치 하게 되면 package.json에 기록되지 않아 다시 설치할 때 어려움이 있다. 전역 설치를 하지 않고 전역 설치 한 것과 같은 효과를 내기 위해 사용. -> ***명령어로 사용 가능***
  * npm install --save-dev rimraf
  * npx rimraf node_modules
  * rimraf 패키지를 devdependencies에 추가하고, npx 명령어를 붙여 실행할 수 있다.
  * 패키지가 package.json에 기록되어 있으므로 version관리도 용이하다.      


* WARN `audited [숫자] packages` 
  * 패키지에 있을 수 있는 취약점을 검사했다는 의미
* `npm audit` : ***`패키지의 알려진 취약점을 검사`할 수 있는 명령어***
  * npm audit을 통해 내가 혹시 악성 코드가 있는 패키지를 설치하지 않았는지 검사할 수 있다. 
  * `npm audit fix` : ***npm이 `스스로 수정할 수 있는 취약점을 알아서 수정`해준다. 주기적으로 수정하자!!!.***

---

## 패키지 버젼 이해하기

`SemVer : Semantic Versioning(유의적 버전)의 약어` : 버전을 구성하는 세 자리가 모두 의미를 가지고 있다.
    ***버전 번호를 어떻게 정리하고 올려야 하는지를 명시하는 규칙***

* major 버전 : major 버전이 0이면 초기 개발 중, 1 부터는 정식 버전을 의미
  * major 버전은 하위 호완이 안 될 정도로 패키지의 내용이 수정되었을 때 올린다.
  * ex) 1.5.0 -> 2.0.0으로 사람들이 업데이트했을 때 에러가 발생할 확률이 크다는 뜻

* minor 버전 : minor 버전은 하위 호완이 되는 기능 업데이트를 할 때 올린다.
  * ex) 1.5.0 -> 1.6.0으로 올릴 때 사용자가 아무 문제가 없어야 한다.

* patch 버전 :새로운 기능이 추가되었다기보다는 기존 기능에 문제가 있어 수정한 것을 내놓았을 때 patch 버전을 올린다.
  * ex) 1.5.1 -> 1.5.2 당연히 업데이트 후 아무 문제가 없어야 한다.

새 버전을 배포한 후에는 그 버전의 내용을 절대 수정하면 안된다.

만약 수정 사항이 생기면 major버전, minor버전, patch버전 중 하나를 의미에 맞게 올려서 새로운 버전으로 배포해야 한다.

버전의 숫자마다 의미가 부여되어 있으므로 다른 패키지를 사용할 때도 버전만 보고 에러 발생 여부를 가늠할 수 있다.

`^, ~, >, <` : 버전에는 포함되지 않지만 설치하거나 업데이트할 때 어떤 버전을 설치해야 하는지 알려준다.

* `^` : minor 버전까지만 설치하거나 업데이트한다. 
  * ex) npm i express@^1.1.1 이라면, 1.1.1 이상부터 2.0.0 미만 버전까지 설치된다. 2.0.0은 설치되지 않는다.

* `~` : patch 버전까지만 설치하거나 업데이트한다.
  * ex) npm i express@~1.1.1 이라면, 1.1.1 이상부터 1.2.0 미만 버전까지 설치된다. 

* `>, <, >=, <=, =` : 초과, 미만, 이상, 이하, 동일을 의미. 
  * ex) npm i express@>1.1.1 이라면, 반드시 1.1.1 버전보다 높은 버전이 설치된다.

* `@latest` : 안정된 최신 버전의 패키지를 설치. x로도 표현할 수 있다.
   * ex) npm i express@latest 또는 npm i express@x

* `@next` : 가장 최근의 배포판을 사용. 안정되지 않은 알파나 베타 버전의 패키지를 설치할 수 있다는 점에 유의

---

## 기타 npm 명령어

`npm outdated` : 업데이트할 수 있는 패키지가 있는지 확인

* Current, Wanted가 다르다면 업데이트가 필요한 경우이다.

`npm update [패키지명]` : 패키지 업데이트 가능. 업데이트 가능한 모든 패키지가 Wanted에 적힌 버전으로 update된다. 

* npm update를 하면 업데이트 가능한 모든 패키지가 Wanted에 적힌 버전으로 update된다.

`npm uninstall [패키지명]` : 해당 패키지를 제거하는 명령어. 패키지가 package.json과 node_modules 폴더에서 사라진다. `npm rm [패키지명]`으로 줄여 쓸 수도 있다.

`npm search [검색어]` : npm의 패키지를 검색할 수 있다.

`npm info [패키지명]` : 패키지의 세부 정보를 파악하고자 할 때 사용하는 명령어. package.json의 내용과 의존 관계, 설치 가능한 버전 정보 등이 표시된다.

`npm adduser` : npm 로그인을 위한 명령어. npm 공식 사이트에서 가입한 계정으로 로그인하면 된다. 
 * 나중에 패키지를 배포할 때 로그인이 필요하다.
 * 패키지를 배포하지 않을 것이라면 npm에 가입할 필요는 없다.

`npm whoami` : 로그인한 사용자가 누구인지 알려준다. 로그인된 상태가 아니라면 에러가 발생한다.

`npm logout` : npm adduser로 로그인한 계정을 로그아웃할 때 사용한다.

`npm version [버전]` : package.json 버전을 올린다. 원하는 버전의 숫자를 넣으면 된다.
* major, minor, patch라는 문자열을 넣어서 해당 부분의 숫자를 1 올릴 수도 있다.

`npm deprecate [패키지명] [버전] [메시지]` : 해당 패키지를 설치할 때 경고 메시지를 띄우게 하는 명령어. 자신의 패키지에만 이 명령어를 적용. deprecated 처리를 하면 다른 사용자들이 버그가 있는 버전의 패키지를 설치할 때 경고 메시지가 출력된다.

`npm ci` : package.json 대신 package-lock.json에 기반하여 패키지를 설치. 더 엄격하게 버전을 통제하여 패키지를 설치하고 싶을 때 사용.
 

 

