import {createContext, useReducer} from 'react'

export const ReservationContext = createContext()

export const reservationReducer = (state, action) => {
    switch(action.type){
        case 'SET_RESERVATION' :   
        return{
            reservation: action.payload
        }
        case 'CREATE_RESERVATION' :  
        return{
            reservation: [action.payload, ...state.reservation]
        }
        case 'DELETE_RESERVATION' :   
        return{
            reservation: state.reservation.filter((r)=> r._id !== action.payload._id)          // dont delete id not the given id
        }
        case 'UPDATE_RESERVATION' :
        return{
            reservation: state.reservation.map((r)=> r._id === action.payload._id? action.payload: r)
        }
        default:
            return state
    }
}

export const ReservationContextProvider = ({children}) => {        


    const [state, dispatch] = useReducer(reservationReducer, { 
        reservation: []                                         //not null
    })                     

    return(
        <ReservationContext.Provider value={{...state, dispatch}}>
            {children}                                          
        </ReservationContext.Provider>
    )
}

