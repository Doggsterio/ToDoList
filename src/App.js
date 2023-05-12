import React from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = React.useState([]);
  const [task, setTask] = React.useState("");
  const [taskEditing, setTaskEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");


  function handleSubmit(event) {
    event.preventDefault();

    if(task.trim() == '') {
      return;
    }

    const newTask = {
      id: new Date().getTime(),
      text: task,
      isCompleted: false,
    };

    setTasks([...tasks].concat(newTask));
    setTask("");
  }

  function deleteTask(taskId) {
    let updatedTasks = [...tasks].filter((task) => task.id !== taskId);

    setTasks(updatedTasks);
  }

  function switchOnComplete(taskId) {
    let updatedTasks = [...tasks].map((task) => {
      if (task.id === taskId) {
        task.isCompleted = !task.isCompleted;
      }
      return task;
    });

    setTasks(updatedTasks);
  }

  function submitEdits(taskId) {
    const updatedTasks = [...tasks].map((task) => {
      if (task.id === taskId) {
        task.text = editingText;
      }

      return task;
    });

    setTasks(updatedTasks);
    setTaskEditing(null);
  }

  return (
    <div id="todo-list">
      <h1>TODO List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(event) => setTask(event.target.value)}
          value={task}
        />
        <button id="add-task" type="submit">Add Task</button>
      </form>

      {tasks.map((task) => (
        <div key={task.id} className="task">
          <div className="task-text">
            <input
              type="checkbox"
              id="completed"
              checked={task.isCompleted}
              onChange={() => switchOnComplete(task.id)}
            />

            {task.id === taskEditing ? (
              <input
                type="text"
                onChange={(event) => setEditingText(event.target.value)}
              />
            ) 
            :(<div>{task.text}</div>)}
          </div>
          
          <div className="task-actions">
              {task.id === taskEditing ? 
              (<button onClick={() => submitEdits(task.id)}>Submit</button>) 
              :(<button onClick={() => setTaskEditing(task.id)}>Edit</button>)}

              <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>

        </div>
      ))}
    </div>
  );
};

export default App;