import React, { useRef, useState } from "react";
import axios from "axios";
import "./Table.css"


const Table=({item, handleDelete,checkBoxHandler,handleSave})=>{
    // console.log("inside table",item)
    const [editable, setEditable]=useState({})
    const [user,setUser]=useState({name:item.name,role:item.role,email:item.email})
    

    const handler=(e)=>{
        // console.log(...user,[e.target.name]=e.target.value)
        setUser({...user,[e.target.name]:e.target.value})
    }

    const handleEdit=(id)=>{
        setEditable({id:id,
            edit:!editable.edit
        })
    }

    
        return (<div className="row">
                    <input className="i" type="checkbox" value={item.id} onChange={(e)=> checkBoxHandler(e.target.value,e.target.checked)}/>
                    {/* <input className="i" disabled/> */}
                    {editable.id==item.id && editable.edit? <input value={user.name} onChange={(e)=>handler(e)} name="name"/>:
                    <p className="i">{item.name}</p>}

                    {editable.id==item.id && editable.edit? <input value={user.email} onChange={(e)=>handler(e)} name="email" />:
                    <p className="i">{item.email}</p>}
                    {editable.id==item.id && editable.edit? <input value={user.role} onChange={(e)=>handler(e)} name="role"/>:
                    <p className="i">{item.role}</p>}
                    {!editable.edit? <button className="i" onClick={(e)=>{handleEdit(item.id)}}>Edit</button>:
                    <button className="i" onClick={(e)=>{handleSave(item.id,user)}}>Save</button>}
                    <button className="i" onClick={(e)=>{handleDelete(item.id)}}>Delete</button>
                </div>)
    
}

export default Table