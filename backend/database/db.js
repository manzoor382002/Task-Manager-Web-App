const sqlite3=require('sqlite3').verbose();
const db=new sqlite3.Database('./taskmanager.db',(err)=>{
  if(err) console.log(err.message);
  console.log("Connected to SQLite DB");
});

db.run(`CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending'
)`);

module.exports=db;