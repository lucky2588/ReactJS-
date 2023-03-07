import { useState } from 'react'
import './App.css'


function App1() {
  const [todo , SetTodo] = useState(''); // hàm để xử lí dữ liệu khi thay đổi ở ô Input 
  const [todos, SetTodos] = useState(["Item1","Item2","Item3"]); // khởi tạo ra hàm và render ra dần dần các giá trị của Item 
  const [display , setDisplay] = useState("True"); // khởi tạo  Điều Kiện để Swap display 
  const [message , setMess] = useState("Hide") // khởi tạo nội dung trong thẻ Button 

  const handlenBtnADD = ()=>{
    if(todo == "") {
      alert("Không đc để trống ") 
      return;
    }
   
    SetTodos(prev => [...prev,todo]);
    SetTodo('');
  }
  const handlenBtnRemove = () =>{
    const newList = [...todos];        // tạo 1 biến clone lại mảng Item cũ 
    newList.splice(newList.length-1,1); // xóa phần tử cuối 
    SetTodos(newList); // render lại list mới 
  }
  const HandleDisplay = ()=>{
       setDisplay(!display)
       display ? setMess("Show") : setMess("Hide")
  }
  
  return (
    <div className="App">
      <input type="text" placeholder='ADD Content Item' value={todo} 
      onChange={e => SetTodo(e.target.value)}
      />
      <button onClick={handlenBtnADD}>ADD</button>
      <button onClick={handlenBtnRemove}>Remove</button>
      <button onClick={HandleDisplay}>{message}</button>
      {display && <ul> 
          {todos.map((todoItem, index) => <li key={index}>{todoItem}</li>)}
        </ul>
      }
  
      
    </div>
  )
}

export default App1

