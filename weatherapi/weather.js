var city=document.getElementById("city");
var apikey="9ec008b853fa54f3a7d9c1f429ad9075";
function searchweather(){
    var cityname=city.value;
    if(!cityname){
        return;
    }
    else{
        console.log(cityname);
        const search_key="https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid="+apikey;
       fetchall(search_key);
        city.value='';
    }
}
function getuserloc(){
    navigator.geolocation.getCurrentPosition(
        position => {
            const {latitude,longitude}=position.coords;
            const locurl=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
            fetchall(locurl);
    
        },
        error=>{
            if(error.code==error.PERMISSION_DENIED){
                alert("please allow access to your location");
            }
        }
    );
}
function fetchall(locdata){
    fetch(locdata).then((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data);
         if(data.cod !='404'){
            const { name }=data;
            const {icon,description}=data.weather[0];
            const {temp,humidity}=data.main;
            const {speed}=data.wind;
            document.getElementById("name").innerText=name;
            document.getElementById("temp").innerText=(temp-273).toFixed(2)+" °C";
            document.getElementById("humid").innerText=humidity+"%";
            document.getElementById("wind").innerText=speed+" M/S";
            document.getElementById("icon").src="https://openweathermap.org/img/wn/"+icon+".png";
            document.getElementById("description").innerText=description;
        }else{
            document.getElementById("name").innerText="city not found";
        }
    });

}