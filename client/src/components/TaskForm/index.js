import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_TASK } from "../../utils/mutations";
import { QUERY_TASKS, QUERY_USER, QUERY_ME } from '../../utils/queries';

const TaskForm = () => {
  const [taskText, setText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [addTask, { error }] = useMutation(ADD_TASK, {
    update(cache, { data: { addTask } }) {
      try {
        // could potentially not exist yet, so wrap in a try...catch
        const { tasks } = cache.readQuery({ query: QUERY_TASKS });
        cache.writeQuery({
          query: QUERY_TASKS,
          data: { tasks: [addTask, ...tasks] }
        });
      } catch (e) {
        console.error(e);
      }
  
      // update me object's cache, appending new task to the end of the array
      const { user } = cache.readQuery({ query: QUERY_USER });
      cache.writeQuery({
        query: QUERY_USER,
        data: { user: { ...user, tasks: [...user.tasks, addTask] } }
      });
    }
  });

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add task to database
      await addTask({
        variables: { taskText },
      });

      // clear form value
      setText("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  
  return (
    <div>
      <p
        className={`m-0 ${characterCount === 280 || error ? "text-error" : ""}`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Add New Chore..."
          value={taskText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
