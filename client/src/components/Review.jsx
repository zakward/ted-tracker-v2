import React, {useState} from 'react';

function Review({_id, text, author}) {
    const [showAddReview, setShowAddReview] = useState(false)

    console.log(author)
    return ( 
        <>
            <div key={_id} className="comment">
         
            <p><strong>{author.username}</strong>:</p>
           <p>{text}</p>
          </div>
          <button onClick={() => setShowAddReview(true)}>Add Review</button>

{showAddReview && (
  <div className="add-review-dropdown">
    <input placeholder="Write your review..." />
    <button>Submit Review</button>
    <button onClick={() => setShowAddReview(false)}>Cancel</button>
  </div>
)}
        </>
     );
}

export default Review;