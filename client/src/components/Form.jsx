import React, { useState, useContext } from 'react';
import moment from "moment"
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Form() {
    const { addTed } = useContext(UserContext)
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        name: "",
        dispensaryPurchased: "",
        grower: "",
        thc: 0,
        cbd: 0,
        category: "",
        type: "",
        stars: 0
    })
    console.log(inputs)
    const isValidDateString = (dateString) => {
        const parsedDate = new Date(dateString)
        return !isNaN(parsedDate.getTime())
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        const newValue =
            name === "stars" || name === "thc" || name === "cbd"
                ? Number(value)
                : value;
        setInputs(prevInputs => {
            return {
                ...prevInputs,
                [name]: newValue
            }
        })
    }

    const handleDateChange = (e) => {
        console.log(e.target.value)
        const selectedDateString = e.target.value
        if (isValidDateString(selectedDateString)) {
            const parsedDate = new Date(selectedDateString)
            setInputs(prevInputs => {
                return {
                    ...prevInputs,
                    harvestDate: parsedDate
                }
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addTed(inputs)
        alert("Every little thing.... its gonna be alright!")
        navigate("/tedList")
    }

    return (
        <form id ="ted-form" onSubmit={handleSubmit}>
            <label>Ted Name</label><input className="form-input" name="name" value={inputs.name} onChange={handleChange} />
            <label>Dispensary Purchased</label><input className="form-input" name="dispensaryPurchased" value={inputs.dispensaryPurchased} onChange={handleChange} />
            <label>Grower Company</label><input className="form-input" name="grower" value={inputs.grower} onChange={handleChange} />
            <label>THC %</label><input className="form-input" name="thc" value={inputs.thc} onChange={handleChange} type="number" />
            <label>CBD %</label><input className="form-input" name="cbd" value={inputs.cbd} onChange={handleChange} type="number" />
            <label>Harvest Date</label><input className="form-input" name="harvestDate" onChange={handleDateChange} type="date" />
            <label>Category</label>
            <select className="form-input" name="category" value={inputs.category} onChange={handleChange}>
                <option value="">---</option>
                <option value="flower">Flower</option>
                <option value="gummy">Gummy</option>
                <option value="edible">Edible</option>
            </select>
            <label>Type</label>
            <select className="form-input" name="type" value={inputs.type} onChange={handleChange}>
                <option value="">---</option>
                <option value="sativa">Sativa</option>
                <option value="indica">Indica</option>
                <option value="hybrid">Hybrid</option>
            </select>
            <label>Stars</label>
            <select className="form-input" name="stars" value={inputs.stars} onChange={handleChange}>


                <option

                    value="1">⭐</option>


                <option

                    value="2">⭐⭐</option>


                <option

                    value="3">⭐⭐⭐</option>


                <option

                    value="4">⭐⭐⭐⭐</option>


                <option

                    value="5">⭐⭐⭐⭐⭐</option>


            </select>                <button>Add Ted</button>

        </form>
    );
}

export default Form;