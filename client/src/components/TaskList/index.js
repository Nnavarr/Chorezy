// import React from "react";

// function TaskList(props) {
//   return (
//     <div>
//       <div className="columns is-desktop is-justify-content-center is-flex-wrap-wrap is-flex-direction-row">
//         {props.tasks.map((task) => (
//           <div className="column is-half">
//             <div className="card">

//               <div className="card-image">
//                 <figure className="image is-4by3">
//                   <a href={task.live} target="_blank" rel="noreferrer">
//                     <img src={process.env.PUBLIC_URL + task.image} alt="Placeholder image" />
//                   </a>
//                 </figure>
//               </div>

//               <div className="card-content">

//                 <div className="media">
//                   <div className="media-left"></div>
//                   <div className="media-content">
//                     <p className="title is-4" key={task.id}>
//                       {task.title}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="content has-text-left">
//                   {task.description}
//                   <br />
//                   <br />

//                   <div className="card">
					  
//                     <footer className="card-footer">
//                       <a
//                         href={task.repo}
//                         className="card-footer-item"
//                         target="_blank" rel="noreferrer"
//                       >
//                         good job
//                       </a>
//                       <br />
//                     </footer>
//                   </div>

//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default TaskList;