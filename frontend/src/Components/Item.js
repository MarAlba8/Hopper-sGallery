import React, {useState} from 'react';
import Details from './Details';

import axiosInstance from "../axiosApi";

import StarRatings from 'react-star-ratings';

const Item = (props) => {
    const [active, setActive] = useState(false);
    const [rating, setRating] = useState(0);
    let details = <Details active={active} setActive={setActive} item={props.item} rating={rating}/>;

    const changeRating = ( newRating, name ) => {
        axiosInstance.post('rating/' + props.item.id, 
       {
            rating: newRating
       })
       .then(getRating)
       .catch (error => {
            throw error;
        })
    }

	const getRating = () => {
       axiosInstance.get('rating/' + props.item.id).then(response => setRating(response.data.data[0].rate)
    ).catch (error => {
        throw error;
    })};
    
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
                   
                             
            </div>
            {active ? details : ""} 
            <div className="start-rating">
                <StarRatings
                    rating={rating}
                    starRatedColor="red"
                    changeRating={changeRating}
                    numberOfStars={5}
                    name='rating'
                    starDimension="15px"
                    starSpacing="10px"
                /> 
            </div>
        </div>
    );
}


export default Item;
