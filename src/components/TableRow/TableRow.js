import React, { useEffect, useRef, useState } from "react";
import "./Table.css"
// import { AiFillSave, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"


const Table=({selectedList,item, handleDelete,checkBoxHandler,handleSave})=>{
    
    const [editable, setEditable]=useState([])
    const [user,setUser]=useState({id:item.id,name:item.name,role:item.role,email:item.email})
    console.log(selectedList)
    

    useEffect(()=>{
        setUser({id:item.id,name:item.name,role:item.role,email:item.email})
    },[item])

    const handler=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
        
    }

    const handleEdit=(id)=>{
        setEditable([...editable,id])
    }


    const handleRemove=(id,user)=>{
        const newEditableList=editable.filter((item)=>{
            return !item===id
        })
        setEditable(newEditableList)
        handleSave(id,user)
    }

    
        return (
                <tr >
                <td>
                <input className="i" checked={selectedList.includes(item.id)} type="checkbox" value={item.id} onChange={(e)=> checkBoxHandler(e.target.value,e.target.checked)}/>
                </td>
                <td>
                    {editable.includes(item.id)?<input value={user.name} onChange={(e)=>handler(e)} name="name"/>:
                    item.name}
                </td>
                   
                <td>
                    {editable.includes(item.id)?<input value={user.email} onChange={(e)=>handler(e)} name="email" />:
                    item.email}
                </td>
                <td> 
                {editable.includes(item.id)?<input value={user.role} onChange={(e)=>handler(e)} name="role"/>:
                    item.role}
                </td> 
                <td>
                {!editable.includes(item.id)? <button className="i" onClick={(e)=>{handleEdit(item.id)}}>edit</button>:
                    <button className="i" onClick={(e)=>{ handleRemove(item.id,user) }}> save</button>}
                
                <button className="i" onClick={(e)=>{handleDelete(item.id) }}>delete</button>

                </td>
                </tr>
                
                )
    
}

export default Table