import { CirclePicker } from "react-color";

function ProfilePage() {

  
    return (
      <div className ="bg-green-400 flex-col relative min-h-screen">
        {/* Render the friends list */}
        <h1>Profile Customization Page</h1>       
        <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 justify-center">
            <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
        </div>
        
        <div className="flex relative justify-center">
          <form className="bg-blue-200">
            <CirclePicker />
          </form>
        </div>
        
        
      </div>
    );
}

export default ProfilePage;