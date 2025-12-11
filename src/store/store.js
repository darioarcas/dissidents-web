import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { uiReducer } from "../reducers/uiRedurcer";
// import { calendarReducer } from "../reducers/calendarReducer";
import { authReducer } from "../reducers/authReducer";
// import { alumnosReducer } from "../reducers/alumnosReducer";




export const store = configureStore({
        reducer:{
            ui: uiReducer,
            // calendar: calendarReducer,
            auth: authReducer,
            // student: alumnosReducer,
        }
    },
    applyMiddleware(thunk)
);