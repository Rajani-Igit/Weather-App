
$( document ).ready(function() {
 function refresh() {    
  $.ajax({
    type: "GET",
    url: "https://ipinfo.io/json/",
    success: coordinates 
  });
  // coordinates callback function
  function coordinates(data) { //the coordinates set in the ajax call above turned into a function with data passed into it
    var coordinates = data.loc;
    var city = data.city;
    var region = data.region;
    var country = data.country;
   // console.log(data);
    //updating current city location details
     $("#city").text(city);
     $("#city").append(","+region+" ("+country+")");
   
    // Dark Sky API
    var darkSkyAPI =
      "https://api.darksky.net/forecast/73b160bb8e1e650cc78ffbc27d65b13d/"+coordinates;
     $.ajax({
      type: "GET",
      url: "https://api.darksky.net/forecast/73b160bb8e1e650cc78ffbc27d65b13d/" +
        coordinates +
        "?exclude=minutely,hourly,daily",
      dataType: "jsonp",
      success: weather
    });
    function weather(data) {
      console.log(data);
      var temp = Math.round(data.currently.temperature);
      var icon = data.currently.icon;
      var summary = data.currently.summary;
      var wind = data.currently.windSpeed;
      var area = data.currently.timezone;
      displayWeather(icon, temp, summary, wind,area);
    }
    // displayWeather (pass icon, temp, summary as arguments)
    function displayWeather(icon, temp, summary, wind,area) {
      //console.log(temp, icon, summary);
      var tempf = temp;
      var tempc = Math.round((temp - 32) * 5 / 9);
      var winds = Math.floor(wind);
     $("#area").text(area);
      $("#tempOfLoc").text(temp + "°F");
       $("#convert").on("click", function() {
         $("#tempOfLoc").html(tempc+ "°C");
      });
      $("#wind").text(winds + "mph");
      $("#summary").text(summary);

      var skycons = new Skycons({ color: "#ff9247" });
      skycons.add("icon", icon);
      skycons.play();
     
    
    } //end of displayWeather
  }//end of coordinate function
 }//end of refresh function
  refresh();
  $("#refresh").on("click",function(){
     refresh();
  });
});
  
  