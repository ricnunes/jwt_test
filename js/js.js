// JWT TEST //////////////////////////////////////
//////////////////////////////////////////////////
//Desired outputs:
//- Package of commented source code
//- Instructions for running the demonstration
////////////////////////////////////////////////// 
//Brief:
//Supplied is a RSS feed and a few images prepared
//for a parallax. We would like to see you create
//a parallax with these images and a transition 
//between the two scenes. The videos content 
//should be pulled in from the playlist and 
//display some thumbnails videos of the latest 
//videos over the scene image - a few selected 
//for each scene. These should play a preview as 
//you roll over them.
////////////////////////////////////////////////// 
//Resources:
//- Youtube playlist for JWT: 
//  http://www.youtube.com/playlist?list=PLuva1TiYu9SQ56uFO_ReYFv_Oczu2V3sG
//- As RSS feed: 
//  http://gdata.youtube.com/feeds/api/playlists/PLuva1TiYu9SQ56uFO_ReYFv_Oczu2V3sG
//- Attached images
//////////////////////////////////////////////////
// 1 - Convert RSS XML to JSON: http://gdata.youtube.com/feeds/api/playlists/PLuva1TiYu9SQ56uFO_ReYFv_Oczu2V3sG?v=1&alt=json
// 2 - Learn how the youtube API works and make it... work
// 3 - Get parallax going
//////////////////////////////////////////////////
// PS - I didn't understood some of the instructions, but I
//      did what I thought was the closest to what was intended.
//      Parallax animations aren't ideal, but my focus was on the
//      Youtube API. If you feel that I missed the "point", do tell
//      me and I will redo as you please. - For example, the hover
//      functionallity. I do hope that you look further into the
//      detail and research I did on JWT.
//////////////////////////////////////////////////
// Get Youtube Playlist as JSON and create a list with it

var playListURL = 'http://gdata.youtube.com/feeds/api/playlists/PLuva1TiYu9SQ56uFO_ReYFv_Oczu2V3sG?v=1&alt=json'; //Playlist
var videoURL= 'http://www.youtube.com/watch?v='; // Youtube watch link
var videoURLembed = 'http://www.youtube.com/embed/'; // Youtube embed link
$.getJSON(playListURL, function(data) {
    var list_data="";
    list_data += '<ul>'; // start list
    var playing="";
    $.each(data.feed.entry, function(i, item) { // Get items from JSOn
        var feedTitle = item.title.$t;
        var feedURL = item.link[1].href;
        var fragments = feedURL.split("/");
        var videoID = fragments[fragments.length - 2];
        var url = videoURL + videoID;
        var thumb = "http://img.youtube.com/vi/"+ videoID +"/default.jpg";
        list_data += '<li class="thumbnail" data-embed="' + videoID + '"><img alt="'+ feedTitle+'" src="'+ thumb +'"</li>';
    });
    list_data += '</ul>'; // end list
    $(list_data).appendTo("#video"); // Write to HTML

    // Get first list item and embed the video

    var playingVideo = $('.video li').attr('data-embed');
    var playingVideoImg = $('.video:first-child').find('img').attr('src');
    playing += '<iframe width="560" height="315" src="' + videoURLembed + playingVideo + '" frameborder="0" allowfullscreen></iframe>';
    $(playing).appendTo("#playerContainer"); // Write to HTML
});

// Change video on click

$("#video").on("click","li", function() {
    $("#playerContainer").html(); // Empty div with embed
    var playingVideo = $(this).attr('data-embed');
    playing = '<iframe width="560" height="315" src="' + videoURLembed + playingVideo + '" frameborder="0" allowfullscreen></iframe>';
    $("#playerContainer").html(playing); // Write to HTML
});

// Start Parallax
$(window).load(function(){
    var s = skrollr.init();
    $(window).scroll(function() {

    });
});