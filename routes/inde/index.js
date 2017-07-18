var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('inde/index', { title: 'hbs demo', author: 'text' });
});

module.exports = router;
