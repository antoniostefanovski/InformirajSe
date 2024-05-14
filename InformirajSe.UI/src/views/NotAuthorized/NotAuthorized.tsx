import React from "react";
import "./NotAuthorized.scss";

export default function NotAuthorized() {
   
    return(

        <div className="main-content">
            <div className="left-side">
                <h1 className="not-auth-text">Не сте авторизирани!</h1>
                <button className="back-button">Назад</button>
            </div>
            <div className="right-side">
                <div className="blob-wrapper">
                    <div className="blob2"></div>
                    <div className="blob"></div>
                    <div className="blob1"></div>
                </div>
            </div>
        </div>
            
    )
}