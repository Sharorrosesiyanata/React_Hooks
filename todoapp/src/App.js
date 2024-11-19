import React, { useState } from 'react';
import { AiFillAlipayCircle } from 'react-icons/ai';
import ToDo from './ToDo'
//AiFillBell,
const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#F08080] to-[#FA8072]`
}


function App() {
  const [todos, setTodos] = useState(['Do the shopping', 'Cook dinner'])
  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 classname={style.heading}>To Do Application</h3>
        <form className={style.form}>
          <input className={style.input} type="text" placeholder='Add To Do' />
          <button className={style.button}><AiFillAlipayCircle size={50} /></button>
        </form>
        <ul>
          {todos.map((todo) =>()
        )}
          <ToDo />
        </ul>
      </div>
    </div>
  );
}

export default App;
