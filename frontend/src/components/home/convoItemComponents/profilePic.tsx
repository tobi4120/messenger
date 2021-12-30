import React, { useState } from "react";

interface Props {
    imageLocation: string | null
}

const ProfilePic: React.FC<Props> = (props) => { 
    const [staticLocation, setStaticLocation] = useState<string>("../../../../");

    return (
        <img src={props.imageLocation ? (staticLocation + props.imageLocation.substring(9, props.imageLocation.length)) : 
            (staticLocation + "static/images/genericProfile.png")} />
    )
}
export default ProfilePic