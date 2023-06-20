import React, { useState } from "react";
import './index.css';
import trash from './trash.svg'

const Edit = () => {
  return <svg width="30" height="30" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M18.5602 4.51911C19.2127 3.86658 20.0978 3.5 21.0206 3.5C21.4775 3.5 21.93 3.59 22.3521 3.76486C22.7742 3.93972 23.1578 4.19601 23.4809 4.51911C23.804 4.8422 24.0603 5.22578 24.2352 5.64792C24.41 6.07007 24.5 6.52253 24.5 6.97945C24.5 7.43638 24.41 7.88884 24.2352 8.31098C24.0603 8.73313 23.804 9.1167 23.4809 9.4398L22.1936 10.7271C21.738 11.1827 20.9993 11.1827 20.5437 10.7271L17.2729 7.45633C16.8173 7.00072 16.8173 6.26203 17.2729 5.80642L18.5602 4.51911ZM15.623 9.10625C15.1674 8.65064 14.4287 8.65064 13.9731 9.10625L5.84599 17.2333C5.0984 17.9809 4.56804 18.9177 4.31162 19.9433L3.53486 23.0504C3.43547 23.4479 3.55196 23.8685 3.84173 24.1583C4.13151 24.4481 4.55208 24.5646 4.94965 24.4652L8.05669 23.6884C9.08238 23.432 10.0191 22.9016 10.7667 22.154L18.8938 14.0269C19.3494 13.5713 19.3494 12.8326 18.8938 12.377L15.623 9.10625Z" stroke="#000" strokeLinecap="round" strokeLinejoin="round" />
    <path fillRule="evenodd" clipRule="evenodd" d="M14 23.3333C14 22.689 14.5223 22.1667 15.1667 22.1667L23.3333 22.1667C23.9777 22.1667 24.5 22.689 24.5 23.3333C24.5 23.9777 23.9777 24.5 23.3333 24.5L15.1667 24.5C14.5223 24.5 14 23.9777 14 23.3333Z" stroke="#000" strokeLinecap="round" strokeLinejoin="round" />
  </svg>

}

const ListItem = (props) => {
  return (
    <div className="list-item row jc-space-between">
      <span className={props.itemData.isComplete ? "task-complete" : ""} onClick={() => props.markComplete(props.index)}>{props.itemData.isComplete ? `✅ ` : ''}&nbsp;{props.itemData?.description}</span>
      <div className="manage-icons">
        <span onClick={() => props.editClicked(props.index)}><Edit /></span>
        <img className="delete-icon" src={trash} alt="" onClick={() => props.deleteTask(props.index)} />
      </div>
    </div>
  )
}

function App() {

  const [taskInput, updateTaskInput] = useState("");
  const [toDoList, updateToDoList] = useState([]);

  const addNote = () => {
    if (taskInput?.trim()?.length > 0) {
      toDoList.push({ description: taskInput, isComplete: false })
      updateToDoList(toDoList);
      updateTaskInput("")
    }
  }
  const inputKeyDown = (event) => {
    if (event.keyCode === 13)
      addNote();
  }
  const deleteTask = (index) => {
    const newList = toDoList.filter((item, i) => i !== index);
    updateToDoList(newList);
  }
  const markComplete = (index) => {
    const list = [...toDoList];
    list[index].isComplete = !list[index].isComplete;
    updateToDoList(list);
  }

  const editClicked = (index) => {
    const item = toDoList[index]
    let filtered = toDoList.filter((item, idx) => {
      return idx !== index
    })
    updateToDoList(filtered);
    updateTaskInput(item.description)
  }


  return (
    <div className="app-background">
      <p className="heading-text">React To Do List🔥</p>
      <div className="task-container">
        <div >
          <input type="text" className="text-input" value={taskInput} onKeyDown={inputKeyDown} onChange={(event) => updateTaskInput(event.target.value)} />
          <button className="add-button" onClick={addNote}>ADD</button>
        </div>
        {toDoList.length ? toDoList.map((toDoObject, index) =>
          <ListItem index={index} itemData={toDoObject} deleteTask={deleteTask} markComplete={markComplete} editClicked={editClicked} key={index} />
        ) : <p className="no-item-text">📌No Task Added !</p>}
      </div>
      <p className="footer-text"><a href="https://github.com/VBHARDWAJ09"> Vishal Bhardwaj</a></p>
    </div>
  );
}

export default App;

