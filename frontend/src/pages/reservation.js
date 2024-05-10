import {Link} from 'react-router-dom'

const Reservation = () =>{
    return (
        <div> 
            <h2>Reservation</h2>
            <Link to="/reservationPages/roomRes">
                <button className='clickbutton'>Room Res</button>
            </Link><br/><br/>
            <Link to="/reservationPages/eventres">
                <button className='clickbutton'>Event Res</button>
            </Link><br/><br/>
            <Link to="/reservationPages/packageRes">
                <button className='clickbutton'>Package Res</button>
            </Link><br/><br/>
            <Link to="/reservationPages/viewRes">
                <button className='clickbutton'>View Res</button>
            </Link><br/><br/>
        </div>
    )
}

export default Reservation