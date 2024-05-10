const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reservationSchema = new Schema({
    type: {
        type: String,
        required: true
    },

    uid: {
        type: String,
        required: true
    },

    fname: {
        type: String,
        required: true
    },

    lname: {
        type: String,
        required: true
    },

    res_stay: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    l_date: {
        type: Date,
        required: false
    },

    r_h_type: {
        type: String,
    },

    r_h_number: {
        type: Number,
    },

    e_p_id: {
        type: String,
    },
    
},  {timestamps: true})

module.exports = mongoose.model('Reservation', reservationSchema)