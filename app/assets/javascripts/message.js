$(document).on('turbolinks:load', function(){

  function buildHTML(message){
    var content = message.content ? `${message.content} ` : ''
    var image = message.image.url ? `<img src='${message.image.url}'> ` : ''

    var html = `<div class = "message" data-id=${message.id}>
                  <div class = "upper-message">
                    <div class = "upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class = "upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <p class = "lower-message__content">
                    ${content}
                    ${image}
                  </p>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $(".messages").animate({scrollTop:$('.messages')[0].scrollHeight});
      $('.form__message').val('');
      $(".form__submit").removeAttr("disabled");
    })
    .fail(function(){
      alert('error');
    })
  })

  var interval = setInterval(function() {
    if (location.href.match(/\/groups\/\d+\/messages/)){
      var message_id = $('.message').last().data('id');
      console.log(message_id);
      $.ajax({
        url: location.href,
        type: "GET",
        data: {id: message_id},
        dataType: "json"
      })
      .done(function(data) {
        data.forEach(function(message) {
          var html = buildHTML(message);
          $('.messages').append(html);
          $(".messages").animate({scrollTop:$('.main-contents__body__list')[0].scrollHeight});
        })
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    } else {
        clearInterval(interval);
      }
  } , 5000 );
});
