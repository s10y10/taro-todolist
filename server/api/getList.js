const Router = require('koa-router');
const { getResBody, getReqParams } = require('../tools');

const router = new Router();

router.all('/getList', async (ctx, next) => {
  const userId = getReqParams(ctx, 'id');
  if (!userId) {
    ctx.body = getResBody('没传id', 0, 400);
    return;
  }
  const connection = ctx.db;
  const [rows] = await connection.query(
    `SELECT list_data FROM t_todo_list WHERE user_id='${userId}'`
  );
  ctx.body = getResBody(JSON.parse(rows[0].list_data));
});

module.exports = router;
