
import './App.css';
import React, { useEffect, useState } from 'react'


function App() {
  const [info,setInfo]=useState([]);
  const [allinfo,setAllinfo]=useState([])
  const [page,setpage]=useState(1)

 
  const changepage=(number)=>{
    console.log(number)
    if(number===-1 &&page===1)return;
    setpage(page+number);
    
  }
  const fetchdata=async ()=>{
    let url='https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';
    try{
      let response=await fetch(url);
      const data=await response.json();
      let displaydata=data.slice(0,10)
      setAllinfo(data)
      setInfo(displaydata)
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{
    fetchdata()
  },[])

  useEffect(()=>{
    let start=(page-1)*10;
    let end=(page)*10;
      let data=allinfo.slice(start,end)
      setInfo(data)
  },[page])


  return (
    <div className="App">
     <h1>Employee Data Table</h1>
     <div className='tabel'>
    
     <table style={{width:'100%',height:'550px'}}>
      <thead style={{backgroundColor:'green'}}>
        <tr style={{color:'white'}}>
          <th style={{width:'5%'}} >ID</th>
          <th style={{width:'25%'}} >Name</th>
          <th style={{width:'30%'}} >Email</th>
          <th style={{width:'30%'}}>Role</th>
        </tr>
      </thead>
      <tbody style={{height:'500px'}}>
        {info.length>= 1 ? info.map((e,ind)=>(
        <tr key={ind}> 
          <td >{e.id}</td>
          <td >{e.name}</td>
          <td >{e.email}</td>
          <td >{e.role}</td>
        </tr>)) :<tr><td>Waiting</td></tr>}
      </tbody>
     </table>
     </div>
     <div className="pagi">
      <button onClick={()=>changepage(-1)}>Previous</button>
      <button >{page}</button>
      <button onClick={()=>changepage(1)}>Next</button>
     </div>
    </div>
  );
}

export default App;
