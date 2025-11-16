import React,{useEffect,useState} from "react";

function App(){
  const [tasks,setTasks]=useState([]);
  const [form,setForm]=useState({title:"",description:""});

  const loadTasks=async()=>{
    const res=await fetch("http://localhost:5000/api/tasks");
    const data=await res.json();
    setTasks(data);
  };

  useEffect(()=>{ loadTasks(); },[]);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    await fetch("http://localhost:5000/api/tasks",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({...form,status:"pending"})
    });
    setForm({title:"",description:""});
    loadTasks();
  };

  return (
    <div style={{padding:"20px"}}>
      <h1>Task Manager</h1>

      <form onSubmit={handleSubmit}>
        <input placeholder="Task Title" value={form.title}
          onChange={e=>setForm({...form,title:e.target.value})}/><br/><br/>
        <textarea placeholder="Description" value={form.description}
          onChange={e=>setForm({...form,description:e.target.value})}/><br/><br/>
        <button type="submit">Add Task</button>
      </form>

      <h2>Tasks</h2>
      {tasks.map(task=>(
        <div key={task.id} style={{border:"1px solid #ccc",padding:"10px",marginTop:"10px"}}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <small>Status: {task.status}</small>
        </div>
      ))}
    </div>
  );
}
export default App;