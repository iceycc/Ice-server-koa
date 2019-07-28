## curl客户端
指定请求头
> curl -H 'content-type:application/json;charset=utf-8' http://localhost:8080/users

指定方法名
> curl -X POST http://localhost:8080/users

指定请求体
> curl --data "name=zfpx&age=8" http://localhost:8080/users