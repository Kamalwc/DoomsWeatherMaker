jQuery(document).ready(function () {
   // alert("success");
   // var userInput = $("#input");
   // var history = [];
   // var storedHistory; // holds history in local storage 


   // if (!localStorage.getItem('history')) {
   //    storedHistory = localStorage.setItem('history', JSON.stringify(history));
   // }

   $('button').on('click', function () {
      // var inputTxt = $('#input');

      // if ( inputTxt.val() === "" ) {
      //    $('#searchDiv').prepend('<p> you must enter a valid state</p>');
      // }

      // history.push(inputTxt.val());
      // localStorage.setItem('history', JSON.stringify(history));
      var lat = '149.4';
      var lon = '64.2';
      var key = '';
      var queryUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat={' + lat +'}&lon={' 
      + lon + '}&appid={' + key + '}';
      
      //ajax call 
      $.ajax({
         url: queryUrl,
            method: 'GET'
      }).then(function (resp) {

         console.log(resp);
         
         // $('#current-forecast').append($('<h3>'+ city + currentDate + '</h3>'));
         // $('#current-forecast').append($('<p>'+ 'Temperature:' + temperature + '</p>'));
         // $('#current-forecast').append($('<p>'+ 'Humidity:' + humiditity + '</p>'));
         // $('#current-forecast').append($('<p>'+ 'Wind Speed:' + windSpeed + '</p>'));
         // $('#current-forecast').append($('<p>'+ 'UV Index:' + UvIndex + '</p>'));
         })
   })

   // // render history of cities searched
   // function renderHistory() {
   //    for (let i = 0; i < storedHistory.length; i++) {
   //       var historyLi = $('<li>' + storedHistory[i] + '</li>');
   //       $('#city-history').append(historyLi);
   //    }
   // }

   // renderHistory();


});