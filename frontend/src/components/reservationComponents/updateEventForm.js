import React, { useState } from "react";
import { useReservationContext } from "../../hooks/useReservationContext";

const UpdateEventForm = ({ reservation, onCancel }) => {
    const { dispatch } = useReservationContext();

    const [fname, setFname] = useState(reservation.fname)
    const [lname, setLname] = useState(reservation.lname)
    const [date, setDate] = useState(reservation.date)
    const [r_h_type, setr_h_type] = useState(reservation.r_h_type)        
    const [r_h_number, setr_h_number] = useState(reservation.r_h_number)
    const [e_function, setFunction] = useState(reservation.e_function)

    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedReservation = { fname, lname, date, r_h_type, r_h_number, e_function };

    const response = await fetch(`http://localhost:8020/api/reservation/${reservation._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(updatedReservation),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )

    const json = await response.json();
    console.log(json)

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      dispatch({ type: "UPDATE_RESERVATION", payload: json  });
      onCancel(); // Close the update form after successful update
    }
  };

  return (
    <form className="update" onSubmit={handleSubmit}>
      <h3>Update Reservation</h3>

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


      <button>Update</button>{"\t"}
      <button className="buttonCancel" onClick={onCancel}>
        Cancel
      </button>


      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default UpdateEventForm;