const express = require('express')
const router = express.Router();

//callback function (req, res) =>{ .. } - se naziva ROUTE HANDLER
router.get('/', (req, res) => {
    res.send('<h1>Cao iz express-a</h1>')
});

module.exports = router;