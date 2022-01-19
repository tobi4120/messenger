import React, { useState } from "react";

interface Props {
    imageLocation: string | null
}

const ProfilePic: React.FC<Props> = (props) => { 
    const [staticLocation, setStaticLocation] = useState<string>("../../../../static/images/");

    return (
        <img src={props.imageLocation ? (staticLocation + props.imageLocation) : 
            (staticLocation + "genericProfile.png")} />
    )
}
export default ProfilePic