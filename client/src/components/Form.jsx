import React, { useState } from 'react';
import moment from "moment"

function Form() {


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
        console.log(inputs)
        alert("This would be a lot cooler if it worked... alright, alright, alright")
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Ted Name</label><input className="form-input" name="name" value={inputs.name} onChange={handleChange} />
            <label>Dispensary Purchased</label><input className="form-input" name="dispensaryPurchased" value={inputs.dispensaryPurchased} onChange={handleChange} />
            <label>Grower Company</label><input className="form-input" name="grower" value={inputs.grower} onChange={handleChange} />
            <label>THC %</label><input className="form-input" name="thc" value={inputs.thc} onChange={handleChange} type="number" />
            <label>CBD %</label><input className="form-input" name="cbd" value={inputs.cbd} onChange={handleChange} type="number" />
            <label>Harvest Date</label><input className="form-input" name="harvestDate" onChange={handleDateChange} type="date" />
            <label>Category</label><input className="form-input" name="category" value={inputs.category} onChange={handleChange} />
            <label>Type</label><input className="form-input" name="type" value={inputs.type} onChange={handleChange} />
            <label>Stars</label><input className="form-input" name="stars" value={inputs.stars} onChange={handleChange} type="number" />
            <button>Add Ted</button>

        </form>
    );
}

export default Form;