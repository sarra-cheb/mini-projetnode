const Employee = require('../Models/Employee');
const Mission = require('../Models/Mission');
const nodemailer = require('nodemailer')

exports.addMission = async (req, res) => {
  try {
    await Mission.create(req.body)
    res.send({ message: 'mission added' })

  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'error server' })
  }
}
exports.getbyidMission = async (req, res) => {
  try {
    const missions = await Mission.findById(req.params.idmission).populate("Equipe")
    res.send({ message: 'liste des missions', missions })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.getMission = async (req, res) => {
  try {
    const missions = await Mission.find()
    res.send({ message: 'liste des missions', missions })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.editMission = async (req, res) => {
  try {
    await Mission.findByIdAndUpdate(req.params.id, req.body)
    res.send({ message: 'updated' })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.deleteMission = async (req, res) => {
  try {
    await Mission.findByIdAndDelete(req.params.id)
    res.send({ message: 'deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'error server' })
  }
}
exports.affecte = async (req, res) => {
  try {
    const found = await Employee.findById(req.params.employeeid)

    if (found.Disponibilité) {

      const found2 = await Mission.findById(req.params.missionid)
      const longeur = found2.Equipe.length
      if (longeur < 5) {
        await Mission.findByIdAndUpdate(req.params.missionid, { $push: { Equipe: req.params.employeeid } })
        await Employee.findByIdAndUpdate(req.params.employeeid, { Disponibilité: false }, { new: true })

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: "sarrach9080@gmail.com",
            pass: "lmaosoxbepcwuzyw",
          }
        });
        await transporter.sendMail({
          from: "sarrach9080@gmail.com",
          to: found.email,
          subject: 'Sending Email using Node.js',
          text: `you have benn affected to new mission ${found2.Tache}`,
        })


        res.send({ message: 'employee affecte' })

      }
      else {
        res.send({ message: "l'equipe ne dois pas despasser 5 employeés" })
      }
    }
    else {
      res.send({ message: "l employee n'est pas disponible pour cet mission " })
    }

  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}

exports.desaffecte = async (req, res) => {
  try {
    const found = await Employee.findById(req.params.employeeid)
    const found2 = await Mission.findById(req.params.missionid)

    await Mission.findByIdAndUpdate(req.params.missionid, { $pull: { Equipe: req.params.employeeid } })
    await Employee.findByIdAndUpdate(req.params.employeeid, { Disponibilité: true }, { new: true })

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "sarrach9080@gmail.com",
        pass: "lmaosoxbepcwuzyw",
      }
    });
    await transporter.sendMail({
      from: "sarrach9080@gmail.com",
      to: found.email,
      subject: 'mission mailing service RH',
      text: `you have benn dessaffected to new mission ${found2.Tache}`,
    })


    res.send({ message: 'employee essaffected' })



  } catch (error) {

  }
}