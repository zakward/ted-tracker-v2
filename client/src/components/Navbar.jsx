import React, {useContext, useState} from 'react';
import {useNavigate, Link} from "react-router-dom"
import { UserContext } from '../context/UserContext';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Resources from './Resources';


function Navbar() {
    const {logout, token, user} = useContext(UserContext)
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    function toggleMenu(){
        setIsOpen(!isOpen)

    }

    function closeLogout(){
        setIsOpen(!isOpen)
        logout()
    }
    return ( 
        <nav>
           {isOpen ?  <CloseIcon fontSize='large'className = "menu-icon" onClick = {toggleMenu}/> :
            <MenuIcon fontSize='large' className = "menu-icon" onClick = {toggleMenu}/>
    }
        <h3 id = "welcome-msg">Welcome {user.username}</h3> 
        {token && <ArrowBackIosNewIcon className="nav-item navigation" fontSize= "large" onClick = {()=> navigate(-1)}/>}

        {isOpen &&  
        <>
        <div className = {`${"menu"} ${isOpen && "active"}`}>
        <Link to ="/form" className = "nav-item" onClick={toggleMenu}><button className = "nav-btn">Add New Ted</button>   </Link>  
        <Link to ="/tedList" className = "nav-item" onClick={toggleMenu}><button className = "nav-btn">Saved List</button></Link> 
        <Link to = "/resources" className = "nav-item" onClick={toggleMenu}><button className = "nav-btn">Resources</button></Link>
       {token && <button  id = "logout-btn"onClick = {closeLogout} className="nav-item nav-btn" >Log Out</button>}
        </div>
        </>        
        }
        </nav>
     );
}

export default Navbar