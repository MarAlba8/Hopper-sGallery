import React, {useEffect, useState}  from 'react';
import Item from './Item';
import axiosInstance from "../axiosApi";

const Home = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        resetItems();
    }, []);

    const getItems = () => {
       axiosInstance.get('items').then(response => setData(data => [...data, response.data.data])
    ).catch (error => {
        throw error;
    })};

    const resetItems = () => {
        getItems();
    };

   return(
    <div>
        <div className="Home">
            {data.map(data=> (
                data.map(item => 
                <div >
                    <Item item={item}/>
                </div>
                )
            ))}
        </div>  
    </div>
         
   )
}

export default Home;