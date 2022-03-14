const { json } = require('express');
const express = require('express');
const app=express();
const https=require("https");
const bodyParser= require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const query=req.body.cityname;
    const id="3a846cd2ce02cee48386cdf10e9adabc";
    const units="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+id+"&units="+units
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherdata=JSON.parse(data);
            const temp=weatherdata.main.temp;
            const weatherdescription=weatherdata.weather[0].description;
            res.write("<p>The Weather is currently "+weatherdescription+"</p>")
            res.write("<h1>the temperature is "+temp+"</h1>");
            res.send();
        })
    })
})

app.listen(3000,function(){
    console.log("server has started");
})




