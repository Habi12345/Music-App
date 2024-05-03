const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const genreSelect = document.getElementById('music-genre');

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value;
  const genre = genreSelect.value;
  const apiUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=track&genre=${genre}`;

  fetch(apiUrl, {
    headers: {
      'Authorization': 'Bearer YOUR_SPOTIFY_ACCESS_TOKEN'
    }
  })
 .then(response => response.json())
 .then(data => {
    // Handle the search results here
    console.log(data);
  })
 .catch(error => {
    // Handle any errors here
    console.error(error);
  });
});

genreSelect.addEventListener('change', () => {
  searchInput.value = genreSelect.value;
});