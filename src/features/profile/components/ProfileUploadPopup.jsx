import React, {useState} from "react";
import ProfileUpload from "./ProfileUpload";

function ProfileUploadPopup(){

    const [isOpen, setIsOpen] = useState(false);

    return(
        <div>
            <button className="w-32 h-32 rounded-full object-cover mx-auto bg-gray-600" onClick={() => setIsOpen(true)}>Profile Icon</button>

            {isOpen && (
                <div>
                    <div>
                        <ProfileUpload/>
                    </div>
                    <button className = "" onClick={() => setIsOpen(false)}>Close</button>
                </div>
            )}
        </div>
    );
}

export default ProfileUploadPopup;