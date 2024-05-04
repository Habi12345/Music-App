let searched = ''
const updateSearched = () =>{
  searched = document.getElementById('search-input').value;

  if(!searched || searched === ''){
    alert('Invalid Input')
  }else{
    const url = `https://itunes.apple.com/search?term=${searched}`
    const displaySongs = document.getElementById('display-song');
    while(displaySongs.firstChild){
      displaySongs.removeChild(displaySongs.firstChild);
    }
    fetch(url)
    .then(res => res.json())
    .then(data => {
      const artist = data.results
      return artist.map(result =>{
        let mainWrapper = document.createElement('main-wrapper')
        /*let album = document.createElement('p')
        album.innerHTML = `${result.collectionName}`
        mainWrapper.appendChild(album)*/
        
        let img = document.createElement('img')
        img.src = `${result.artworkUrl100}`
        mainWrapper.appendChild(img)
        
        let artists = document.createElement('p')
        artists.innerHTML = `${result.artistName}`
        mainWrapper.appendChild(artists)
        
        let song = document.createElement('a')
        song.innerHTML = `${result.trackName}`
        mainWrapper.appendChild(song)

        let album = document.createElement('p')
        album.innerHTML = `${result.collectionName}`
        mainWrapper.appendChild(album)
        
        let audio = document.createElement('audio')
        audio.src = `${result.previewUrl}`
        audio.controls = true
        mainWrapper.appendChild(audio)
        
        let audioSource = document.createElement('source')
        audioSource.src = `${result.previewUrl}`
        audioSource.type = 'audio/mp3'
        audio.appendChild(audioSource)

        displaySongs.appendChild(mainWrapper)
      }) 
  })
  .catch(error=>console.log('An Error Occured', error))
}
}

const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', updateSearched)

document.addEventListener('play', event =>{
  const audio = document.getElementsByTagName('audio');
  for(i=0; i < audio.length; i++){
    if(audio[i] != event.target){
      audio[i].pause();
    }
  }
},true)