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
    let albumsHTML = '';

    // if there are no matching albums display "no albums found"
    if (response.albums.items.length === 0) {
      albumsHTML += "<li class='no-albums desc'>";
      albumsHTML += "<i class='material-icons icon-help'>help_outline</i>No albums found that match: ";
      albumsHTML += query + ".</li>";
    } else {  // otherwise show the albums
      $.each(response.albums.items, (index, album) => {
        albumsHTML += '<li>';
        albumsHTML += album.name;
        albumsHTML += '</li>';
      });  // end each album iteration
    }

    $('#albums').html(albumsHTML);
  };

  $.getJSON(spotifyAPI, spotifyOptions, displayAlbums);
});  // end form submit event
