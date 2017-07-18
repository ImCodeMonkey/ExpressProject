var express = require('express'),
	router = express.Router();
	
//该路由使用中间件
router.use(function timeLog(req, res, next){
	console.log('Time:', Date.now());
	next();
})

//定义网站主页的路由
router.get('/', function(req, res){
	res.send('Birds home page');
})

//定义about页面的路由
router.get('/about', function(req, res){
	res.send('About birds');
})

//next('route') 将控制权交给下一个路由
router.get('/user/:id', function(req, res, next){
	if(req.params.id == 0) next('route');
	else next();
}, function(req, res, next){
	res.send('regular');
});

router.get('/user/:id', function(req, res, next){
	res.send('special');
})

module.exports = router;