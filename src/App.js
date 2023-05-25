// useState hooks: it is used to manage your state(data) in functional component
// import useState from'React
// Declare hooks at the top level
// useState = variable, updating function

// const count = useSate(intialvalue)
// import { useState } from 'react';
import './App.css';
import { useState } from 'react';

// state: data
// uncontrolled {useRef} vs controlled {useState}
// Local Storage --> getItem and setItem {object}

function App() {

  const data = localStorage.getItem('lists') ? JSON.parse(localStorage.getItem('lists')) : [];
  // JSON stringify: object[array] into string(local storage{string})
  // JSON parse: string-->object

  const [list,setList] = useState(data);
  const [newTask, setNewTask] = useState('');
  const [search,setSearch] = useState('');
  // console.log(list)

  const addtask = () => {
    localStorage.setItem('lists', JSON.stringify([...list, newTask]))
    setList([...list, newTask])
    setNewTask("")
    
    // setNewtask("")
    // console.log(newtask.current.value)
  }
  const deleteTask = (i) => {
    const delList = [...list];
    delList.splice(i,1);
    setList(delList)
    localStorage.setItem('lists', JSON.stringify(delList))
  }
  const updateTask = (e,i) => {
    const uptask = [...list];
    uptask.splice(i,1,e.target.value)
    setList(uptask)
    localStorage.setItem('lists', JSON.stringify(uptask))
  }
  const keyEnter = (e) => {
    if(e.key === "Enter"){
      addtask()
    }
  }

  return(
    <div className="App">

      <div className='search'>
        <input type='text' placeholder='Search Task 🔎' onChange={(e)=>{setSearch(e.target.value)}} />
      </div>

      <h1 className="heading">To-do App 🙌</h1>
      <div className="inputs">

        <input type= "text" onChange={(e)=>{ setNewTask(e.target.value) }} onKeyDown={keyEnter} value={newTask} />
        <button className='btn' onClick={addtask}>Add Task 👍</button>

      </div>
      <div className='container'>
        {
          list.map((val, i)=>{
            if(val.toLowerCase().includes(search.toLowerCase())){
              return(
                <div className='list' key={i}>
                  <input type='text' value={val} onChange={(e)=>{updateTask(e,i)}} />
                  <span className='icon' onClick={()=>{deleteTask(i)}}>❌</span>
                </div>
              )
            }
          })
        }
          
      </div>
    </div>
  );



  // const [count,setCount] = useState(0);
  // function inc(){
  //   console.log("Clicked");
  //   setCount( count + 1 )
  // }
  // function dec(){
  //   console.log("Clicked");
  //   setCount( count - 1 )
  // }
  // return (
  //   <center>
  //     <h1> Counter: {count} </h1>
  //     <button onClick={inc}> Increment </button>
  //     <button onClick={dec}> Drecrement </button>
  //   </center>
  // );
}

export default App;
