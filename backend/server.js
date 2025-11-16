const express=require('express');
const cors=require('cors');
const tasksRoute=require('./routes/tasks');

const app=express();
app.use(express.json());
app.use(cors());

app.use('/api/tasks', tasksRoute);

app.listen(5000,()=>console.log('Server running on port 5000'));