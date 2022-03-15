import React from "react";
// dumb component to write simple test

const Button = ({ onClick, buttonText }) => (
  <button onClick={onClick}>{buttonText}</button>
);


export default Button;


// const onSubmitting = (task) => {
//   const updatedMockList = {
//     name: selectedList.name,
//     tasks: selectedList.tasks.map((item) => {
//       if (item.id === task.id) {
//         return task;
//       } else {
//         return item;
//       }
//     })
//   };
//   if (method === 'add') {
//     task.id = Math.floor(Math.random() * 100)
//     updatedMockList.tasks = [...updatedMockList.tasks, task]
//   }
//   setSelectedList(updatedMockList);
//   setPage('listDetails');
// }