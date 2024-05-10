import eventResForm from './eventResForm'

const EventReservationDetails = ({event})=>{
    const [showResForm, setShowResForm] = useState(false);



    const handleReserve = () => {
        setShowResForm(true);
    }
    
    const handleCancelReserve = () => {
        setShowResForm(false);
    }

    
        return(
            <div className="">
                {/* display details */}
                
                
                <button  onClick={handleReserve}>Reserve</button>
                
                {showResForm && (
                    <eventResForm event={event} onCancel={handleCancelReserve} />
                )}
            </div>
        )
    
}

export default EventReservationDetails;