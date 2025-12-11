//src/reducers/authReducer.js

import { types } from "../types/types";



export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
        email: action.payload.email,
        photoURL: action.payload.photoURL,
        cursosComprados: action.payload.cursosComprados,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case types.logout:
      return {};

    case types.userLoadData:
      return {
        ...state,
        cursosComprados: action.payload, // <- carga inicial
      };

    case types.userCoursesUpdated:
      return {
        ...state,
        cursosComprados: action.payload, // <- actualizaciones en tiempo real
      };

    default:
      return state;
  }
};