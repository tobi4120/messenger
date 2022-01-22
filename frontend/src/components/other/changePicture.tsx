import React, { useState } from "react";
import ProfilePic from "../home/convoItemComponents/profilePic";
import { user } from "../interfaces";
import { uploadProfileImage } from "../API/userAPI";
import Loader from "../other/loading";

interface props {
    user: user
    setUser: any
    reloadMessages: number
    setReloadMessages: any
    setChangePicturePopUp: any
}

const ChangePicture: React.FC<props> = (props) => {
    const [selectedImg, setSelectedImg] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const uploadFile = async () => {
        if (!selectedImg) return

        // Set state to loading
        setIsLoading(true);

        const uploadData = new FormData();
        uploadData.append('profile_pic', selectedImg, selectedImg.name);

        const response = await uploadProfileImage(uploadData, props.user.id);

        // Update profile picture state
        props.setUser({ ...props.user, profile_pic: response.profile_pic});

        // Set state to not loading
        setIsLoading(false);

        // Reload messages in the LoadMessages component
        props.setReloadMessages(props.reloadMessages + 1);

        // Close popup
        props.setChangePicturePopUp(false);
    }

    return (
        <div className="modal">
            <div className="changePicture">
                <div className="changePicture__currentImg">
                    <ProfilePic imageLocation={props.user.profile_pic} />
                    { isLoading ? 
                        <Loader />:
                        <div>
                            <input 
                                accept="image/*"
                                type="file"
                                onChange={(e) => e.target.files && setSelectedImg(e.target.files[0])} />
                            <button onClick={() => uploadFile()}>Upload picture</button>
                            <button onClick={() => props.setChangePicturePopUp(false)}>Cancel</button>
                        </div> }
                </div>
            </div>
        </div>
    )
}
export default ChangePicture;