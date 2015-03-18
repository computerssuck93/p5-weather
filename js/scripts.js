//var cheney = '99004';
//var spoValley = 99016;
var icon;
var zip;
var newZip;
var NZ = false;

$('#forecast').hide();

/**********************************************************************/
//Test if browser supports Geolocation

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
}
else{
    alert("Your browser does not support Geolocation!");
}

/**********************************************************************/

function locationSuccess(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

}

/**********************************************************************/

function locationError(error){
  switch(error.code) {
    case error.TIMEOUT:
      showError("A timeout occured! Please try again!");
      break;
    case error.POSITION_UNAVAILABLE:
      showError('We can\'t detect your location. Sorry!');
      break;
    case error.PERMISSION_DENIED:
      showError('Please allow geolocation access for this to work.');
      break;
    case error.UNKNOWN_ERROR:
      showError('An unknown error occured!');
      break;
  }
}

/**********************************************************************/

function showError(msg){
    $('.curLocation').addClass('error').html(msg);
}

/**********************************************************************/

$('#myLocation').on('click', function(){
  navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude+','+position.coords.longitude); 
  });
  $(this).css('display', 'none');

});

// $(window).load(function(){
//   navigator.geolocation.getCurrentPosition(function(position) {
//     loadWeather(position.coords.latitude+','+position.coords.longitude); 
//   });
// });


/**********************************************************************/

// $(document).ready(function() {



//   loadWeather('GreenAcres, WA', ''); //@params location, woeid
// });


$('form.newZip').submit( function(event){

  newZip = document.getElementById('ZipCode');
  //console.log($(newZip).val());
  NZ = true;
  event.preventDefault();
  loadWeather(newZip.value, '');
  

});

loadWeather('99016', '');

