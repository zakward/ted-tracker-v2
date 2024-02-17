import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useParams } from 'react-router-dom';
import Review from "./Review"
import moment from "moment"
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';



function TedDetail() {

  const { deleteTed, allReviews, allTeds, userAxios, setAllTeds, setAllReviews } = useContext(UserContext)
  const { tedId } = useParams()
  const [showAddReview, setShowAddReview] = useState(false)
  const [showReviews, setShowReviews] = useState(false)




  const [reviewInputs, setReviewInputs] = useState({
    text: "",
    rating: 1
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setReviewInputs(prevInputs => {
      return {
        ...prevInputs,
        [name]: value
      }
    })
  }


  useEffect(() => {
    userAxios.get("/api/main/ted/tedWithReviews")
      .then(res => setAllTeds(res.data))
      .catch(err => console.log(err))
  }, [tedId]);



  const foundTed = allTeds.find((ted) => ted._id === tedId)
  const date = moment(foundTed?.harvestDate).format("MM-DD-YYYY")
  if (!foundTed) {
    return <div>Loading ...</div>
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    userAxios.post(`/api/main/reviews/${foundTed._id}`, reviewInputs)
      .then(res => {
        setAllReviews(prevReviews => {
          return [
            ...prevReviews,
            res.data
          ]
        })

        userAxios.put(`/api/main/ted/${foundTed._id}`, reviewInputs)
          .then(res => {
            //         console.log("this")
            setAllTeds(prevAllTeds => {
              return prevAllTeds.map(ted => ted._id === foundTed._id ? res.data : ted)
            })
            setShowAddReview(false)
            setReviewInputs({
              text: "",
              rating: ""
            })
          })

          .catch(err => console.error(err))
      })
      .catch(err => console.log(err))
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
        <Review key={review._id} {...review} setAllReviews={setAllReviews} />
      </>
    )
  })

  return (
    <div id="ted-list-container">
      <div className="ted-wrapper">
        <h2 style = {{borderBottom: "2px dashed green"}}>{foundTed?.name}</h2>
        <p>Added by: {foundTed.users.username}</p>
        <h4>{foundTed.grower}</h4>
        <p>Harvest Date: {date}</p>
        <p>Purchased from: {foundTed.dispensaryPurchased}</p>
        <p>THC: {foundTed.thc}%</p>
        <p>CBD: {foundTed.cbd}%</p>
        <p>Category: {foundTed.category}</p>
        <p>Type: {foundTed.type}</p>
        <Stack spacing={1}>
          <Rating name="half-rating" value={foundTed.stars} precision={0.5} readOnly/>
          {/* <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly /> */}
        </Stack>
        {/* <p>Stars: {foundTed.stars} </p> */}
        {/* <span>&#9733;</span>
        <span>&#9733;&#189;</span> */}
        <h3>REVIEWS</h3>
        {!showAddReview && <button onClick={() => setShowAddReview(true)}>Add Review</button>}
        <button onClick={() => setShowReviews(!showReviews)}>{showReviews ? "Close Reviews" : "Show Reviews"}</button>
        {showAddReview && (
          <div className="add-review-dropdown">
            <textarea placeholder="Write your review..." type="text-area" name="text" value={reviewInputs.text} onChange={handleChange}></textarea>
            {/* <input placeholder="Rate with Stars!" min="1" max="5" type="number" name="rating" value={reviewInputs.stars} onChange={handleChange} /> */}
            <select name="rating" value={reviewInputs.rating} onChange={handleChange}>


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


            </select>
            <button onClick={handleSubmit}>Submit Review</button>
            <button onClick={() => setShowAddReview(false)}>Cancel</button>
          </div>
        )}
        {showReviews && <div className="review-list">{filteredElements}</div>}
        {/* <button onClick = {deleteTedItem}>Delete TED</button> */}
      </div>

    </div>);
}

export default TedDetail

