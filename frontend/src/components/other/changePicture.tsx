import React, { useState } from "react";
import ProfilePic from "../home/convoItemComponents/profilePic";
import { user } from "../interfaces";
import { uploadProfileImage } from "../API/userAPI";

interface props {
    user: user
}

const ChangePicture: React.FC<props> = (props) => {
    const [selectedImg, setSelectedImg] = useState<any>(null);

    const uploadFile = async () => {
        if (!selectedImg) return

        const uploadData = new FormData();
        uploadData.append('profile_pic', selectedImg, selectedImg.name)

        const response = await uploadProfileImage(uploadData, props.user.id);
        console.log(response)
    }

    return (
        <div className="modal">
            <div className="changePicture">
                <div className="changePicture__currentImg">
                    <ProfilePic imageLocation={props.user.profile_pic} />
                    <input 
                        accept="image/*"
                        type="file"
                        onChange={(e) => e.target.files && setSelectedImg(e.target.files[0])} />
                    <button onClick={() => uploadFile()}>Upload picture</button>
                </div>
            </div>
        </div>
    )
}
export default ChangePicture;