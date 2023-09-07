const Koa = require('koa');
const Router = require('koa-router');
const reuqireDirectory = require('require-directory');
const bodyParser = require('koa-bodyparser');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'zxcvbnm',
  database: 'd_app',
});

const app = new Koa();
app.use(bodyParser());
// 存储db连接对象
app.use(async (ctx, next) => {
  try {
    ctx.db = await pool.getConnection();
    await next();
    ctx.db.release();
  } catch (err) {
    ctx.throw(500, err);
  }
});

// 批量require路由
const apiDirectory = `${process.cwd()}/api`;
reuqireDirectory(module, apiDirectory, {
  visit: (obj) => {
    if (obj instanceof Router) {
      app.use(obj.routes());
    }
  },
});

app.listen(3002);
