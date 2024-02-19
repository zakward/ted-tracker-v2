import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import axios from "axios"
import Ted from './Ted';

function TedList() {
    const { allTeds, setAllTeds, userAxios, allReviews } = useContext(UserContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('All'); // New state for type filtering
    const [sortByTHC, setSortByTHC] = useState(false); // State for sorting by THC content
    const [filteredTeds, setFilteredTeds] = useState([]);

    useEffect(() => {
        userAxios.get("/api/main/ted/tedWithReviews")
            .then(res => {
                setAllTeds(res.data);
                setFilteredTeds(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        const filtered = allTeds.filter(ted => {
            // Filter by name
            const nameMatch = ted.name.toLowerCase().includes(searchQuery.toLowerCase());
            // Filter by type if selected, or show all if 'All' is selected
            const typeMatch = selectedType === 'All' || ted.type === selectedType;
            return nameMatch && typeMatch;
        });

        // Sort by THC if enabled
        const sortedTeds = sortByTHC ? filtered.sort((a, b) => b.thc - a.thc) : filtered;

        setFilteredTeds(sortedTeds);
    }, [searchQuery, allTeds, selectedType, sortByTHC]); // Include sortByTHC as a dependency

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    const handleSortChange = () => {
        setSortByTHC(!sortByTHC);
    };

    const tedElements = filteredTeds.map(ted => (
        <Ted {...ted} key={ted._id} />
    ));

    return (
        <>
            <h1 id="ted-title" style={{ color: "white", fontSize: "46px", borderBottom: "3px solid #4CAF50" }}>Ted Tracker</h1>
            <input id="search-input" type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search" />
            <span style={{ color: "white", fontSize: "larger" }}>
                Filter By Type
                <select value={selectedType} onChange={handleTypeChange} style={{ fontSize: "large", marginLeft: "20px" }}>

                    <option value="All">All Types</option>
                    <option value="indica">Indica</option>
                    <option value="sativa">Sativa</option>
                    <option value="hybrid">Hybrid</option>
                    {/* Add more options for types */}
                </select>
            </span>
            <div style={{ display: "flex", alignItems: "center", marginTop: "30px" }}>
                <span style={{ marginRight: "10px", color: "white", fontSize: "larger" }}>Sort by Highest THC %:</span>
                <label style={{ position: "relative", display: "inline-block", width: "60px", height: "34px", borderRadius: "20px", backgroundColor: sortByTHC ? "#4CAF50" : "#ccc", cursor: "pointer" }}>
                    <input type="checkbox" style={{ opacity: 0, width: "100%", height: "100%", cursor: "pointer", position: "absolute", top: 0, left: 0, zIndex: 2 }} checked={sortByTHC} onChange={handleSortChange} />
                    <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "12px", height: "12px", backgroundColor: "white", borderRadius: "50%", border: "2px solid #fff", opacity: sortByTHC ? 1 : 0 }}></span>
                </label>
            </div>
            <div className="legend-container">
                <div className="legend-item indica-class">Indica</div>
                <div className="legend-item sativa-class">Sativa</div>
                <div className="legend-item hybrid-class">Hybrid</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "40px", marginTop: "50px" }}>
                {tedElements}
            </div>
        </>
    );
}



export default TedList;
