const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`마스터 프로세스 아이디 : ${process.pid}`);
    //CPU 개수만큼 워커 프로세스를 생산
    //워커 프로세스를 생산 - cluster.fork()
    for (let i = 0; i < numCPUs; ++i) cluster.fork();

    //워커가 종료되었을 때
    cluster.on('exit', (worker, code, signal) => {
        console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
        //코드(code)는 process.exit()의 인수로 넣어준 코드가 출력된다.
        //신호(signal)은 존재하는 경우 process를 종료한 신호의 이름이 출력된다.
        console.log('code', code, 'signal', signal);
        //cluster.fork();
    });
}
else {
    //워커들이 Port에서 대기
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>Hello Node!</h1>');
        res.end('<p>Hello Server</p>');
        //Worker가 존재하는지 확인하기 위해 1초마다 강제 종료
        setTimeout(() => {
            //위의 code에 process.exit()의 인수가 출력된다. 
            process.exit(1);
        }, 1000);
    })
    .listen(8086);

    console.log(`${process.pid}번 워커 실행`);
}