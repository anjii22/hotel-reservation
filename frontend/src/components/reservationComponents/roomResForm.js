import { useState } from "react"
import { useReservationContext } from "../../hooks/useReservationContext"


const RoomReservationForm = () =>{

    const {dispatch} = useReservationContext() 

    const [type, setType] = useState('Room')
    const [uid, setUID] = useState('reception')         //set user id 
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [res_stay, setRes_stay] = useState('')
    const [date, setDate] = useState('')
    const [l_date, setL_date] = useState('')
    const [r_h_type, setr_h_type] = useState('')        //[]array
    const [r_h_number, setr_h_number] = useState('')
    const [e_function, setFunction] = useState('null')

    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([]);

    


    const handleSubmit = async(e) =>{
        e.preventDefault()

        const reservation = {type, uid, fname, lname, res_stay, date, l_date, r_h_type, r_h_number, e_function}

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
            setType('Room')
            setUID('reception')         // user id
            setFname('')
            setLname('')
            setRes_stay('')
            setDate('')
            setL_date('')
            setr_h_type('')
            setr_h_number('')           //[] array
            setEmptyFields([])
            setFunction('null')

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
                //className={emptyFields.includes('fname') ? 'error' : ''}            //(true : false)
            />
            
            <label>Last Name</label>
            <input
                type="text"
                onChange={(e) => setLname(e.target.value)}
                value={lname}
                //className={emptyFields.includes('lname') ? 'error' : ''}
            />

            <div>
                <label>
                    <input
                        type="radio"
                        value="singleDay"
                        checked={res_stay === "singleDay"}
                        onChange={(e) => setRes_stay(e.target.value)}
                    />
                    Reserve for one day
                </label>
                <label>
                    <input
                        type="radio"
                        value="multipleDays"
                        checked={res_stay === "multipleDays"}
                        onChange={(e) => setRes_stay(e.target.value)}
                    />
                    Reserve for more than one day
                </label>
            </div>

            <label>Date</label>
            <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
                //className={emptyFields.includes('date') ? 'error' : ''} 
            />

            {res_stay === "multipleDays" && (
                <label>
                    End Date:
                    <input
                        type="date"
                        value={l_date}
                        onChange={(e) => setL_date(e.target.value)}
                        //className={emptyFields.includes('l_date') ? 'error' : ''}
                    />
                </label>
            )}
                        
            <label>Room Type</label>
            <input
                type="text"
                onChange={(e) => setr_h_type(e.target.value)}
                value={r_h_type}
                //className={emptyFields.includes('r_h_type') ? 'error' : ''} 
            />

            <label>Room</label>
            <input
                type="number"
                onChange={(e) => setr_h_number(e.target.value)} //.split(',')
                value={r_h_number}
                // className={emptyFields.includes('r_h_number') ? 'error' : ''} 
            />

            <button>SUBMIT</button>
            
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default RoomReservationForm