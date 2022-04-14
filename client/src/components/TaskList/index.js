import React from "react";
import { Link } from "react-router-dom";

const TaskList = ({ tasks, title }) => {

  console.log(tasks)
  if (!tasks.length) {
    return <h3 style={{ fontsize: '30px', fontcolor: '#5693c8', backgroundColor: 'white', border: '3px solid #f2f8b0'}}>🎉 No Chores Left! 🎉</h3>;
  }

  return (
    <div>
      <h2>{title}</h2>
      {tasks &&
        tasks.map((task) => (
          <div key={task._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${task.username}`}
                style={{ fontWeight: 700 }}
                className="text-secondary"
              >
                {task.username}
              </Link>{" "}
              {task.taskName}
            </p>
            <div className="card-body">
              <p id='taskCardDescription'>The task is worth {task.taskValue} points! 😄</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TaskList;

