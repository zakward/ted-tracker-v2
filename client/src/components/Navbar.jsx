import React, {useContext} from 'react';
import {useNavigate, Link} from "react-router-dom"
import { UserContext } from '../context/UserContext';

function Navbar() {
    const {logout, token, user} = useContext(UserContext)
    
    return ( 
        <nav>
        <h3 className = "nav-item">Welcome {user.username}</h3>           
        <Link to ="/form" className = "nav-item"><button>Add a New Ted</button>   </Link>     
        <Link to ="/tedList" className = "nav-item"><button>Saved List</button></Link> 
       {token && <button id = "logout-btn"onClick = {logout} className = "nav-item">Log Out</button>}

        </nav>
     );
}

export default Navbar