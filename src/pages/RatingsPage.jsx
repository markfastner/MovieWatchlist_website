import "../features/ratingspage/ratings.css";

function RatingsPage() {
  return (
  <div class="comments">
    <h1 class="header">
      Comments and Reactions
    </h1>
    
    <form id="add-comment-form">
      <h2 class="comment-container"> 
      <textarea id="new-comment" rows="4" cols="50"></textarea>
      </h2>
      <div class="submit-button">
      <button type="submit">Add Comment</button>
      </div>
    </form>

  </div>
  );
}

export default RatingsPage;
