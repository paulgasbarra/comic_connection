
api_key = "/?api_key=c449b6dfe0d7bc76f14627f06f9ba2b2adb532b5"

$(function(){
  $('.submit').on('click', function(e){
      e.preventDefault();

      var api_key = "/?api_key=c449b6dfe0d7bc76f14627f06f9ba2b2adb532b5"
      var character = $('#charactername').val();
      var requri = 'http://www.comicvine.com/api/' + api_key + '/characters/'+ character;

  })

  $.ajax({
    url: 'http://www.comicvine.com/api/characters' + api_key,
    method: 'get',
    dataType: 'json',
    success: function(data)
  })
})
