import React, { useState } from "react";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import LogoutIcon from '@mui/icons-material/Logout';
import ChangePicture from "./changePicture";
import { user } from "../interfaces";

interface props {
    user: user
    setUser: any
    reloadMessages: number
    setReloadMessages: any
}

const Dropdown: React.FC<props> = (props) => {
    const [changePicturePopUp, setChangePicturePopUp] = useState<boolean>(false);

    return (
        <div className="dropdown">
            <ul className="dropdown__list">
                <li className="dropdown__list__listItem changePicture">
                    <a onClick={()=> setChangePicturePopUp(true)}>
                        <InsertPhotoIcon />
                        <p>Change picture</p>
                    </a>

                    {/* Change Picture */}
                    { changePicturePopUp && 
                        <ChangePicture 
                            user={props.user} 
                            setUser={props.setUser} 
                            reloadMessages={props.reloadMessages}
                            setReloadMessages={props.setReloadMessages}
                            setChangePicturePopUp={setChangePicturePopUp} />
                    }
                </li>
                <li>
                    <a className="dropdown__list__listItem logout" href="/login">
                        <LogoutIcon />
                        <p>Logout</p>
                    </a>
                </li>
            </ul>
        </div>
    )
}
export default Dropdown;