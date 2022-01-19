import React from "react";

const AuthPreview: React.FC = () => {
    return (
        <div className="auth__preview">
            <div className="auth__preview__text">
                <h1>Hang out anytime, anywhere.</h1>
                <p>Messenger makes it easy and fun to stay close to your favorite people.</p>
            </div>

            <div className="auth__preview__image">
                <img src="../../../static/images/messengerPreview.png" />
            </div>
        </div>
    )
}
export default AuthPreview;