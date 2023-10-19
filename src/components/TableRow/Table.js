import React, { useRef, useState } from "react";
import "./Table.css"
// import { AiFillSave, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"


const Table=({selectedList,item, handleDelete,checkBoxHandler,handleSave,})=>{
    
    const [editable, setEditable]=useState({})
    const [user,setUser]=useState({name:item.name,role:item.role,email:item.email})
    console.log(selectedList)

    const handler=(e)=>{
        
        setUser({...user,[e.target.name]:e.target.value})
    }

    const handleEdit=(id)=>{
        setEditable({id:id,
            edit:!editable.edit
        })
    }

    
        return (<tr >
                <td>
                <input className="i" checked={selectedList.includes(item.id)} type="checkbox" value={item.id} onChange={(e)=> checkBoxHandler(e.target.value,e.target.checked)}/>
                </td>
                <td>
                    {editable.id==item.id && editable.edit? <input value={user.name} onChange={(e)=>handler(e)} name="name"/>:
                    item.name}
                </td>
                   
                <td>
                    {editable.id==item.id && editable.edit? <input value={user.email} onChange={(e)=>handler(e)} name="email" />:
                    item.email}
                </td>
                <td> 
                {editable.id==item.id && editable.edit? <input value={user.role} onChange={(e)=>handler(e)} name="role"/>:
                    item.role}
                </td> 
                <td>
                {!editable.edit? <button className="i" onClick={(e)=>{handleEdit(item.id)}}>edit</button>:
                    <button className="i" onClick={(e)=>{handleSave(item.id,user)}}> save</button>}
                {/* <td></td> */}
                
                <button className="i" onClick={(e)=>{handleDelete(item.id)}}>delete</button>

                </td>
                </tr>)
    
}

export default Table