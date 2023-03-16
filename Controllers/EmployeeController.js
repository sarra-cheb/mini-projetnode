const Employee = require('../Models/Employee');

exports.addEmployee = async (req, res) => {
  try {
    const found = await Employee.findOne({ email: req.body.email })
    if (found) {
      res.status(400).send({ message: 'email already exist' })
    }
    else {
      await Employee.create(req.body)
      res.send({ message: 'employee added succefully' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'error server' })
  }
}
exports.getEmployee = async (req, res) => {
  try {
    const employees = await Employee.find()
    res.send({ message: 'liste des employess', employees })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.editEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndUpdate(req.params.id, req.body)
    res.send({ message: 'updated' })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id)
    res.send({ message: 'deleted' })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}