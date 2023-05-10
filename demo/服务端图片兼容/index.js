const Koa = require("koa");
const router = require("./router");
const app = new Koa();

app.use(router.routes());

app.use(async (ctx) => {
  ctx.body = "Hello World";
});

app.listen(10086);

console.log("service start at: http://localhost:10086");
