import { useEffect, useState } from "react";
import axios from "axios";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const API = "http://localhost:5000/api/tasks";

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;

    await axios.post(API, {
      title,
    });

    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  const toggleTask = async (task) => {
    await axios.put(`${API}/${task._id}`, {
      completed: !task.completed,
    });

    fetchTasks();
  };

  return (
    <div className="container">
      <h1>MERN Todo App</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={addTask}>Add</button>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        tasks.map((task) => (
          <div className="task" key={task._id}>
            <span className={task.completed ? "completed" : ""}>
              {task.title}
            </span>

            <div>
              <button className="complete-btn" onClick={() => toggleTask(task)}>
                ✓
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTask(task._id)}
              >
                ✕
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Todo;
