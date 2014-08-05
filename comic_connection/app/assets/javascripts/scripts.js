
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

function svgDisplay(character, cat) {
    categoriesDisplay(character)
    clearSVG()
    console.log("This is the character data " + character)
    switch(cat) {
      case "friends":
        $('.button').not('.friends').removeClass('buttonactive');
        $('.friends').addClass('buttonactive');
        data = JSON.stringify(character.character_friends)
        d3Display(data);
        break;
    case "enemies":
        $('.button').not('.enemies').removeClass('buttonactive');
        $('.enemies').addClass('buttonactive');
        data = JSON.stringify(character.character_enemies);
        d3Display(data, {colorGoal: 'OrangeRed' } );
        break;
    case "teams":
        $('.button').not('.teams').removeClass('buttonactive');
        $('.teams').addClass('buttonactive');
        data = JSON.stringify(character.teams)
        options = {};
        options.clickEvent = function powerClick(){ alert('boom') };
        d3Display(data, {colorGoal: '#1E90FF'});
        break;
    case "powers":
        $('.button').not('.powers').removeClass('buttonactive');
        $('.powers').addClass('buttonactive');
        data = JSON.stringify(character.powers)
        options = {};
        options.clickEvent = function powerClick(){ alert('boom') };
        d3Display(data, {colorGoal: 'gold'}, options);
        break;
    case "teamProfile":
        $('.button').not('.teams').removeClass('buttonactive');
        $('.teams').addClass('buttonactive');
        data = JSON.stringify(character.characters);
        options = {};
        d3Display(data, {colorGoal: '#1e90ff'}, options);
        category = "teams"
        break;
    case "powerProfile":
        $('.button').not('.powers').removeClass('buttonactive');
        $('.powers').addClass('buttonactive');
        data = JSON.stringify(character.characters);
        options = {};
        d3Display(data, {colorGoal: 'gold'});
        category = "powers"
        break;
    default:
        //Do nothing
    }//End switch
    return category;
}


var categoriesDisplay = function(data){
//build buttons and titles
    if (category === "teamProfile") {
        $('#characterStats').html("")
         $teams = $('<div>').addClass('button teams');
         $teams.html("<h2>Members</h2>")
         $($teams).appendTo('#characterStats')
    } else if (category === "powerProfile") {
        $('#characterStats').html("")
         $powers = $('<div>').addClass('button powers');
         $powers.html("<h2>Powered</h2>")
         $($powers).appendTo('#characterStats')
         data.image = "lightningbolt.jpeg"
    } else {
        $('#characterStats').html("")
        $friends = $('<div>').addClass('button friends')
        $enemies = $('<div>').addClass('button enemies')
        $teams = $('<div>').addClass('button teams')
        $powers = $('<div>').addClass('button powers')

    $friends.html("<h2>Friends</h2>")
    $enemies.html("<h2>Enemies</h2>")
    $teams.html("<h2>Teams</h2>")
    $powers.html("<h2>Powers</h2>")

    if (data.character_friends.length != 0){$($friends).appendTo('#characterStats')};
    if (data.character_enemies.length != 0){$($enemies).appendTo('#characterStats')};
    if (data.teams.length != 0){$($teams).appendTo('#characterStats')};
    if (data.powers.length != 0){$($powers).appendTo('#characterStats')};

   }
//populate screen
    $('#characterData').html('')

    //image
    $('<div>').attr('id', 'profile').appendTo("#characterData")
    $('<h1>').addClass('name').html(data.name).appendTo('#profile')
    if (data.image === undefined) { data.image = "noImage.jpg"}
    $('<p>').appendTo('#profile')
    $('<img>').addClass('portrait').attr('src', data.image).appendTo("p")

    //deck
    if (data.deck === undefined){ data.deck = data.description}
    $('<p>').addClass('deck').html(data.deck).appendTo('#profile');

    //

    if (data.count_of_issue_appearances != undefined){
    $('<p>').addClass('appearances').html("Appearances: " + data.count_of_issue_appearances).appendTo('#profile')
    }
    if (data.publisher != undefined){
    $('<p>').addClass('publisher').html("Publisher: " + data.publisher.name).appendTo('#profile')
    }


}


