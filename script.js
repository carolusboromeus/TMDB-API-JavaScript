//fetch

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmE1MTBmMzA1MTYxY2RjYzVhZDMxNzhlZDkyY2QwNiIsInN1YiI6IjY1YWJlOWRmMWYzZTYwMDBhNGZlYjYwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ou38fZMw0pGioWnXiIZjq6tA2jKBlahN977JzTotgyw'
    }
};

const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click',async function() {

    const inputKeyword = document.querySelector('.input-keyword');
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);
        //.catch(err => console.error(err));

        
})

function getMovies(keyword)
{
    return fetch('https://api.themoviedb.org/3/search/movie?query='+keyword, options)
        .then(response => response.json())
        .then(response => response.results);
}

function updateUI(movies)
{
    let cards = '';
    movies.forEach(m => cards += showCards(m));
    const movieContainer = document.querySelector('.movie-container')
    movieContainer.innerHTML = cards;

    //ketika tombol detail di-klik
    const modalDetailButton = document.querySelectorAll('.modal-detail-button');
    modalDetailButton.forEach(btn => {
        btn.addEventListener('click', function(){
            
        })
    })
}

//event binding
document.addEventListener('click',async function(e) {
    if(e.target.classList.contains('modal-detail-button'))
    {
        const id = e.target.dataset.id;
        const movieDetail = await getMovieDetail(id);
        updateUIDetail(movieDetail);
    }
});

function getMovieDetail(id)
{
    return fetch('https://api.themoviedb.org/3/movie/' + id, options)
            .then(response => response.json())
            .then(response => response);
            //.catch(err => console.error(err));
}

function updateUIDetail(m) {
    const movieDetails = showMovieDetail(m);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetails;
}

function showCards(m) {
    return `<div class="col-md-3 my-3">
                <div class="card" style="width: 18rem;">
                    <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${m.poster_path}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${m.title}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${m.release_date}</h6>
                    </div>
                    <div class="card-body">
                        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-id="${m.id}">Show Details</a>
                    </div>
                </div>
            </div>`
}

function showMovieDetail(m) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${m.poster_path}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${m.title}</h4></li>
                            <li class="list-group-item"><strong>Tagline: </strong>${m.tagline}</li>
                            <li class="list-group-item"><strong>Release Date: </strong>${m.release_date}</li>
                            <li class="list-group-item"><strong>Budget: </strong>${m.budget} USD</li>
                            <li class="list-group-item"><strong>Plot: </strong> <br>${m.overview}</li>
                        </ul>
                    </div>
                </div>
            </div>`
}