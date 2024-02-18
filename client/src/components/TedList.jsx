import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import axios from "axios"
import Ted from './Ted';

function TedList() {
    const { allTeds, setAllTeds, userAxios, allReviews } = useContext(UserContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTeds, setFilteredTeds] = useState([]);

    useEffect(() => {
        userAxios.get("/api/main/ted/tedWithReviews")
            .then(res => {
                setAllTeds(res.data);
                setFilteredTeds(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    console.log(filteredTeds);

    useEffect(() => {
        const filtered = allTeds.filter(ted => {
            return ted.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
        setFilteredTeds(filtered);
    }, [searchQuery, allTeds]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const tedElements = filteredTeds.map(ted => (
        <Ted {...ted} key={ted._id} />
    ));

    return (
        <>
            <h1 id="ted-title" style={{ color: "white", fontSize: "46px", borderBottom: "3px solid #4CAF50" }}>Ted Tracker</h1>
            <input id = "search-input" type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search Teds..." />
            <div style={{ display: "flex", flexDirection: "column", gap: "40px", marginTop: "50px" }}>
                {tedElements}
            </div>
        </>
    );
}

export default TedList;
