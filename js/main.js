//alert badge shown in case of typing less than 3letter-text

$(document).ready(() => {
  $(".badge").hide();
  $("#searchForm").on("submit", (e) => {
    e.preventDefault();
    let searchText = $("#searchText").val();
    if (searchText.length < 3) {
      $(".badge").show();
      $("#movies").empty();
    } else {
      $(".badge").hide();
      getMovies(searchText);
    }
  });
});

function getMovies(searchtext) {
  axios
    .get("https://www.omdbapi.com/?&apikey=d9a55d4d&s=" + searchtext)
    .then((response) => {
      //alert badge appear in case film not found

      if (response.data.Response == "False") {
        $(".badge").text(response.data.Error);
        $(".badge").show();
        $("#movies").empty();
      } else {
        let movieList = response.data.Search;

        let output = "";

        //looping through movies list

        $.each(movieList, (index, movie) => {
          output += `
            <div class='col-12 col-md-4  col-lg-3 movie'>
                    <div class='movie-item text-center'>

                    <img class='img-fluid' alt='movie image' src="${movie.Poster}">
                        <h6>${movie.Title}</h6>
                        <a onClick="movieSelected('${movie.imdbID}')" class='btn btn-primary' href='#'>Movie Details</a>
                    </div>
            </div>
            `;
        });

        $("#movies").html(output);

        console.log(movieList);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

//i will store the movie id in session storage then redirect user to movie page

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");
  console.log(movieId);
  axios
    .get("https://www.omdbapi.com/?&apikey=d9a55d4d&i=" + movieId)
    .then((response) => {
      //alert badge appear in case film not found

      let movie = response.data;

      let output = `
    <div class='row'>
        <div class=" col-lg-4">
            <img src="${movie.Poster}" class='thumbnail'>
        </div>
        <div class="  col-lg-8">
        <h2>${movie.Title}</h2>
        <ul class="list-group">
            <li class="list-group-item">${movie.Genre}</li>
            <li class="list-group-item">${movie.Released}</li>
            <li class="list-group-item">${movie.Rated}</li>
            <li class="list-group-item">${movie.imdbRating}</li>
            <li class="list-group-item">${movie.Director}</li>
            <li class="list-group-item">${movie.Writer}</li>
            <li class="list-group-item">${movie.Actors}</li>
        </ul>
        </div>
    </div>

    <div class="row">
    <div class="well my-5">
        <h3>Plot</h3>
        ${movie.Plot}
        <hr>
        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
        <a href="index.html" class="btn btn-secondary">Go Back To Main Page</a>
    </div>
</div>
    `;

      $("#movie").html(output);

      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

// Poster: "https://m.media-amazon.com/images/M/MV5BMjE1MTE4ZWQtNGM2Yi00OWRlLWJmYzctNGU0YjU5ZTcwNGY4XkEyXkFqcGdeQXVyMTgwOTE5NDk@._V1_SX300.jpg"
// Title: "Hans Teeuwen: Dat dan weer wel"
// Type: "movie"
// Year: "2003"
// imdbID: "tt0387272"
// [[Prototype]]: Object
