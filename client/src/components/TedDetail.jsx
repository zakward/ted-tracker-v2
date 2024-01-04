import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useParams } from 'react-router-dom';
import Review from "./Review"
import moment from "moment"


function TedDetail() {

    const { deleteTed, allReviews, allTeds, userAxios, setAllTeds, setAllReviews } = useContext(UserContext)
    const { tedId } = useParams()
    const [showAddReview, setShowAddReview] = useState(false)




    const [reviewInputs, setReviewInputs] = useState({
      text: "",
      rating: ""
    })

    const handleChange = (e) => {
      const {name, value} = e.target
      setReviewInputs(prevInputs => {
        return {
          ...prevInputs,
          [name]: value
        }
      })
    }

    
    useEffect(()=> {
      userAxios.get("/api/main/ted/tedWithReviews")
          .then(res => setAllTeds(res.data) )
          .catch(err => console.log(err))
  }, [tedId]);

    
    
    const foundTed = allTeds.find((ted) => ted._id === tedId)
    const date = moment(foundTed?.harvestDate).format("MM-DD-YYYY")
    if (!foundTed){
      return <div>Loading ...</div>
    }
    const handleSubmit = (e) => {
      e.preventDefault()
      userAxios.post(`/api/main/reviews/${foundTed._id}`, reviewInputs)
        .then(res => setAllReviews(prevReviews => {
          return [
            ...prevReviews,
            res.data
          ]
        }))
        setShowAddReview(false)
        .catch(err => console.error(err))

    }

    console.log("foundTed:", foundTed)
    console.log("reviews: ", allReviews)

    const deleteTedItem = () => {
        deleteTed(tedId)
    }
    const filteredReviews = allReviews.filter(review => review.tedId === tedId)
    const filteredElements = filteredReviews.map(review => {
        return (
            <>
                <Review key = {review._id} {...review} setAllReviews = {setAllReviews}/>
            </>
        )
    })

    return (
        <>
            <div className="ted-wrapper">
                <h2>{foundTed?.name}</h2>
                <h4>{foundTed.grower}</h4>
                <p>Harvest Date: {date}</p>
                <p>Purchased from: {foundTed.dispensaryPurchased}</p>
                <p>THC: {foundTed.thc}%</p>
                <p>CBD: {foundTed.cbd}%</p>
                <p>Category: {foundTed.category}</p>
                <p>Type: {foundTed.type}</p>
                <p>Stars: {foundTed.stars} </p>
                <h3>REVIEWS</h3>
                {!showAddReview && <button onClick={() => setShowAddReview(true)}>Add Review</button>}
                <div>{filteredElements}</div>
                {/* <button onClick = {deleteTedItem}>Delete TED</button> */}
                {showAddReview && (
                    <div className="add-review-dropdown">
                        <input placeholder="Write your review..." name="text" value={reviewInputs.text} onChange={handleChange} />
                        <input placeholder="Rate with Stars!" min="1" max="5" type="number" name="rating" value={reviewInputs.stars} onChange={handleChange} />
                        <button onClick={handleSubmit}>Submit Review</button>
                        <button onClick={() => setShowAddReview(false)}>Cancel</button>
                    </div>
                )}
            </div>

        </>);
}

export default TedDetail

