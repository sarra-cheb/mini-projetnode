const express = require('express');
const passport = require('passport');
const { getMission, addMission, editMission, deleteMission, affecte, desaffecte, getbyidMission } = require('../Controllers/MissionController');
const router = express.Router();

router.get('/mission', passport.authenticate('bearer', { session: false }), getMission)
router.get('/mission/:idmission', passport.authenticate('bearer', { session: false }), getbyidMission)

router.post('/mission', passport.authenticate('bearer', { session: false }), addMission)
router.put('/mission/:id', passport.authenticate('bearer', { session: false }), editMission)
router.delete('/mission/:id', passport.authenticate('bearer', { session: false }), deleteMission)
router.put('/mission/:missionid/:employeeid', passport.authenticate('bearer', { session: false }), affecte)
router.put('/mission/dessaffecte/:missionid/:employeeid', passport.authenticate('bearer', { session: false }), desaffecte)

module.exports = router