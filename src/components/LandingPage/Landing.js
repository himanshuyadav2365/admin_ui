import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from '../Search/Search'
import config from '../config.json'
import Table from '../Table/Table.js'


const Landing = () => {
    
    const [tableData,setTableData]=useState([])
    const [filteredList,setFilteredList]=useState([])
    const [page,setPage]=useState(1)
    const [previousButton,setPreviousButton]=useState(true)
    const [nextButton,setNextButton]=useState(false)
    const [selected,setSelected]=useState([])
    


    useEffect(()=>{
        fetchTableData()     
    },[])

    

    let st=page*config.pageSize-config.pageSize
    let end=page*config.pageSize
    
    

    const searchHandler=(text)=>{
        const filteredData=tableData.filter((item)=>{
            return item.name.includes(text) || item.email.includes(text) || item.role.includes(text)
        })
        console.log(filteredData)
        setFilteredList(filteredData)
        setPage(1)
        setPreviousButton(true)
        if(Math.ceil(filteredData.length/config.pageSize)===1){
            setNextButton(true)
        }   
        else{
            setNextButton(false)
        } 
         
    }
    
    const fetchTableData= async ()=>{
        const data=await axios.get(config.apiEndpoint)
        setTableData(data.data)
        setFilteredList(data.data)
        
    }
    let arr=new Array
    for(let i=1;i<=Math.ceil(filteredList.length/config.pageSize);i++){
        arr.push(i) 
    }

    const pageChange=(index)=>{
        checkNavigationButton(index)
        setPage(index)
    }
   

    const checkNavigationButton=(index)=>{
        if(index==1){
            setPreviousButton(true)  
          }
          else{
              setPreviousButton(false)
          }
          if(index==Math.ceil(filteredList.length/config.pageSize)){
              setNextButton(true)   
          }
          else{
              setNextButton(false)
          }
    }
   

    const handleDelete=(id)=>{
        const newList =filteredList.filter((item)=>{
            return item.id!==id
        })
        console.log(id)
        setFilteredList(newList)
        setTableData(newList)
    }
    
    
    const checkBoxHandler=(value,checked)=>{
        if(checked){
            setSelected([...selected,value])
        }
        else{
            const arr=selected.filter((item)=>{
                return item!==value   
            })
            setSelected(arr)
        }
        
    }

    const deleteSelected=async ()=>{
            const arr=filteredList.filter((item)=>{
                return !selected.includes(item.id)
            })
            setFilteredList(arr)
            setSelected([])
            
    }
    

    const handleEdit=(id,user)=>{
        let editedList=filteredList.map((item)=>{
            if(item.id==id){
                return {...item,...user}
            }
            else{
                return item
            }
        })
    
        setFilteredList(editedList)
    }

    const checkAllHandler=(e)=>{
        // console.log(e)
        const arr=filteredList.slice(st,end).map((item)=>{
            return item.id
        })
        console.log(arr)
        if(e.target.checked){
            
            setSelected([...selected,...arr])
        }
        else{
            const res=selected.filter((item)=>{
                return !arr.includes(item)
            })
            setSelected(res)
        }
       
    }

  return(
      <>
        <Search handler={searchHandler} />
        <Table selectedList={selected} filteredList={filteredList.slice(st,end)} handleDelete={handleDelete} checkBoxHandler={checkBoxHandler} handleSave={handleEdit} checkAllHandler={checkAllHandler}/>
        {/* <table style={{width:"80%", textAlign: "center"}}>
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
        {filteredList.slice(st,end).map((item)=>{
            return <Table  selectedList={selected} item={item} handleDelete={handleDelete} checkBoxHandler={checkBoxHandler} handleSave={handleEdit}/>
        })}
        </tbody>
    </table> */}
        
        {/* {filteredList.slice(st,end).map((item)=>{
            return <Table key={item.id} selectedList={selected} item={item} handleDelete={handleDelete} checkBoxHandler={checkBoxHandler} handleSave={handleEdit}/>
        })} */}
        
        <div >
            <button onClick={deleteSelected}>Delete Selected</button>
            <button disabled={previousButton} onClick={()=>pageChange(1)}>First Page</button>
            <button disabled={previousButton} onClick={()=>pageChange(page-1)}>Previous Page</button>
          
            {arr.map((item,idx)=>{
                return <button key={idx} onClick={()=>pageChange(item)}>{item}</button>
                })
            }
            <button disabled={nextButton} onClick={()=>pageChange(page+1)}>Next Page</button>
            <button disabled={nextButton} onClick={()=>pageChange(Math.ceil(filteredList.length/config.pageSize))}>Last Page</button>
        </div>

        
     </>
    )
}

export default Landing