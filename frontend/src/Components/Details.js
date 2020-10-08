import React, {useState} from 'react';
import StarRatings from 'react-star-ratings';
import { IoIosClose } from "react-icons/io";
import { IconContext } from "react-icons";

const Details = (props) => {

    const handleClick = () => {
        props.setActive(!props.active);
    }

    return(
        <div className="item-details">
            <div className="background-photo">
                <img className="photo-details" src={props.item.image}  alt={"photo" + props.index}></img>
            </div>
            <h2 className="photo-title">{props.item.title}</h2>
            <StarRatings
                starRatedColor="blue"
                numberOfStars={5}
                name='rating'
                starDimension="15px"
                starSpacing="10px"
            /> 
            <div>
                <p>{props.item.description}</p>
                {/*<div className="comments">
                    <h4>Comments</h4>
                    <textarea>comments</textarea>
                    <div>
                        <h4>Comentario 1</h4>
                        <p>this is a comment</p>
                    </div>
                </div>*/}
            </div> 
            <a id="button-exit" onClick={handleClick}>
                <IconContext.Provider value={{ color: "white", className: "exit-icon", size:"2em"}}>
                    <div>
                        <IoIosClose/>
                    </div>
                </IconContext.Provider>
            </a>    
        </div>
    );
}

export default Details;
