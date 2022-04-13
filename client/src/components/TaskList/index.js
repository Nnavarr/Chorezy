import React from "react";
import { Link } from "react-router-dom";

const TaskList = ({ tasks, title }) => {

  console.log(tasks)
  if (!tasks.length) {
    return <h3>🎉 No Chores Left! 🎉</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
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
              <Link to={`/task/${task._id}`}>
                <p>{task.taskText}</p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TaskList;

