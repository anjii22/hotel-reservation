import { useEffect  } from 'react';
import { useReservationContext } from "../../hooks/useReservationContext"

import EventReservationDetails from '../../components/reservationComponents/eventResDetails'


const ReservedEvents = () => {
    const {reservation, dispatch} = useReservationContext()
   

    
    
    //backendport
    useEffect(() => {
        const fetchReservations = async () =>{
            const response = await fetch('http://localhost:8020/api/reservation/')
            const json = await response.json();

            if (response.ok){
                dispatch({type: 'SET_RESERVATION', payload: json})

                console.log('hiii')
            }
            if(!response.ok){
                console.log('Error fetching')
            }
        }

        fetchReservations()
        

    }, [dispatch])

    

    return( 
        <div>
            <h2>Reserved Events</h2>
            
            {/* <div >
                {MyObject !== null ? <div>{MyObject.map((MyObjects) => (
                    <RoomReservationDetails key={MyObjects._id} reservation= {MyObjects}/>                           //title is in the model schema
                ))}</div>:null }
            </div> */}
            

            <div>
                {reservation && reservation.map((reservation) => (
                    <EventReservationDetails key={reservation._id} reservation= {reservation}/>                           //title is in the model schema
                ))}
            </div>
            
            
        </div>
    )
}
 export default ReservedEvents