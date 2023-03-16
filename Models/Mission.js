const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Missionschema = new schema({
  Tache: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Datedébut: {
    type: String,
    required: true
  },
  DateFin: {
    type: String,
    required: true
  }
  , Equipe: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  }]
}, {
  timestamps: true,
  versionkey: false
})
module.exports = mongoose.model('Mission', Missionschema)