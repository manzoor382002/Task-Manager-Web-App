const db=require('../database/db');

exports.getTasks=(req,res)=>{
  db.all("SELECT * FROM tasks ORDER BY id DESC",[],(err,rows)=>{
    if(err) return res.status(500).json({message:err.message});
    res.json(rows);
  });
};

exports.createTask=(req,res)=>{
  const {title,description,status}=req.body;
  db.run("INSERT INTO tasks (title,description,status) VALUES (?,?,?)",
    [title,description,status],
    function(err){
      if(err) return res.status(500).json({message:err.message});
      res.json({id:this.lastID,title,description,status});
    });
};

exports.updateTask=(req,res)=>{
  const {id}=req.params;
  const {title,description,status}=req.body;
  db.run("UPDATE tasks SET title=?, description=?, status=? WHERE id=?",
    [title,description,status,id],
    function(err){
      if(err) return res.status(500).json({message:err.message});
      res.json({message:"Task updated"});
    });
};

exports.deleteTask=(req,res)=>{
  db.run("DELETE FROM tasks WHERE id=?", [req.params.id], function(err){
    if(err) return res.status(500).json({message:err.message});
    res.json({message:"Task deleted"});
  });
};