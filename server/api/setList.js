const Router = require('koa-router');
const { getResBody, getReqParams } = require('../tools');

const router = new Router();

router.all('/setList', async (ctx, next) => {
  console.log(ctx);
  const list = getReqParams(ctx, 'list');
  if (!list) {
    ctx.body = getResBody('没传list', 0, 400);
    return;
  }
  const connection = ctx.db;
  const userId = 'sy';
  try {
    const [rows] = await connection.query(
      `SELECT list_data FROM t_todo_list WHERE user_id='${userId}'`
    );
    if (rows.length > 0) {
      const [result] = await connection.query(
        'UPDATE t_todo_list SET ?? = ? WHERE user_id = ?',
        ['list_data', JSON.stringify(list), userId]
      );
    } else {
      const [result] = await connection.query(
        'INSERT INTO table_name (??) VALUES (?)',
        ['list_data', JSON.stringify(list)]
      );
    }
    ctx.body = getResBody('保存list成功');
  } catch (e) {
    ctx.body = getResBody('保存list失败', 0, 400);
  }
});

module.exports = router;
