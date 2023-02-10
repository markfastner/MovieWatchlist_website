import "../features/ratingspage/ratings.css";

function RatingsPage() {
  return (
    
  <div class="comments">
    <h1 class="header">
      Comments and Reactions
    </h1>
    
    <form id="add-comment-form">
      <textarea id="new-comment" rows="4" cols="50"></textarea>
      <button type="submit">Add Comment</button>
    </form>
  </div>
  );
}

export default RatingsPage;
