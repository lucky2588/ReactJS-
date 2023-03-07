
import reactLogo from './assets/react.svg'
import './App.css'
import { useState, useEffect } from 'react'
function App() {
  // Tạo ra 2 giá trị để render ra màn hình 
  const [curentList, setList] = useState([]);
  const [curentText, setText] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://localhost:8083/todoApp/getList");
      const xData = await data.json();
      setList(xData);
    }
    fetchData();
  }, [curentList]);

  const handlenBtnAdd = async () => {
    if (curentText == "") {
      return;
    }
    fetch('http://localhost:8083/todoApp/addTodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: curentText }),
    })
      .then((res) => res.json())
      .then((data) => {
        setList([...curentList, ...data])
        setText('');
      })
      .catch((err) =>
        console.log(err));
  }
  const handlenBtnRemove = (index) => {
    fetch(`http://localhost:8083/todoApp/removeTodo/${index}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => res.json())
      .then(
        (data) => setList([data])
      )
      .catch(err =>
        console.log(err)
      )
  }
  const handlenBtnEdit = async (index, e) => {
    setText(e)
    if (curentText == "") {
      return;
    }
    fetch(`http://localhost:8083/todoApp/editTodo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify({
        id: index,
        title: curentText
      }),
    })
      .then((res) => res.json())
      .then(
        (data) => setList([data])
      )
      .catch(err =>
        console.log(err)
      )
  }
  return (
    <>
      <h2>Todo App </h2>
      <input type="text" value={curentText} placeholder=" Your Text ..." onChange={e => setText(e.target.value)} />
      <button onClick={handlenBtnAdd} style={{ backgroundColor: "coral" }}>ADD </button>
      <ul>
        {
          curentList.map((e, index) => (
            <li key={index} style={{ liststyle: "none" }}>
              <input type="radio" />
              <span>{e.title}</span>
              <button onClick={() => handlenBtnEdit(index, e.title)} style={{ backgroundColor: 'blueviolet' }}>Edit</button>
              <button onClick={() => handlenBtnRemove(index)} style={{ backgroundColor: "bisque" }}>Remove</button>
            </li>
          )
          )
        }
      </ul>



    </>
  )
}

export default App
