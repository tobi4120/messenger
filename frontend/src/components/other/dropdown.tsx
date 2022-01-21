import React, { useState } from "react";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import LogoutIcon from '@mui/icons-material/Logout';
import ChangePicture from "./changePicture";
import { user } from "../interfaces";

interface props {
    user: user
}

const Dropdown: React.FC<props> = (props) => {
    const [changePicturePopUp, setChangePicturePopUp] = useState<boolean>(false);

    return (
        <div className="dropdown">
            <ul className="dropdown__list">
                <li className="dropdown__list__listItem changePicture">
                    <InsertPhotoIcon />
                    <p onClick={() => setChangePicturePopUp(true)}>Change picture</p>

                    {/* Change Picture */}
                    { changePicturePopUp && 
                        <ChangePicture user={props.user} />
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