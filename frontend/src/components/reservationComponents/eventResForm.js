import { useState } from "react"
import { useReservationContext } from "../../hooks/useReservationContext"


const EventReservationForm = () =>{
    
    //const id = 

    const {dispatch} = useReservationContext() 

    const [type, setType] = useState('Event')
    const [uid, setUID] = useState('reception')         //set user id
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [date, setDate] = useState('')
    const [r_h_type, setr_h_type] = useState('')    
    const [r_h_number, setr_h_number] = useState([])
    const [e_function, setFunction] = useState('')

    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])


    const handleSubmit = async(e) =>{
        e.preventDefault()

        const reservation = {type, uid, fname, lname, date, r_h_type, r_h_number, e_function}

        const response = await fetch('http://localhost:8020/api/reservation', {
            method: 'POST',
            body: JSON.stringify(reservation),
            headers: {
                'Content-Type' : 'application/json'
            }

        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            //resetting
            setType('Event')
            setUID('reception')         // user id
            setFname('')
            setLname('')
            setDate('')
            setr_h_type('')
            setr_h_number([])           //[] array
            setEmptyFields([])
            setFunction('')

            console.log('Added', json)

            dispatch({type: 'CREATE_RESERVATION', payload: json})
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add New</h3>

            <label>First Name</label>
            <input
                type="text"
                onChange={(e) => setFname(e.target.value)}
                value={fname}
                className={emptyFields.includes('fname') ? 'error' : ''}            //(true : false)
            />
            
            <label>Last Name</label>
            <input
                type="text"
                onChange={(e) => setLname(e.target.value)}
                value={lname}
                className={emptyFields.includes('lname') ? 'error' : ''}
            />

            <label>Date</label>
            <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
                className={emptyFields.includes('date') ? 'error' : ''} 
            />
            
            <label>Hall Type</label>
            <input
                type="text"
                onChange={(e) => setr_h_type(e.target.value)}
                value={r_h_type}
                className={emptyFields.includes('r_h_type') ? 'error' : ''} 
            />

            <label>Hall</label>
            <input
                type="number"
                onChange={(e) => setr_h_number(e.target.value.split(','))} //.split(',')
                value={r_h_number}
                className={emptyFields.includes('r_h_number') ? 'error' : ''} 
            />

            <label>Event/Function</label>
            <input
                type="text"
                onChange={(e) => setFunction(e.target.value)}
                value={e_function}
                className={emptyFields.includes('e_function') ? 'error' : ''} 
            />

            <button>SUBMIT</button>
            
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default EventReservationForm