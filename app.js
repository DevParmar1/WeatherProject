const express=require("express");
const app=express();
const https=require("https");

const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");


});

app.post("/",function(req,res){


  const queries=req.body.cityName;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+queries+"&appid=8c5ba2d149bb949ab7554c0fcabef0ec&units=metric";
  https.get(url,function(response){
    console.log(response.statusCode);

  response.on("data",function(data){



    const weatherData=JSON.parse(data);
    const Temp=weatherData.main.temp;
    const desc=weatherData.weather[0].description;
    const icon=weatherData.weather[0].icon;
    const imgUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
    res.write("<h1>The current Temperature in "+queries+" is " +Temp+"</h1>");
    res.write("<p>Today's Weather description is "+desc+"</p>");
    res.write("<img src="+imgUrl+ ">");
    res.send();
  });
});
})

app.listen(3000,function(){console.log("Server is up and running.");});
