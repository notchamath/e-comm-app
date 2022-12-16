// import { createContext, useEffect, useReducer } from "react";

// import { createUserDocFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
// import {createAction} from '../utils/reducer/reducer.utils';


// export const UserContext = createContext({
//     currentUser: null,
//     setCurrentUser: () => null
// });



// export const UserProvider = ({children}) => {
//     const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
//     const {currentUser} = state;

   
//     const value = {currentUser, setCurrentUser};

//     return <UserContext.Provider value={value}>{children}</UserContext.Provider>
// }