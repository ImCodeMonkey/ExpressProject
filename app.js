var express = require('express');
var path = require('path');
var logger = require('morgan');
var hbs = require('hbs');


var index = require('./routes/inde/index');
var users = require('./routes/user/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', hbs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

//hbs配置文件
var blocks = {};

hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler    错误处理中间件
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
