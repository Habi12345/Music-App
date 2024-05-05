// Initialize the searched variable
let searched = '';

// Define the updateSearched function
const updateSearched = () => {
  // Get the search input value
  searched = document.getElementById('search-input').value;

  // Check if the search input value is empty or invalid
  if (!searched || searched === '') {
    alert('Invalid Input');
  } else {
    // Define the URL for the iTunes API
    const url = `https://itunes.apple.com/search?term=${searched}`;

    // Get the displaySongs element
    const displaySongs = document.getElementById('display-song');

    // Remove all child elements from the displaySongs element
    while (displaySongs.firstChild) {
      displaySongs.removeChild(displaySongs.firstChild);
    }

    // Fetch the data from the iTunes API
    fetch(url)
     .then((res) => res.json())
     .then((data) => {
        // Get the artist data from the API response
        const artist = data.results;

        // Map over the artist data and create a mainWrapper element for each result
        return artist.map((result) => {
          let mainWrapper = document.createElement('main-wrapper');

          // Create an img element and set its src attribute to the artworkUrl100 property of the result object
          let img = document.createElement('img');
          img.src = `${result.artworkUrl100}`;
          mainWrapper.appendChild(img);

          // Create a p element and set its innerHTML to the artistName property of the result object
          let artists = document.createElement('p');
          artists.innerHTML = `${result.artistName}`;
          mainWrapper.appendChild(artists);

          // Create an a element and set its innerHTML to the trackName property of the result object
          let song = document.createElement('a');
          song.innerHTML = `${result.trackName}`;
          mainWrapper.appendChild(song);

          // Create a p element and set its innerHTML to the collectionName property of the result object
          let album = document.createElement('p');
          album.innerHTML = `${result.collectionName}`;
          mainWrapper.appendChild(album);

          // Create an audio element and set its src attribute to the previewUrl property of the result object
          let audio = document.createElement('audio');
          audio.src = `${result.previewUrl}`;
          audio.controls = true;
          mainWrapper.appendChild(audio);

          // Create a source element and set its src attribute to the previewUrl property of the result object
          let audioSource = document.createElement('source');
          audioSource.src = `${result.previewUrl}`;
          audioSource.type = 'audio/mp3';
          audio.appendChild(audioSource);

          // Append the mainWrapper element to the displaySongs element
          displaySongs.appendChild(mainWrapper);
        });
      })
     .catch((error) => console.log('An Error Occured', error));
  }
}

// Get the searchButton element and add a click event listener to it
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', function () {
  // Call the updateSearched function
  updateSearched();

  // Get all elements with the class content and hide them
  const contents = document.getElementsByClassName('content');
  for (let i = 0; i < contents.length; i++) {
    contents[i].style.display = 'none';
  }

  // Get the display-song element and display it
  document.getElementById('display-song').style.display = 'flex';
});

// Add an event listener to the document object that listens for the play event
document.addEventListener('play', (event) => {
  // Get all audio elements and pause them if they are not the target of the play event
  const audio = document.getElementsByTagName('audio');
  for (let i = 0; i < audio.length; i++) {
    if (audio[i]!= event.target) {
      audio[i].pause();
    }
  }
}, true);