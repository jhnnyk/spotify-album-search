const displayResults = () => {
  $('#album-deets').slideUp();
  $('.main-content').slideDown();
};

$('form').submit(function (evt) {
  evt.preventDefault();
  const searchField = $('#search');
  const query = searchField.val();
  const spotifyAPI = "https://api.spotify.com/v1/search";
  const spotifyOptions = {
    q: query,
    type: 'album'
  };
  const displayAlbums = (response) => {
    console.log(response);
    displayResults();
    let albumsHTML = '';

    // if there are no matching albums display "no albums found"
    if (response.albums.items.length === 0) {
      albumsHTML += "<li class='no-albums desc'>";
      albumsHTML += "<i class='material-icons icon-help'>help_outline</i>No albums found that match: ";
      albumsHTML += query + ".</li>";
    } else {  // otherwise show the albums
      $.each(response.albums.items, (index, album) => {
        albumsHTML += '<li><div class="album-wrap">';
        albumsHTML += '<a href="#" id="' + album.id + '" class="album-details">';
        albumsHTML += '<img class="album-art" src="';
        albumsHTML += album.images[0].url + '"></a></div>';
        albumsHTML += '<span class="album-title">';
        albumsHTML += album.name + '</span>';
        albumsHTML += '<span class="album-artist">';
        albumsHTML += album.artists[0].name + '</span>';
        albumsHTML += '<span class="spotify-link">';
        albumsHTML += '<a href="' + album.external_urls.spotify + '">';
        albumsHTML += '<img src="images/spotify-icon.png" alt="';
        albumsHTML += album.name + ' on Spotify"></a></span>';
        albumsHTML += '</li>';
      });  // end each album iteration
    }

    $('#albums').html(albumsHTML);
  };

  $.getJSON(spotifyAPI, spotifyOptions, displayAlbums);
});  // end form submit event

// show album details page
$('#albums').on('click', '.album-details', function(event) {
  event.preventDefault();
  const albumID = $(this).attr('id');
  const spotifyAlbumAPI = "https://api.spotify.com/v1/albums/" + albumID;
  const displayAlbum = (album) => {
    console.log(album);
    let albumHTML = '<div class="album-title-bar clearfix">';
    albumHTML += '<div class="inner">';
    albumHTML += '<div class="album-sidebar">';
    albumHTML += '<a href="#" id="back-to-results">< Search results</a></div>';
    albumHTML += '<div class="album-details-main">'
    albumHTML += '<h1><a href="' + album.external_urls.spotify + '">';
    albumHTML += album.name + ' (';
    albumHTML += parseInt(album.release_date) + ')</a></h1>';
    albumHTML += '<h3>' + album.artists[0].name + '</h3>';
    albumHTML += '</div></div></div>'

    albumHTML += '<div class="inner"><div class="album-sidebar">';
    albumHTML += '<a href="' + album.external_urls.spotify + '">';
    albumHTML += '<img src="' + album.images[0].url +'"';
    albumHTML += ' alt="' + album.name + '"></a>';
    albumHTML += '<span class="spotify-link">';
    albumHTML += '<a href="' + album.external_urls.spotify + '">';
    albumHTML += '<img src="images/spotify-icon.png" alt="';
    albumHTML += album.name + ' on Spotify"></a></span></div>';

    albumHTML += '<div class="album-details-main">'
    albumHTML += '<h4>track list:</h4>';
    albumHTML += '<ol>';
    $.each(album.tracks.items, (index, track) => {
      albumHTML += '<li>' + track.name + '</li>';
    });
    albumHTML += '</ol></div></div>';

    $('.main-content').slideUp();
    $('#album-deets').html(albumHTML);
    $('#album-deets').slideDown();
  };

  $.getJSON(spotifyAlbumAPI, displayAlbum);
});  // end album details

// back to search results link
$('body').on('click', '#back-to-results', function(e) {
  e.preventDefault();
  displayResults();
});
