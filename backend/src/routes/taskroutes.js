const express = require("express");
const router = express.Router();


//controllers
const taskController = require("../controller/taskController");

//middlwares
const TaskValidation = require("../middlwares/TaskValidation");   

router.post('/', TaskValidation, taskController.create);
router.put('/:id', TaskValidation, taskController.update);
router.get('/filter/all/:macaddress', taskController.all);
router.get('/:id', taskController.show);
router.delete('/:id', taskController.delete);
router.put('/:id/:done', taskController.done);
router.get('/filter/late/:macaddress', taskController.late)
router.get('/filter/today/:macaddress', taskController.today)
router.get('/filter/week/:macaddress', taskController.week)
router.get('/filter/month/:macaddress', taskController.month)
router.get('/filter/year/:macaddress', taskController.year)


module.exports = router;