import React, {useState} from 'react';
import Details from './Details';

import StarRatings from 'react-star-ratings';

const Item = (props) => {
    const [active, setActive] = useState(false);
    const [rating, setRating] = useState(0);
    let details = <Details active={active} setActive={setActive} item={props.item} />;

    const changeRating = ( newRating, name ) => {
        setRating(newRating);
    }

    const handleDetails = () => {
        setActive(!active);       
    }
    return(
        <div>
            <div className="item" onClick={handleDetails}>
                <img className="photo" src={props.item.image} alt={props.item.title}></img>
                <div className="info">
                    <h5 id="title">{props.item.title}</h5>
                </div>  
                <StarRatings
                    rating={rating}
                    starRatedColor="blue"
                    changeRating={changeRating}
                    numberOfStars={5}
                    name='rating'
                    starDimension="15px"
                    starSpacing="10px"
                />    
                             
            </div>
            {active ? details : ""} 
        </div>
    );
}


export default Item;