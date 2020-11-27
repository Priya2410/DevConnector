const express = require('express')

const app=express();
const PORT=process.env.PORT; //Looks for an environment variable PORT when deployed to heroku
app.get('/',function(request,response){
    response.send('API Running')
})
app.listen(5000,function(){
    console.log("Server started on ${PORT}");
});//Run locally on port 5000