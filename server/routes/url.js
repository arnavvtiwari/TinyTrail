const express = require('express');
const { createShortUrl } = require('../controllers/url');
const cors = require('cors')
const router = express.Router();

router.use(cors())
router.post('/', createShortUrl);

module.exports = router;
