import React, {useState} from "react";
import ProfileUpload from "./ProfileUpload";

function ProfileUploadPopup(){

    const [isOpen, setIsOpen] = useState(false);

    return(
        <div>
            <button className="w-32 h-32 rounded-full object-cover mx-auto bg-gray-600 dark:bg-white" onClick={() => setIsOpen(true)}>Profile Icon</button>

            {isOpen && (
                <div className="my-6">
                    <div className="my-6">
                        <ProfileUpload/>
                    </div>
                    <button className = "text-white dark:text-black dark:bg-white bg-blue-500 px-2 rounded-lg" onClick={() => setIsOpen(false)}>Close</button>
                </div>
            )}
        </div>
    );
}

export default ProfileUploadPopup;