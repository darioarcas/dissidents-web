import moment from "moment";
import { types } from "../types/types";

const initialState = {
    events:[
        {
          id: "0",
          title: "Desayuno",
          start: moment().toDate(),
          end: moment().add(2, "hours").toDate(),
          bgColor: "#fafafa",
          user:{
            _id:123,
            name: "Dario"
          }
        },
        // {
        //   id: "0",
        //   title: "Almuerzo",
        //   start: moment().add(4, "hours").toDate(),
        //   end: moment().add(5, "hours").toDate(),
        //   bgColor: "#fafafa",
        //   user:{
        //     _id:123,
        //     name: "Dario"
        //   }
        // },
    ],
    activeEvent:null
}


export const calendarReducer = (state = initialState, action)=>{
    switch (action.type) {
        case types.eventSetActive:
            
            return{
                ...state,
                activeEvent: action.payload

            };
        
        
        case types.eventAddNew:
            
            return{
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]

            };
    
        default:
            return state;
    }
}