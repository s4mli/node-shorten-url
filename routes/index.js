const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Shorten URL' });
});

module.exports = router;
