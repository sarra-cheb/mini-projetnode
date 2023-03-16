const mongoose = require('mongoose');
const schema = mongoose.Schema;
const EmployeeSchema = new schema({
  Nom: {
    type: String,
    required: true
  },
  Prenom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  Categorie: {
    type: String,
    required: true
  },
  Spécialité: {
    type: String,
    required: true
  },
  NumCnss: {
    type: Number,
    required: true
  },
  Age: {
    type: Number,
    required: true
  },
  Disponibilité: {
    type: Boolean,
    required: true
  }
}
  , {
    timestamps: true,
    versionkey: false
  })
module.exports = mongoose.model('Employee', EmployeeSchema)