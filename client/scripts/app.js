// YOUR CODE HERE:
var app = {

  server: 'https://api.parse.com/1/classes/chatterbox',

  roomname: "Lobby",

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

  onScreenMessages: {},

  fetch: function(){
    $.ajax({
      url: app.server,
      type: 'GET',
      data: {
        limit: 50,
        order: "-createdAt"
      },
      contentType: 'application/json',
      success: function (data) {
        console.log(data);
        //add data to messages prop for room filtering
        app.onScreenMessages = data.results;
        app.clearMessages();
        var message = data.results;
        for(var i = 0; i < message.length; i++){
          app.addMessage(message[i]);
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
      if(input.length > 140){
        input = input.slice(0,140);
      }
      var lower = input.toLowerCase();
      var tagPosition = lower.search("<script>");
      if( tagPosition !== -1){
        // input = input.replace("<script>", "");
        // input = input.replace("</script>", "");
        input = "INVALID INPUT";
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
    message.username = app.tagCheck(message.username);
    message.text = app.tagCheck(message.text);
    app.addRoom(message.roomname);

    $("#chats").append("<li>" + "<h4><b>" + message.username + ": </b></h4><font size = '3'> " + message.text + "</font></li>");
    
    // $(".roomList").on("click", function(){
    //   console.log("hello");
    // });
  },

  addRoom: function(room){
    room = app.tagCheck(room);
    if(typeof room === "string" && room.length > 0){
      room = room.toLowerCase();

      $("#roomSelect").append("<p><a href='#' class='roomList' id='"+ room +"'>" + room + "</a></p>");

      app.seen = {};

      $('.roomList').each(function() {
        var txt = $(this).text();
        if (app.seen[txt]){
          $(this).parent().remove();
        } else {
          app.seen[txt] = true;
        }
      });
    }
  },

  enterRoom: function(room){
    console.log(app.onScreenMessages);
    app.clearMessages();
    //for loop
    for ( var i = 0; i < app.onScreenMessages.length; i++ ){
    //intermediate variable 
    var messageObj = app.onScreenMessages[i];
    var objRoom = messageObj.roomname;
    objRoom = app.tagCheck(objRoom);
    if (objRoom === room){
      app.addMessage(messageObj);
    }

    }
    // if (messageObj.r)
  }
};


/*

*/