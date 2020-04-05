var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var userRouter = require('./routes/user')
var dishesRouter = require('./routes/dishes')
var recycleRouter = require('./routes/recycle')
var commodityRouter = require('./routes/commodity')
var specialRouter = require('./routes/special')
var indexRouter = require('./routes/index')

// 引入express-ws包
var expressWs = require('express-ws');
// 创建express初始化对象app
var app = express();
// 将app绑定expressWs方法
expressWs(app)
// 引用编写连接方法的路由路径
var submitMenuRouter = require('./routes/submitMenu')


app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 将路由绑定到express对象上
app.use('/submitMenu', submitMenuRouter)


app.use('/', indexRouter);
app.use('/user', userRouter)
app.use('/dishes', dishesRouter)
app.use('/recycle', recycleRouter)
app.use('/commodity', commodityRouter)
app.use('/special', specialRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
