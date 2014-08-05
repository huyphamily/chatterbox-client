// YOUR CODE HERE:
var app = {

  server: 'https://api.parse.com/1/classes/chatterbox',

  init: function(){},

  send: function(message){
    $.ajax({
      // always use this url
      url: app.server,
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
      url: app.server,
      type: 'GET',
      data: {
        limit: 30,
        order: "-createdAt"
      },
      contentType: 'application/json',
      success: function (data) {
        var message = data.results;
        for(var i = 0; i < message.length; i++){
          message[i].username = app.tagCheck(message[i].username);
          message[i].text = app.tagCheck(message[i].text);
          $("#chats").append("<li>" + "<h4><b>" + message[i].username + ": </b></h4><font size = '3'> " + message[i].text + "</font></li>");
        }
       },
       error: function (data) {
         // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
         console.error('chatterbox: Failed to received message');
       }
    });
  },

  //check for script tags that can break your chat
  tagCheck: function(input){
    if(typeof input === "string"){
      var tagPosition = input.search("<script>");
      if( tagPosition !== -1 ){
        input = input.replace("<script>", "");
        input = input.replace("</script>", "");
      }
      for(var i = 0; i < input.length; i++){
        var character = input.charCodeAt(i);
        if(character > 222){
          input = input.replace(input[i], "");
        }
      }
      return input;
    }
  },

  clearMessages: function(){
    $("#chats").children().remove();
  },

  addMessage: function(message){
    $("#chats").append("<li>" + message.text + "</li>");
    app.send(message);
  }
};


/*

*/