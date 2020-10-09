import React, {useEffect, useState} from 'react';
import StarRatings from 'react-star-ratings';
import { IoIosClose } from "react-icons/io";
import { IconContext } from "react-icons";

import axiosInstance from "../axiosApi";

const Details = (props) => {
	
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");

    useEffect(() => {
    	getComments();
    }, []);
    
	const getComments= () => {
       axiosInstance.get('comments/' + props.item.id).then(response => setComments(comments => [...comments, response.data.data])
      
    ).catch (error => {
        throw error;
    })}; 
    
    const onChange = e => {
      setNewComment(e.target.value);
  	};
  
    const postComment = (e) => {
       e.preventDefault();
       axiosInstance.post('comment/' + props.item.id, {comment: newComment})
       .then(getComments)
       .catch (error => {
            throw error;
        })
    }; 
    
    const handleClick = () => {
        props.setActive(!props.active);
    }

 	console.log(newComment)
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
                <div className="comments">
                    <h4>Comments</h4>
                    <h4>Comentario {props.item.id}</h4>
                    <form onSubmit={postComment}>
                     	<label for="com">Comment:</label>
                    	<input onChange={onChange} name="com"></input>
                    	<button>Send</button>
                    </form>
                    <div className="">
            			{comments.map(comment => (
                			comment.map(c => 
                			<div >
                    			<p>{c.comment}</p>
                			</div>
                			)
            			))}
        			</div>  
                </div>
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
