// YOUR CODE HERE:
var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  init: function(){},
  send: function(message){
    $.ajax({
      // always use this url
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  },
  fetch: function(){
    $.ajax({
      url: this.server,
      type: 'GET',
      data: {
        limit: 20,
        order: "-createdAt"
      },
      contentType: 'application/json',
      success: function (data) {
        // console.log(data);
        for(var i = 0; i < data.results.length; i++){
          $("#chats").append("<li>" + data.results[i].text + "</li>");
        }
       },
       error: function (data) {
         // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
         console.error('chatterbox: Failed to received message');
       }
    });
  },
  clearMessages: function(){
  }
};

// $.get('https://api.parse.com/1/classes/chatterbox',
//   function(){
//     console.log(d);
//   }
// );

// function (e,r,i,o){
//   return b.isFunction(r)&&(o=o||i,i=r,r=t),
//   b.ajax(
//     {url:e,
//       type:n,
//       dataType:o,
//       data:function(r),
//       success:i
//     })} 


/*
$.getJSON("https://api.parse.com/1/classes/chats?order=createdAt",
              function(data){
                  var message = [];
                for(i=0; i < 10; i++) {
                  message[i] = data.results[i].text 
                }  
                var x = 0  
                  setInterval(function(){
                      display(message[x])
                      x++
                        if (x === 10){
                        x = 0}                  
                  }, 3000); 


                  var display = function(string){
              $(".messages").append("<li>" + string + "</li>")
          };    

*/
