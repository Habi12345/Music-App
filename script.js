let searched = ''
const updateSearched = () =>{
  searched = document.getElementById(search-input).value;

  if(!searched || searched === ''){
    alert('Invalid Input')
  }else{
    const url = 'https://itunes.apple..com/search?'
  }
}
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', updateSearched)