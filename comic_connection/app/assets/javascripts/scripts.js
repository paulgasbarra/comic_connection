
var displayList = function(list, el){
    $(list).each(function(index){
            var api_key = "?api_key=c449b6dfe0d7bc76f14627f06f9ba2b2adb532b5"
            var format = "&format=json"
            var fieldList = "&field_list=count_of_issue_appearances"


            //requri = list[index].api_detail_url + api_key + format + fieldList
            //console.log (requri)
            // $.ajax({
            //     type: 'get',
            //     url: '/comicchar',
            //     data: {url: requri},
            //     dataType: 'json',
            //        success: function(data){
            //             issues = data.results.count_of_issue_appearances
            //             console.log(issues)
            //         }
            // })


            listItemHTML = "<a href='#'>" + list[index].name + "</a>"
            $listItem = $('<li>').html(listItemHTML)
            $listItem.addClass("hero")
            $listItem.attr('text', list[index].api_detail_url)

            $listItem.appendTo(el)
        })
}

var heroDisplay = function(data){
    //name,id,count_of_issue_appearances,image,deck,character_enemies,
    //character_friends,powers,teams
    $('#characterStats').html("")
    $friends = $('<div>').addClass('friends')
    $enemies = $('<div>').addClass('enemies')
    $teams = $('<div>').addClass('teams')
    $powers = $('<div>').addClass('powers')

    $friends.html("<h2>Friends</h2>")
    $enemies.html("<h2>Enemies</h2>")
    $teams.html("<h2>Teams</h2>")
    $powers.html("<h2>Powers</h2>")


    enemies = data.character_enemies
    friends = data.character_friends
    teams = data.teams
    powers = data.powers


    $('#characterData').html('')
    $('<img>').addClass('portrait').attr('src', data.image.medium_url).appendTo("#characterData")
    $('<div>').html(data.name + ": " + data.deck).appendTo('#characterData')


    $($friends).appendTo('#characterStats')
    $($enemies).appendTo('#characterStats')
    $($teams).appendTo('#characterStats')
    $($powers).appendTo('#characterStats')

    displayList(enemies, '.enemies')
    displayList(friends, '.friends')
    displayList(teams, '.teams')
    displayList(powers, '.powers')

}

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

$(document).on('click', ".hero", function (e){
     e.preventDefault();

    var api = this.getAttribute('text')
    var api_key = "?api_key=c449b6dfe0d7bc76f14627f06f9ba2b2adb532b5";
    var format = "&format=json"
    var heroFields = "&field_list=name,count_of_issue_appearances,id,image,deck,character_enemies,character_friends,powers,teams"
    var requri = api + api_key + format + heroFields
    //http://www.comicvine.com/api/character/4005-4713/?api_key=c449b6dfe0d7bc76f14627f06f9ba2b2adb532b5&format=json&field_list=name,id,count_of_issue_appearances,image,deck,character_enemies,character_friends,powers,teams
    console.log(requri)

//if character exists pull data from there.

//if not pull it from comicvine


    $.ajax({
        type: 'get',
        url: '/data_request',
        data: {url: requri},
        dataType: 'json',
        success: function(data){
          heroDisplay(data);
          data.character_id = data.id;
          data.image = data.image.medium_url;
        $.ajax({
            type: "POST",
            url: "/character",
            data: {character: data}
         });
        }//end success fnction
    })//ajax call
  })//heroClicks
//_______________________


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
    var fields = "&field_list=name,count_of_issue_appearances,id,image,api_detail_url"

    var requri =  api + api_key + filter + character + limit + format + fields;

    console.log(requri);


    $.ajax({
        type: 'get',
        url: '/data_request',
        data: {url: requri},
        dataType: 'json',
        success: function(feed){
          console.log(feed)
          $("#characterData").html("")

          sortResponse(feed);

          $(feed).each( function(index){
            name = feed[index].name
            issues = feed[index].count_of_issue_appearances
            api_uri = feed[index].api_detail_url
            if (feed[index].image === null)
                {image = "images/noImage.jpg"}
            else
            {image = feed[index].image.thumb_url}
            heroLink = "<a href='#'>" + name + " " + issues + "</a>"
            $link = $("<li>").addClass("hero")
            $link.attr('text', api_uri)
            $link.html(heroLink).appendTo("#characterData")
            $('<img>').attr('src', image).appendTo("#characterData")
          })//feed.each loop
        }//end success function
    })//ajax call
  })//onclick function


});//onload function









