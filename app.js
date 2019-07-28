const Koa = require('koa')
const app = new Koa()
const config = require('./config')

console.log('env>>>',app.env);

// 1设置cookie密钥
app.keys = ['im a newer secret', 'i like turtle'];

//  2可以通过编辑 app.context 为 ctx 添加其他属性
app.context.db = function(){
    console.log('模拟链接数据库db');
}

// 3 洋葱模型的中间件
// logger
app.use(async (ctx, next) => {

    ctx.db()
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(async ctx => {
    ctx.state.user ='212112'; // 命名空间

    console.log(ctx.request);
    console.log(ctx.response);

    ctx.cookies.set('name', 'tobi', { signed: true });
    ctx.body = 'Hello World';
    // ctx.throw(200);
});

// 错误处理
app.on('error',(err,ctx)=>{
    log.error('server error',err,ctx)
})

app.listen(config.web_port,config.web_host,()=>{
    console.log(`启动了: http://${config.web_host}:${config.web_port}`);
})
// app.listen(3000,()=>{
//     console.log(3000);
// });