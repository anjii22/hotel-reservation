//testing
import {Link} from 'react-router-dom'

const Navbar = () => {
    return(
        <header>
            <div className="container">
                <Link to = "/">
                    <h1>Workout body</h1>
                </Link>

                <Link to="../reservation">
                    <button className='clickbutton'>Reservation</button>
                </Link>
            </div>
        </header>
    )
}

export default Navbar