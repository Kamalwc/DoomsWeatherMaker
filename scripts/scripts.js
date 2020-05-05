jQuery(document).ready(function () {
   var history = [];

   init();

   function init(){
      var storedHistory = localStorage.getItem('history');

      if (!localStorage.getItem('history')) {
         history = storedHistory;
      }

      renderHistory();
   }
    

    // render history of cities searched
    function renderHistory() {
       $('#city-history').html("");

       for (let i = 0; i < history.length; i++) {
         var historyLi = $('<li>' + history[i] + '</li>');
         historyLi.addClass('history-list');
         $('#city-history').append(historyLi);
      }
      
   }

   function storeHistory(){
      localStorage.setItem("history", JSON.stringify(history))
   }

   $('#search-button').on('click', function () {
      var city = $('#input').val();
      
      if (city === "" ) {
         $('#searchDiv').prepend('<p> you must enter a valid state</p>');
      }
      
      history.push(city);

      storeHistory();
      renderHistory();
      
     let url1 = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=be96177b800465cf4bbda5bf5b09acca';

      let lon, lat;

      //ajax call
      $.ajax({
         url: url1,
         method: 'GET'
      }).then(function (response) { 
         lat = response.coord.lat;
         lon = response.coord.lon;

         let url2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=be96177b800465cf4bbda5bf5b09acca';
            $.ajax({
               url: url2,
               method: 'GET'
            }).then(function (response) {
               console.log("response " + response);
               
               $('#city').html(city + ' (' + moment().format('MM/DD/YYYY') + ')');
               $('#temp').html("Temperature: " + response.current.temp + " F");
               $('#humidity').html("Humidity: " + response.current.humidity + "%");
               $('#wind-speed').html("Wind Speed: " + response.current.wind_speed + " MPH");
               $('#uv-index').html("UV Index: " + '<div class="uvnum">' + response.current.uvi + '</div>');
               let fiveDay = $('.five-day-forcast');
               for (let i = 0; i < 5; i++) {
                  $(fiveDay[i]).html('');
               }
               for (let i = 0; i < 5; i++) {
                  var dayForcast = response.daily[i];
                  var div = $('<div>');
                  $(fiveDay[i]).append('<p class="fivedy">' + ' (' + moment().add((i + 1).toString(),'days').format('MM/DD/YYYY') + ')' + '</p>');
                  $(fiveDay[i]).append('<p class="fivedy">' + response.daily[i].weather[0].main + '</p>');
                  $(fiveDay[i]).append('<p class="fivedy">' + response.daily[i].temp.day + '</p>');
                  $(fiveDay[i]).append('<p class="fivedy">' + response.daily[i].humidity + '</p>');
               }
               
            })
      })     
})
  
});