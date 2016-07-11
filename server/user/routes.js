var controller = require('./controller')
var express = require('express')
var router = express.Router()

router.post('/', controller.create)

module.exports = router
