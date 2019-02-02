const link = require('../models/link');
const urlValidator = require('valid-url');
const router = require('express').Router();

router.post('/', async (req, res, next) => {
  if (!req.body.url) {
    res.status(400).json({ error: `missing para url` });
    return;
  }
  let url = urlValidator.isUri(req.body.url)
  if (!url) {
    res.status(400).json({ error: `invalid url ${req.body.url}` });
    return;
  }

  try {
    let existing = await link.findOneLink({ url: url });
    if (existing) {
      res.status(200).json({ url: existing.url, short: existing.short });
    } else {
      let newLink = await link.saveNewLink(url);
      res.status(200).json({ url: newLink.url, short: newLink.short });
    }
  } catch (err) {
    next(err)
  }
});

router.get('/:short', async (req, res, next) => {
  let short = req.params.short;
  try {
    let existing = await link.findOneLink({ short: short });
    if (existing) {
      res.status(200).json({ url: existing.url, short: existing.short });
    } else {
      res.status(200).json({ error: `not found ${short}` });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;