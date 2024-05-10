const Reservation = require('../models/reservationModel')
const mongoose = require('mongoose')


//GET all 
const getReservations = (async(req, res) =>{
    const reservations = await Reservation.find({}).sort({createdAt: -1})

    res.status(200).json(reservations)
})

//GET single 
const getReservation = (async(req, res) =>{
    const {id} = req.params
    
    if(mongoose.Types.ObjectId.isValid(id))
    {
        const reservation = await Reservation.findById(id).sort({createdAt: -1})

        if(!reservation)
        {
            return res.status(404).json({error: "Not found!"})              //status(400) = not found error code
        }

        res.status(200).json(reservation)
    }
    else
    {
        return res.status(404).json({error: "Invalid ID!"})
    }
    
})

//CREATE
const createReservation =   (async(req, res)=> { 
    const{type, uid, fname, lname, res_stay, date, l_date, r_h_type, r_h_number, e_function} = req.body

    let emptyFields = []


    //checking for empty fields
    if(!type){
        emptyFields.push('type')
    }
    if(!uid){
        emptyFields.push('uid')
    }
    if(!fname){
         emptyFields.push('fname')
    }
    if(!lname){
         emptyFields.push('lname')
    }
    if(!res_stay){
        emptyFields.push('res_stay')
    }
    if(!date){
         emptyFields.push('date')
    }
    if (res_stay === 'multipleDays' && !l_date) {
        emptyFields.push('l_date');
    }
    if(!r_h_type){
        emptyFields.push('r_h_type')
    }
    if(r_h_number.length === 0){
        emptyFields.push('r_h_number')
    }
    if(!e_function){
        emptyFields.push('e_function')
    }
    if(emptyFields.length > 0){
        return res.status(404).json({error: "Fill all the Fields", emptyFields})
    }

    try{
        

        const reservationsData = await Reservation.find({}).sort({createdAt: -1})
        console.log(reservationsData)
        //validations

        if (res_stay !== 'multipleDays') 
        {
            console.log('validation called')

            reservationsData.map(reservation => {
                if(reservation.res_stay !== 'multipleDays' && reservation.r_h_number === r_h_number && reservation.date === date){
					console.log('validation false')
                    return res.status(400).json({ error: 'This room is already reserved for the selected date(s)' });
				}
                else if(reservation.res_stay === 'multipleDays' && reservation.r_h_number === r_h_number && date >= reservation.date && date <= reservation.l_date){
					console.log('validation false')
                    return res.status(400).json({ error: 'This room is already reserved for the selected date(s)' });
				}
                console.log('validation conditions skipped')
            })
        } 
        else 
        {
            reservationsData.map(reservation => {
                if(reservation.res_stay !== 'multipleDays' && reservation.r_h_number === r_h_number && reservation.date >= date && reservation.date <= l_date){
					console.log('validation false')
                    return res.status(400).json({ error: 'This room is already reserved for the selected date(s)' });
				}
				else if(reservation.res_stay === 'multipleDays' && reservation.r_h_number === r_h_number && date >= reservation.date && date <= reservation.l_date){
					console.log('validation false')
                    return res.status(400).json({ error: 'This room is already reserved for the selected date(s)' });
				}
				else if(reservation.res_stay === 'multipleDays' && reservation.r_h_number === r_h_number && l_date >= reservation.date && l_date <= reservation.l_date){
					console.log('validation false')
                    return res.status(400).json({ error: 'This room is already reserved for the selected date(s)' });
				}
            })
        }

        // if (!existingReservation) {
        //     return res.status(400).json({ error: 'This room is already reserved for the selected date(s)' });
        // }


        const reservation = await Reservation.create({type, uid, fname, lname, res_stay, date, l_date, r_h_type, r_h_number, e_function})
        res.status(200).json(reservation)                                               //status(200) = to state rrecieved
    }
    catch(error){
        res.status(400).json({error: error.message})                                   //status(400) = error code
    }
})

//DELETE 
const deleteReservation = (async(req, res) =>{
    const {id} = req.params

    if(mongoose.Types.ObjectId.isValid(id))
    {
        const reservation = await Reservation.findOneAndDelete({_id: id})

        if(!reservation)
        {
            return res.status(404).json({error: "Not found!"})              //status(400) = not found error code
        }

        res.status(200).json(reservation)
    }
    else
    {
        return res.status(404).json({error: "Invalid ID!"})
    }
})

//UPDATE 
const updateReservation = (async(req, res) =>{
    const {id} = req.params

    if(mongoose.Types.ObjectId.isValid(id))
    {
        const reservation = await Reservation.findOneAndUpdate({_id: id},{...req.body}, {returnOriginal: false})
        
        if(!reservation)
        {
            return res.status(404).json({error: "Not found!"})              //status(400) = not found error code
        }

        res.status(200).json(reservation)
    }
    else
    {
        return res.status(404).json({error: "Invalid ID!"})
    }
})


//export
module.exports = {
    getReservations,
    getReservation,
    deleteReservation,
    updateReservation,
    createReservation
}