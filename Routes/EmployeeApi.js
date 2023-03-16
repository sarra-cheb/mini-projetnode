const express = require('express');
const passport = require('passport');
const { getEmployee, addEmployee, editEmployee, deleteEmployee } = require('../Controllers/EmployeeController');
const router = express.Router();

router.get('/employee', passport.authenticate('bearer', { session: false }), getEmployee)
router.post('/employee', passport.authenticate('bearer', { session: false }), addEmployee)
router.put('/employee/:id', passport.authenticate('bearer', { session: false }), editEmployee)
router.delete('/employee/:id', passport.authenticate('bearer', { session: false }), deleteEmployee)

module.exports = router