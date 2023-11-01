import React, {useEffect,useState} from 'react'
import TableRow from '../TableRow/TableRow.js'
import './Table.module.css'


const Table = ({selectedList ,filteredList ,handleDelete, checkBoxHandler, handleSave,checkAllHandler}) => {
  
    const [checkedAll,setCheckedAll]=useState(false)

    const compareList=()=>{
        let cnt=0
        filteredList.forEach((item)=>{
            if(selectedList.includes(item.id)){
               cnt++
            }
        })
        if(cnt===filteredList?.length && cnt!==0){
            setCheckedAll(true)
            return 
        }
        setCheckedAll(false)
        return 
    }
    
    useEffect(()=>{
        compareList()
    })
    
    
    return  (
        // <table style={{width:"80%", textAlign: "center"}}>
        <table>
        <thead>
            <tr>
                <th>
                    <input
                        onChange={(e)=>checkAllHandler(e)}
                        checked={checkedAll} 
                        type="checkbox"
                    />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        {  filteredList?.length===0? <tr><td colSpan={"5"}>No record found</td></tr>: filteredList.map((item)=>{
            return <TableRow  key={item.id} selectedList={selectedList} item={item} handleDelete={handleDelete} checkBoxHandler={checkBoxHandler} handleSave={handleSave}/>
        })}
        </tbody>
    </table>
        
)
}

export default Table