import packageResForm from "./packageResForm"

const PackageReservationDetails = ({packages})=>{
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
                    <packageResForm packages={packages} onCancel={handleCancelReserve} />
                )}
            </div>
        )
    
}

export default PackageReservationDetails;