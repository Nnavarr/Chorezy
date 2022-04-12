import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_TASK } from "../../utils/mutations";
import Form from 'react-bootstrap/Form';
import { QUERY_TASKS, QUERY_USER } from '../../utils/queries';

const TaskForm = () => {
  const [taskText, setText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [addTask, { error }] = useMutation(ADD_TASK)

  // const [addTask, { error }] = useMutation(ADD_TASK, {
  //   update(cache, { data: { addTask } }) {
  //     try {
  //       // could potentially not exist yet, so wrap in a try...catch
  //       const { tasks } = cache.readQuery({ query: QUERY_TASKS });
  //       cache.writeQuery({
  //         query: QUERY_TASKS,
  //         data: { tasks: [addTask, ...tasks] }
  //       });
  //     } catch (e) {
  //       console.error(e);
  //     }
  
  //     // update me object's cache, appending new task to the end of the array
  //     const { user } = cache.readQuery({ query: QUERY_USER });
  //     cache.writeQuery({
  //       query: QUERY_USER,
  //       data: { user: { ...user, tasks: [...user.tasks, addTask] } }
  //     });
  //   }
  // });

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // extract values from inputs
      const taskEl = document.getElementById('taskValue')
      const categoryEl = document.getElementById('taskCategory')

      let taskValue = taskEl.value;
      let taskCategory = categoryEl.value;
      taskValue = parseInt(taskValue);

      // // add task to database
      // await addTask({
      //   variables: { name: taskText, category: taskCategory, value: taskValue },
      // });

      // clear form value
      setText("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };


  // assign task

  return (
    <div>
      <h2>Chore List</h2>
      <p
        className={`m-0 ${characterCount === 280 || error ? "text-error" : ""}`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>

        {/* New Chore text name */}
        <textarea
          placeholder="Add New Chore..."
          value={taskText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
          id='taskName'
        ></textarea>

        {/* Chore Category */}
        <Form>
          <Form.Select aria-label="Default select example" id='taskCategory'>
            <option>Select Chore Category</option>
            <option value="backyard">Backyard</option>
            <option value="bathroom">Bathroom</option>
            <option value="frontyard">FrontYard</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Laundry">Laundry</option>
            <option value="Room">Room</option>
          </Form.Select>
        
          <Form.Select aria-label="Default select example" id='taskValue'>
            <option>Select Chore Value</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Select>
        </Form>
    
        <button className="btn col-12 col-md-3" type="submit" onClick={handleFormSubmit}>
          Create
        </button>        

    </div>
  );
};

export default TaskForm;
