/*

    {
        notes: [],
        active: null, // cuando no hay ningun alumno
        active: {
            id: 'AS3554F545GDF4',
            nombre: '',
            pais: '',
            celular: '',
            ficha: '',
            plan: '',
            costo: '',
            fecha-inicio: 5456456,
            fecha-final: 456456456
        }
    }

*/

import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null
}



export const alumnosReducer = (state = initialState, action)=>{
    
    switch (action.type) {
        // Alumno Activo
        case types.alumnoActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }

        
            
        
        // Se cargan los alumnos desde el action al store
        case types.alumnoLoad:
            return {
                ...state,
                notes: [...action.payload]
            }








        // Se modifica un alumno
        case types.alumnoUpdate:
            return{
                ...state,
                notes: state.notes.map(
                    (alumno) => (alumno.id === action.payload.id)
                        ? action.payload.alumno
                        : alumno
                    )
            }
                
                
                
    
                    

        // Se borran los datos del store cuando se cierra sesion
        case types.alumnoLogoutCleaning:
            return{
                ...state,
                active: null,
                notes: []
            }

        default:
            return state;
    }
}