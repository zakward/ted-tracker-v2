import React, {useContext} from 'react';
import {useNavigate, Link} from "react-router-dom"
import { UserContext } from '../context/UserContext';

function Navbar() {
    const {logout, token, user} = useContext(UserContext)
    
    return ( 
        <nav>
        <h3>Welcome {user.username}</h3>    
        <h3>Ted-Tracker-V.2</h3>        
        <Link to ="/form"><button>Add a New Ted</button>   </Link>     
        <Link to ="/tedList"><button>Saved List</button></Link> 
       {token && <button id = "logout-btn"onClick = {logout}>Log Out</button>}

        </nav>
     );
}

export default Navbar