import { useEffect  } from 'react';
import { useReservationContext } from "../../hooks/useReservationContext"

import RoomReservationDetails from '../../components/reservationComponents/roomResDetails'


const ReservedRooms = () => {
    const {reservation, dispatch} = useReservationContext()
   

    //backendport
    useEffect(() => {
        const fetchReservations = async () =>{
            const response = await fetch('http://localhost:8020/api/reservation/')
            const json = await response.json();

            if (response.ok){
                dispatch({type: 'SET_RESERVATION', payload: json})
            }
            if(!response.ok){
                console.log('Error fetching')
            }
        }

        fetchReservations()
        

    }, [dispatch])

    

    return( 
        <div>
            <h2>Reserved Rooms</h2>
        
            <div>
                {reservation && reservation.map((reservation) => (
                    <RoomReservationDetails key={reservation._id} reservation= {reservation}/>                           //title is in the model schema
                ))}
            </div>
            
            
        </div>
    )
}
 export default ReservedRooms