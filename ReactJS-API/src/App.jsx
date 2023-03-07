
import reactLogo from './assets/react.svg'
import './App.css'
import { useState,useEffect } from 'react'

function App() {
   // Tạo ra 2 giá trị để render ra màn hình 
const [curentList , setList] = useState([]);
const [curentText , setText] = useState("");


useEffect(()=>{
  const fetchData = async ()=>{
    const data = await fetch("http://localhost:8083/todoApp/getList");
    const xData = await data.json();
    setList(xData);
  }
},[]);

 return (
  <>
   <ul>
    {
         curentList.map(e,index =>{
          <li>{e.id}</li>
         }
          )
    }
   </ul>
   </>
 )}

export default App