function heroDetailApiGenerator(api){
    var api_key = "?api_key=c449b6dfe0d7bc76f14627f06f9ba2b2adb532b5";
    var format = "&format=json"
    var heroFields = "&field_list=name,publisher,count_of_issue_appearances,api_detail_url,image,deck,character_enemies,character_friends,powers,teams"
    var requri = api + api_key + format + heroFields
    return requri
}

function powerCharactersApiGenerator(api){
    var api_key = "?api_key=c449b6dfe0d7bc76f14627f06f9ba2b2adb532b5";
    var format = "&format=json"
    var heroFields = "&limit=500&field_list=name,description,characters"
    var requri = api + api_key + format + heroFields
    return requri
}

function teamCharactersApiGenerator(api){
    var api_key = "?api_key=c449b6dfe0d7bc76f14627f06f9ba2b2adb532b5";
    var format = "&format=json"
    var heroFields = "&field_list=name,deck,characters,image"
    var requri = api + api_key + format + heroFields
    return requri
}

function characterPresent(api){

//sub function
//databaseOrAPI(api)
//original//databaseOrAPI(character, api)

//     $.ajax({
//           url: '/record_check/',
//           data: {api_detail_url: api},
//           dataType: 'json',
//           success: function(data){
//             character = data.character

//             console.log("Pulling from paul's db")
//             databaseOrAPI(character, api)
//             }


//     })
 }

function characterData(api){


          if (api.indexOf("http://www.comicvine.com/api/power/") === 0)
          {
            console.log("Power clicked on: " + api )
            var requri = powerCharactersApiGenerator(api)
            category = "powerProfile"
          }
          else if (api.indexOf("http://www.comicvine.com/api/team/") === 0)
          {
            console.log("Team clicked on: " + api )
            var requri = teamCharactersApiGenerator(api)
            category = "teamProfile"
          }
          else
          {
            var requri = heroDetailApiGenerator(api)
          }

          console.log("This is the api request " + requri)
              $.ajax({
                type: 'get',
                url: '/data_request',
                data: {url: requri},
                dataType: 'json',
                success: function(data){

                  data.character_id = data.id;
                  if (data.image != undefined) {data.image = data.image.medium_url;}
                  console.log("This is the result of the ajax api call" + data)
                  svgDisplay(data, category);
                    $.ajax({
                        type: "POST",
                        url: "/character",
                        data: {character: data}
                    })//end ajax POST
                }//end success fnction
              })//ajax call
} //end of database or api

//var category;

$(function(){
    //global declaration of category, this will act like a radio button, switching when buttons are clicked.
    category = "friends";



//Get character DATA
$(document).on('click', '.hero', function (e){

    e.preventDefault();
    characterAPI = this.getAttribute('text');
    console.log("This is the character api " + characterAPI)
    characterData(characterAPI);

})//characterButtonClick

$(document).on('click', '.friends', function (e){
    e.preventDefault();
    category = "friends";
    $('.friends').addClass('buttonactive')
    characterData(characterAPI);
})

$(document).on('click', '.enemies', function (e){
    e.preventDefault();
    category = "enemies";
    characterData(characterAPI);
})

$(document).on('click', '.teams', function (e){
    e.preventDefault();
    category = "teams";
    characterData(characterAPI);
})

$(document).on('click', '.powers', function (e){
    e.preventDefault();
    category = "powers";
    characterData(characterAPI);
})

//_______________________

//GET DATA AFTER CHOOSING CHARACTERS
  $('.search').on('submit', function (e){
    e.preventDefault();

    clearSVG()
    $("#characterData").html("")
    $("#characterStats").html("")

    $("<p>").html('Loading...').appendTo("#characterData")//add a cool spinner
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
                {image = "noImage.jpg"}
            else
                {image = feed[index].image.thumb_url}

            $characterLink = $('<div>')
            $characterLink.addClass('hero')
            $characterLink.attr('text', api_uri)
            $characterLink.html("<a href='#'><img src='"+ image +"'></br>"+ name + "</a></div>")
            $characterLink.appendTo("#characterData")

          })//feed.each loop
        }//end success function
    });//ajax call
  })//onclick function


});//onload function









