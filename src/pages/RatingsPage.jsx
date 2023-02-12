// export function to display the comment box and button for submission
export default function Ratingpage() {
  return (
  <div class="bg-blue-300"> 
  {/* This creates the background for the selected are for the comment section*/}
  <div class="container mx-auto p-6">
    <h3 class="text-lg font-normal mb-4">Comments and Reactions</h3>
    {/* Creates the header of the page, besides the nav bar*/}
    <ul class="list-disc pl-5">
    </ul>
    <form class="mt-6">
      <textarea class="resize-none border border-gray-400 rounded w-1/3 py-2 px-3" rows="3"></textarea>
      <ul class="pl-3">        
      </ul>
      <button class="bg-blue-500 text-white py-2 px-4 rounded mt-3 hover:bg-blue-700">Add Comment</button>
      {/* Add comment button, changes color once hovered over. */}
    </form>
  </div>
  </div>
  )
}



