import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from '../Search/Search'
import URL from '../config'
import Table from '../Table/Table'



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


    let st=page*10-10
    let end=page*10
    

    const searchHandler=(text)=>{
        const filteredData=tableData.filter((item)=>{
            return item.name.includes(text) || item.email.includes(text) || item.role.includes(text)
        })
        console.log(filteredData)
        setFilteredList(filteredData)
        setPage(1)
        setPreviousButton(true)
        if(Math.ceil(filteredData.length/10)===1){
            setNextButton(true)
        }   
        else{
            setNextButton(false)
        } 
         
    }
    
    const fetchTableData= async ()=>{
        const data=await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
        setTableData(data.data)
        setFilteredList(data.data)
        
        
    }
    let arr=new Array
    for(let i=1;i<=Math.ceil(filteredList.length/10);i++){
        arr.push(i) 
    }

    const pageChange=(index)=>{
        checkNavigationButton(index)
        setPage(index)
    }
    console.log("hello",filteredList)

    const checkNavigationButton=(index)=>{
        if(index==1){
            setPreviousButton(true)  
          }
          else{
              setPreviousButton(false)
          }
          if(index==Math.ceil(filteredList.length/10)){
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
        console.log(checked)
        // let val=parseInt(value)
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
            
    }
    console.log(selected)

    const handleEdit=(id,user)=>{
        let editedList=filteredList.map((item)=>{
            if(item.id==id){
                return user
            }
            else{
                return item
            }
        })
        console.log("edit",editedList)
        setFilteredList(editedList)
    }
    // filteredList[0].name="himanshu"

  return(
      <>
        <Search handler={searchHandler} />
        {filteredList.slice(st,end).map((item)=>{
            // console.log(item)
            return <Table key={item.id} item={item} handleDelete={handleDelete} checkBoxHandler={checkBoxHandler} handleSave={handleEdit}/>
        })}
        
        <div >
            <button onClick={deleteSelected}>Delete Selected</button>
            <button disabled={previousButton} onClick={()=>pageChange(1)}>First Page</button>
            <button disabled={previousButton} onClick={()=>pageChange(page-1)}>Previous Page</button>
          
            {arr.map((item)=>{
                return <button onClick={()=>pageChange(item)}>{item}</button>
                })
            }
            <button disabled={nextButton} onClick={()=>pageChange(page+1)}>Next Page</button>
            <button disabled={nextButton} onClick={()=>pageChange(Math.ceil(filteredList.length/10))}>Last Page</button>
        </div>

        
     </>
    )
}

export default Landing