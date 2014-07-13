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
    console.log('you clicked?')
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
            // characterAPI = 'http://www.comicvine.com/api/character'
            // resource = "/4005-"
            // heroFields = "&field_list=name,id,count_of_issue_appearances,image,deck,character_enemies,character_friends,powers,teams"
            // heroLink = "<a href='"+ characterAPI + resource + id + api_key+ format + heroFields +"'>" + name + " " + issues+"</a>"
            //heroLink = "<a href='#'>" + name + " " + issues +"</a>"
            $link = $("<li>").addClass("hero")
            $link.attr('value', id)
            $link.html(heroLink).appendTo("#characterData")
          })//feed.each loop
        }//end success function
    })//ajax call
  })//onclick function

  $('.submit').on('click', function (e){
     e.preventDefault();
     console.log("You clicked me!")
     $("#characterStats").html("")


    var api = 'http://www.comicvine.com/api/character';
    var api_key = "/?api_key=c449b6dfe0d7bc76f14627f06f9ba2b2adb532b5";
    var format = "&format=json"
    var resource = "/4005-"
    var id = this.value
    var heroFields = "&field_list=name,id,count_of_issue_appearances,image,deck,character_enemies,character_friends,powers,teams"
    var requri = api + api_key + format + resource + id + heroFields
    console.log(requri)
    $.ajax({
        type: 'get',
        url: '/comicchar',
        data: {url: requri},
        dataType: 'json',
        success: function(data){
          console.log(data)
        }//end success fnction
    })//ajax call
  })//heroClicks
});//onload function









