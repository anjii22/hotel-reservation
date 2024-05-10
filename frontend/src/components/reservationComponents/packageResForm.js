import { useState } from "react"
import { useReservationContext } from "../../hooks/useReservationContext"


const EventReservationForm = ({packages, onCancel}) =>{
    
    //const id = 

    const {dispatch} = useReservationContext() 

    const [type, setType] = useState('Package')
    const [uid, setUID] = useState('reception')         //set user id
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [res_stay, setRes_stay] = useState('singleDay')
    const [date, setDate] = useState('')
    const [l_date, setL_date] = useState('')
    const [r_h_type, setr_h_type] = useState('')    
    const [r_h_number, setr_h_number] = useState([])
    const [e_p_id, setID] = useState('')

    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])


    const handleSubmit = async(e) =>{
        e.preventDefault()

        const reservation = {type, uid, fname, lname, res_stay, date, l_date, r_h_type, r_h_number, e_p_id}

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
            setType('Package')
            setUID('reception')         // user id
            setFname('')
            setLname('')
            setRes_stay('singleDay')
            setDate('')
            setL_date('')
            setr_h_type('')
            setr_h_number([])           //[] array
            setEmptyFields([])
            setID('')

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

           

            <button>Reserve</button>
            <button onClick={onCancel}>Cancel</button>
            
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default EventReservationForm