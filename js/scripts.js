var cheney = '99004';
var spoValley = '99016';

$.simpleWeather({
    
    location: spoValley, // change zip
    unit: 'f',
    
    // Get _weather_ object
    success: function(weather) {
      
      // Get & store temperature
      var temp = weather.temp;
      // Get & store city
      var city = weather.city;
      // Get and store the state 
      var state = weather.region;
      // Get and store weather thumbnail
      var thumb = weather.thumbnail;
      
      
      // Output to hooks in HTML
      $('.temp').text(temp);
      $('.city').text(city);
      $('.region').text(state);

      /*the two values in "attr" are the ATTRIBUTE you want to set
      the second value we use is what we want to put in that atrribute
      the reason we used "thumb" instead of the image url, is because
      ^ above we created a variable called thumb, which gets the image
      because that syntax is already predefined by the actual plugin itself */
      $('.thumb img').attr('src', thumb)
      
      // See console for _weather_ object
      console.log(weather);
    },
  
    // if error
    error: function(error) {  
      $('body').html('<p>' + error + '</p>');
    }
  
  });