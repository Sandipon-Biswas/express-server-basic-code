const express =require('express');
const cors =require('cors');
require('./config/db')
 const userRouter =require('./routers/book.route');
const app =express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use('/books', userRouter )
app.get('/',(req,res)=>{
    res.send("hello world")
});


app.use((req,res,next)=>{
    res.status(404).json({
        "message":"route not found"
    })
});

app.use((err,req,res,next)=>{
    res.status(500).json({
        "message":"something broke"
    })
});


module.exports=app;
