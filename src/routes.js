const router = require('express').Router()
const dbController = require('./controller/dbController')
const dbcontroller = new dbController()

router.get('/', dbcontroller.index)

// router.get('/:id', dbController.show)

// router.post('/', dbController.create)

// router.put('/:id', dbController.update)

// router.delete('/:id', dbController.delete)
module.exports = router