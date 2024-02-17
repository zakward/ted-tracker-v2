import React, {useContext} from 'react';
import {useNavigate, Link} from "react-router-dom"
import { UserContext } from '../context/UserContext';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
function Navbar() {
    const {logout, token, user} = useContext(UserContext)
    const navigate = useNavigate()
    return ( 
        <nav>
        <h3 className = "nav-item">Welcome {user.username}</h3>           
        <Link to ="/form" className = "nav-item"><button>Add a New Ted</button>   </Link>  
        <Link to ="/tedList" className = "nav-item"><button>Saved List</button></Link> 
       {token && <button id = "logout-btn"onClick = {logout} className = "nav-item">Log Out</button>}
       {token && <ArrowBackIosNewIcon className="nav-item navigation" fontSize= "large" onClick = {()=> navigate(-1)}/>}

        </nav>
     );
}

export default Navbar