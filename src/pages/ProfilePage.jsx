import { CirclePicker } from "react-color";

function ProfilePage() {
    return (
      <div className ="bg-red-400">
        {/* Render the friends list */}
        <h1>
        Profile Customization
        </h1>
        
        <CirclePicker />
      </div>
    );
}

export default ProfilePage;