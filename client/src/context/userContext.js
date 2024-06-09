import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

//to verify logged in user throughout the application. destructure children defined in index.js
//wraps around <Layout/> 
const UserProvider = ({children}) => {
    //once user logs in info like token, id is gotten from response and stored in local storage 
    //so want to call from local storage
    //want to check initially if user has anything in local storage
    //everything in local storage is string use json.stringfy

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')))

    //whenever the current user changes 
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser))
    }, [currentUser])

    return <UserContext.Provider value={{currentUser, setCurrentUser}}>{children}</UserContext.Provider>
}

export default UserProvider;