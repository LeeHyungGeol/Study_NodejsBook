const express = require('express');

const router = express.Router();

// GET /user 라우터
router.get('/', (req, res) => {
    res.send('Hello 유저');
});

module.exports = router;