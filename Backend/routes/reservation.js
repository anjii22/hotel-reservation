const express = require("express");
const {
    getReservations,
    getReservation,
    deleteReservation,
    updateReservation,
    createReservation

} = require('../controllers/reservationController');

//create instance of router
const router = express.Router();

//attach handler 
//GET all 
router.get('/', getReservations);

//GET single 
router.get('/:id', getReservation);

//POST 
router.post('/', createReservation);

//DELETE 
router.delete('/:id', deleteReservation);


//UPDATE 
router.patch('/:id', updateReservation);


//at end Export
module.exports = router