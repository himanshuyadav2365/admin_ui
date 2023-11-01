import React, { useEffect, useRef, useState } from "react";
import "./Table.css"
import { AiFillSave, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"


const Table=({selectedList,item, handleDelete,checkBoxHandler,handleSave})=>{
    
    const [editable, setEditable]=useState([])
    const [user,setUser]=useState({id:item.id,name:item.name,role:item.role,email:item.email})
    

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
        if(user.name && user.role && user.email){
        const newEditableList=editable.filter((item)=>{
            return !item===id
        })
        setEditable(newEditableList)
        
        handleSave(id,user)
        }
        else{
            alert("Fill all empty fields to save")
        }

    }

    
        return (
                <tr className={selectedList.includes(item.id)? "selectedRow":"null"}>
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
                {!editable.includes(item.id)? <button className="editButton" onClick={(e)=>{handleEdit(item.id)}}><AiOutlineEdit/></button>:
                    <button className="savebutton" onClick={(e)=>{ handleRemove(item.id,user) }}> <AiFillSave/></button>}
                
                <button className="deleteButton" onClick={(e)=>{handleDelete(item.id) }}><AiOutlineDelete/></button>

                </td>
                </tr>
                
                )
    
}

export default Table