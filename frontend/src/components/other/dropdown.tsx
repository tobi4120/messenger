import React from "react";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import LogoutIcon from '@mui/icons-material/Logout';

const Dropdown: React.FC = () => {
    return (
        <div className="dropdown">
            <ul className="dropdown__list">
                <li className="dropdown__list__listItem changePicture">
                    <InsertPhotoIcon />
                    <p>Change picture</p>
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