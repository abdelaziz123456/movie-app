
//alert badge shown in case of typing less than 3letter-text

$(document).ready(()=>{
    $('.badge').hide()
  $('#searchForm').on('submit',(e)=>{
    e.preventDefault();
      let searchText= $('#searchText').val();
      if(searchText.length<3){
        $('.badge').show();
        $('#movies').empty()
      }else{
        $('.badge').hide()
        getMovies(searchText);
      }
     

  })
})




function getMovies(searchtext){
axios.get('https://www.omdbapi.com/?i=tt3896198&apikey=d9a55d4d&s='+searchtext).then((response)=>{

//alert badge appear in case film not found

    if(response.data.Response=='False'){
        $('.badge').text(response.data.Error)
        $('.badge').show()
        $('#movies').empty()
        
    }else{
        let movieList=response.data.Search;

        let output='';


        //looping through movies list

        $.each(movieList,(index,movie)=>{
            output +=`
            <div class='col-12 col-md-4  col-lg-3 movie'>
                    <div class='well text-center'>

                    <img class='img-fluid' alt='movie image' src="${movie.Poster}">
                        <h5>${movie.Title}</h5>
                        <a onClick="movieSelected('${movie.imdbID}')" class='btn btn-primary' href='#'>Movie Details</a>
                    </div>
            </div>
            `;

        })

        $('#movies').html(output)

        console.log(movieList)
    }

}).catch((err)=>{
    console.log(err)
})
}










// Poster: "https://m.media-amazon.com/images/M/MV5BMjE1MTE4ZWQtNGM2Yi00OWRlLWJmYzctNGU0YjU5ZTcwNGY4XkEyXkFqcGdeQXVyMTgwOTE5NDk@._V1_SX300.jpg"
// Title: "Hans Teeuwen: Dat dan weer wel"
// Type: "movie"
// Year: "2003"
// imdbID: "tt0387272"
// [[Prototype]]: Object