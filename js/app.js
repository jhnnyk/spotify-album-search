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
    $('#album-deets').fadeOut();
    $('#albums').fadeIn();
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

// get album details
$('#albums').on('click', '.album-details', function(event) {
  event.preventDefault();
  const albumID = $(this).attr('id');
  const spotifyAlbumAPI = "https://api.spotify.com/v1/albums/" + albumID;
  const displayAlbum = (album) => {
    console.log(album);
    let albumHTML = '<h1>';
    albumHTML += album.name + '</h1>';
    albumHTML += '<a href="#" id="back-to-results">< Search results</a>';

    $('#albums').fadeOut();
    $('#album-deets').html(albumHTML);
    $('#album-deets').fadeIn();
  };

  $.getJSON(spotifyAlbumAPI, displayAlbum);
});  // end album details

$('.main-content').on('click', '#back-to-results', function() {
  $('#album-deets').fadeOut();
  $('#albums').fadeIn();
});
