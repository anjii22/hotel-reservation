import React, { useState } from "react";
import { useReservationContext } from "../../hooks/useReservationContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import UpdateReservationForm from "./updatePackageForm";

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

    if(reservation && reservation.type === 'Package'){
        return(
            <div className="reservation-details">
                
                {/* Details */}
                
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