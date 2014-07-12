function sortResponse(feed){
   feed.sort(function(a, b)
    {
        if (a.count_of_issue_appearances == b.count_of_issue_appearances)
            {return 0;}
        if (a.count_of_issue_appearances > b.count_of_issue_appearances)
        {
            return -1;
        }
        else
        {
            return 1;
        }
    });
 }

$(function(){
  $('.submit').on('click', function (e){

    e.preventDefault();
    $("#characterData").html("")
    $("<p>").html('Loading...').appendTo("#characterData")
    var api = 'http://www.comicvine.com/api/characters';
    var api_key = "/?api_key=c449b6dfe0d7bc76f14627f06f9ba2b2adb532b5";
    var format = "&format=json"
    var filter = "&filter=name:"
    var character = $('#characterName').val();
    var limit = "&limit=10"
    var fields = "&field_list=name,id,count_of_issue_appearances,image"

    var requri =  api + api_key + filter + character + limit + format + fields;

    console.log(requri);



    $.ajax({
        type: 'get',
        url: '/comicchar',
        data: {url: requri},
        dataType: 'json',
        success: function(feed){
          console.log(feed)
          $("#characterData").html("")

          sortResponse(feed);

          $(feed).each( function(index){
            name = feed[index].name
            issues = feed[index].count_of_issue_appearances
            id = feed[index].id
            idFilter = "&filter=id:"
            heroLink = "<a href='"+ api+ idFilter + id + api_key+"'>" + name + " " + issues+"</a>"
            //http://www.comicvine.com/api/character/4005-3628/
            $("<li>").html(heroLink).appendTo("#characterData")

          })

        }
    })

  })
});









