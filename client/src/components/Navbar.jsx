import React from 'react';
import {useNavigate, Link} from "react-router-dom"


function Navbar() {
    return ( 
        <nav>

        <Link to ="/form"><button>Add a New Ted</button>   </Link>     
        <h3>Ted-Tracker-V.2</h3>        
        <Link to ="/tedList"><button>Saved List</button></Link>        

        </nav>
     );
}

export default Navbar