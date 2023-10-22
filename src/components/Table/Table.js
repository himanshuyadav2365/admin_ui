import React, {useEffect,useState} from 'react'
import TableRow from '../TableRow/TableRow.js'
const Table = ({selectedList ,filteredList ,handleDelete, checkBoxHandler, handleSave,checkAllHandler}) => {
  
    const [checkedAll,setCheckedAll]=useState(false)

    const compareList=()=>{
        // let ar=filteredList.map((i)=>i.id)
        let cnt=0
        filteredList.forEach((item)=>{
            if(selectedList.includes(item.id)){
               cnt++
            }
        })
        if(cnt===filteredList.length){
            setCheckedAll(true)
            return 
        }
        setCheckedAll(false)
        return 
    }
    
    useEffect(()=>{
        compareList()
    })
    console.log("filteredList>>>>",filteredList)
    
    return  (
        <table style={{width:"80%", textAlign: "center"}}>
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
        {filteredList.map((item)=>{
            return <TableRow  selectedList={selectedList} item={item} handleDelete={handleDelete} checkBoxHandler={checkBoxHandler} handleSave={handleSave}/>
        })}
        </tbody>
    </table>
        
)
}

export default Table