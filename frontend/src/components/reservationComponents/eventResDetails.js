import React, { useState } from "react";
import { useReservationContext } from "../../hooks/useReservationContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import UpdateReservationForm from "./updateEventForm";

const EventReservationDetails = ({reservation})=>{
    const {dispatch} = useReservationContext()
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    //delete
    const handleDelete = async()=>{
        const response = await fetch('http://localhost:8020/api/reservation/'+ reservation._id, {
            method: 'DELETE'
        })

        const json = await response.json()              //deleted doc

        if(response.ok){
            dispatch({type:'DELETE_RESERVATION', payload: json})
        }
    }

    //update
    const handleUpdate = () => {
        setShowUpdateForm(true);
    }
    
    const handleCancelUpdate = () => {
        setShowUpdateForm(false);
    }

    if(reservation && reservation.type === 'Event'){
        return(
            <div className="reservation-details">
                <p><strong>Firts Name       : </strong>{reservation.fname}</p>
                <p><strong>Last Name        : </strong>{reservation.lname}</p>
                <p><strong>Reserved Date    : </strong>{reservation.date}</p>
                <p><strong>Room Type        : </strong>{reservation.r_h_type}</p>
                <p><strong>Room Number      : </strong>{reservation.r_h_number}</p>
                <p><strong>Event/Function   : </strong>{reservation.e_function}</p>
                <p>{formatDistanceToNow(new Date (reservation.createdAt), {addSuffix: true})}</p>
                
                <span onClick={handleDelete}>Delete</span>
                <button  onClick={handleUpdate}>Update</button>
                
                {showUpdateForm && (
                    <UpdateReservationForm reservation={reservation} onCancel={handleCancelUpdate} />
                )}
            </div>
        )
    }
    else {
       return null; // or any other fallback content
    }
}

export default EventReservationDetails;