import React from 'react'
import "./App2.css";
import { useState } from 'react';
function App2() {
  const colors = [
    '#3498db',
    '#9b59b6',
    '#e74c3c',
    '#2c3e50',
    '#d35400',
  ]
  const [nowColors, setColor] = useState([...colors]);
 const moreBox = () =>{
   setColor([...nowColors, ...colors]);
 }
 function removeBox(index){
   const newList = [...nowColors];
   newList.splice(index,1);
   setColor(newList)
 }
  return (
    <>
      <h1> JS DOM</h1>
      <button id="btn" onClick={moreBox}>More boxes</button>
      <h4 id="score"> Total box:<span className="points"></span></h4>

      <div className="boxes">
         {
          nowColors.map((e,index) =>
            <div className='box' key={index} 
            style={{backgroundColor : e}} 
            onClick ={()=> removeBox(index) }
            >
            </div>
            ) 
         }
      </div>
    </>

  )












}

export default App2