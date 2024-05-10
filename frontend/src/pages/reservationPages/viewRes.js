import {Link} from 'react-router-dom'

const ViewReservation = () => {
    return( 
        <div>
            <h2>View reservation</h2>

            <Link to='./reservedRooms'>
                <button className='clickbutton'>Room Reservations</button>
            </Link><br/><br/>
            <Link to="./reservedEvents">
                <button className='clickbutton'>Event Reservations</button>
            </Link><br/><br/>
            <Link to="./reservedPackages">
                <button className='clickbutton'>Package Reservations</button>
            </Link><br/><br/>
            
        </div>
    )
}
 export default ViewReservation