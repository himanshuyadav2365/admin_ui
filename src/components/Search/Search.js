import React from 'react'
// import axios from 'axios'
import './Seach.css';

const Search = ({handler})=>{
    return(
        <>
        <input type='text' className="search" placeholder='Search by name email or role' onChange={(e)=>handler(e.target.value)}/>
        </>
        
    )
}

export default Search

