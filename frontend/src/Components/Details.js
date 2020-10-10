import React, {useEffect, useState} from 'react';
import StarRatings from 'react-star-ratings';
import { IoIosClose } from "react-icons/io";
import { IconContext } from "react-icons";

import axiosInstance from "../axiosApi";

const Details = (props) => {
	
	const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
    	getComments();
    }, []);
    
	const getComments= () => {
       axiosInstance.get('comments/' + props.item.id).then(response => setComments(comments => [...comments, response.data.data])
      
    ).catch (error => {
        throw error;
    })}; 
   
    const onChange = e => {
        e.preventDefault();
        if (e.target.name === "name"){
            setName(e.target.value)
        }
        else{
            setNewComment(e.target.value);
        }
      console.log("value: " + e.target.value);
    };

    const postComment = (e) => {
        e.preventDefault();
        axiosInstance.post('comment/' + props.item.id, 
       {
            comment: newComment,
            name: name
       })
       .then(getComments)
       .catch (error => {
            throw error;
        })
    }; 
    
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
                <div className="comments-box">
                    <h4>Join the Discussion</h4>
                    <form className="comment-form" onSubmit={postComment}>
                        <div className="comment-form-fiel">
                            <label for="name"></label>
                            <textarea onChange={onChange} name="name" placeholder="name"></textarea>
                            <label for="comment"></label>
                            <textarea onChange={onChange} name="comment" placeholder="comment"></textarea>
                            <button>Post Comment</button>
                        </div>
                    </form>
                    <h4>Comments</h4>
                    <div className="comments">
            			{comments.map(comment => (
                			comment.map(c => 
                			<div className="comment">
                                <p >{c.name}</p>
                    			<p style={{marginLeft: "55px"}}>- {c.comment}</p>
                                <hr/>
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