function loadWeather(location, woeid){

  $.simpleWeather({
    
    location: location,
    woeid: woeid,
    unit: 'f',
      
    // Get _weather_ object
    success: function(weather) {

      var altTemp = weather.alt.temp;
      var altUnit = weather.alt.unit;

      // Get & store temperature
      var temp = weather.temp;
      // Get & store city
      var city = weather.city;
      // Get & store the state 
      var state = weather.region;
      // Get & store weather thumbnail
      var thumb = weather.thumbnail;
      // Get & Store weather temp. unit
      var unit = weather.units.temp;
      // Get & Store the weather condition text
      var condition = weather.text;

      //console.log(zip)
      if(NZ == true){

        zip = newZip.value;
        $('#myLocation').css('display', 'none');
        console.log(zip);
      }

      $.get("http://ipinfo.io", function (response) {
        //$("#ip").html("IP: " + response.ip);
        //$("#address").html("Location: " + response.city + ", " + response.region);
        //$("#details").html(JSON.stringify(response, null, 4));
        //response.postal;   
        zip = response.postal;
        //console.log(zip);
      }, "jsonp");

      
      function getIcon(code){
      if(code == "0"){
        icon = "img/tornado.png";
      }
      if(code == "1" || code == "2"){
        icon = "img/hurricane.png";
      }
      if(code == "3" || code == "4" || code == "37" || 
        code == "38" || code == "39"){
        icon = "img/thunder.png";
      }
      if(code == "5" || code == "6" || code == "7" || 
        code == "35"){
        icon = "img/snowRain.png";
      }
      if(code == "8"){
        icon = "img/frzDrizzle.png";
      }
      if(code == "9" || code == "11" || code == "12" || 
        code == "40"){
        icon = "img/rain.png";
      }
      if(code == "10"){
        icon = "img/frzRain.png";
      }
      if(code == "13" || code == "15"){
        icon = "img/blowingSnow.png";
      }
      if(code == "14" || code == "16" || code == "42" || 
        code == "46"){
        icon = "img/snow.png";
      }
      if(code == "17" || code == "18"){
        icon = "img/hail.png";
      }
      if(code == "19"){
        icon = "img/dust.png";
      }
      if(code == "20"){
        icon = "img/foggy.png";
      }
      if(code == "21"){
        icon = "img/haze.png";
      }
      if(code == "22"){
        icon = "img/smoke.png";
      }
      if(code == "23" || code == "24"){
        icon = "img/windy.png";
      }
      if(code == "25"){
        icon = "img/cold.png";
      }
      if(code == "26"){
        icon = "img/cloudy.png";
      }
      if(code == "27"){
        icon = "img/mcldN.png";
      }
      if(code == "28"){
        icon = "img/mcldD.png";
      }
      if(code == "29"){
        icon = "img/pcldN.png";
      }
      if(code == "30"){
        icon = "img/pcldD.png";
      }
      if(code == "31"){
        icon = "img/clearNite.png";
      }
      if(code == "32"){
        icon = "img/sunny.png";
      }
      if(code == "33"){
        icon = "img/fairNite.png";
      }
      if(code == "34"){
        icon = "img/fairDay.png";
      }
      if(code == "36"){
        icon = "img/hot.png";
      }
      if(code == "41" || code == "43"){
        icon = "img/heavySnow.png";
      }
      if(code == "44"){
        icon = "img/partlyCld.png";
      }
      if(code == "45" || code == "47"){
        icon = "img/thundershowers.png";
      }
      if(code == "3200"){
        icon = "img/notAvailable.png";
      }
    }
      
      getIcon("" + weather.code)
      //console.log(thumb);

      /*the two values in "attr" are the ATTRIBUTE you want to set
      the second value we use is what we want to put in that atrribute
      the reason we used "thumb" instead of the image url, is because
      ^ above we created a variable called thumb, which gets the image
      because that syntax is already predefined by the actual plugin itself */
      $('.todayIcon').attr('src', icon);


      // Output to hooks in HTML
      $('.temp').text(temp + "° " + unit);
      $('.condition').text(condition);

      $('.zip').text(zip);
      $('.city').text(city + ", " + state);
      

      $('#day2 .day').text(weather.forecast[1].day);
       getIcon("" + weather.forecast[1].code);
      $('#day2 .dayIcon').attr('src', icon);
      $('#day2 .weekTemp').text(weather.forecast[1].low + "° low/ " + weather.forecast[1].high + "° high");
      $('#day2 .weekCondition').text(weather.forecast[1].text);

      $('#day3 .day').text(weather.forecast[2].day);
       getIcon("" + weather.forecast[2].code);
      $('#day3 .dayIcon').attr('src', icon);
      $('#day3 .weekTemp').text(weather.forecast[2].low + "° low/ " + weather.forecast[2].high + "° high");
      $('#day3 .weekCondition').text(weather.forecast[2].text);

      $('#day4 .day').text(weather.forecast[3].day);
       getIcon("" + weather.forecast[3].code);
      $('#day4 .dayIcon').attr('src', icon);
      $('#day4 .weekTemp').text(weather.forecast[3].low + "° low/ " + weather.forecast[3].high + "° high");
      $('#day4 .weekCondition').text(weather.forecast[3].text);

      $('#day5 .day').text(weather.forecast[4].day);
       getIcon("" + weather.forecast[4].code);
      $('#day5 .dayIcon').attr('src', icon);
      $('#day5 .weekTemp').text(weather.forecast[4].low + "° low/ " + weather.forecast[4].high + "° high");
      $('#day5 .weekCondition').text(weather.forecast[4].text);
      // See console for weather object
      console.log(weather);
    },
  
    // if error
    error: function(error) {  
      $('body').html('<p>' + error + '</p>');
    }
    
  });
}

/**********************************************************************/

function changeElementSize(){
    // Compare your element's aspect ratio with window's aspect ratio
    if (window.innerWidth/window.innerHeight > 2.95){
        //$('.todayIcon').css('height:','auto;');
        $('.todayIcon').css("width","50vmin");
    } else {
        $('.todayIcon').css("width","60%");
        //$('.todayIcon').css('height:','auto;');
    }
}

$( window ).resize(function() {
    changeElementSize();
});

$( window ).load(function() {
    changeElementSize();
});

/**********************************************************************/

$('#weekForecast').click( function(){

    $('#forecast').fadeToggle(1000);
});

/**********************************************************************/


// $('button.newZip').submit( function(){

//   var newZip = document.getElementById('ZipCode');
//   loadWeather(newZip.value, '');
//   //console.log(newZip.value)

// });
