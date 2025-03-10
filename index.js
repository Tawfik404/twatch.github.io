//https://www.omdbapi.com/?t=movie&apikey=key
let search = document.getElementById("search");
let test = "https://www.omdbapi.com/?t=Inception+&apikey=89c314f8";
let poster = document.getElementById("poster");
let frame = document.getElementById("frame");
let error = document.getElementById("error")
let plot = document.getElementById("plot");
let release = document.getElementById("release");
let genre = document.getElementById("genre");
let duration = document.getElementById("duration");
let rate = document.getElementById("rate");
let title = document.getElementById("title");
let watch = document.getElementById("watch");
let cat = document.getElementById("cat");

search.onclick = async function(){
    const key = "89c314f8";
    var movie = document.getElementById("movie").value;
    var apiReq= `https://www.omdbapi.com/?t=${movie}&apikey=${key}`;
    var request = await fetch(apiReq);
    var response = await request.json();
    if(response["Response"] == "True" ){
        result(response);
    }
    else if(response["Response"] == "False"){
        err();
    }

}
function result(response){
    error.innerHTML = "";
    cat.innerHTML = "";
    error.style.height = "0vh";
    title.innerHTML = response["Title"];
    poster.innerHTML = "<img src="+response["Poster"]+"alt='poster' id='imgmovie'>";
    plot.innerHTML = `<h3><strong id="infotitle">Plot : </strong>${response["Plot"]}</h3>`;
    release.innerHTML = `<h3><strong  id="infotitle">Release date : </strong>${response["Released"]}</h3>`;
    genre.innerHTML = `<h3><stron id="infotitle">Genre : </strong>${response["Genre"]}</h3>`;
    rate.innerHTML = `<h3><strong id="infotitle">Rate : </strong>${response["imdbRating"]}/10
        <svg id="star" width="25px" height="25px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path d="M16,6.204l-5.528-0.803L8,0.392L5.528,5.401L0,6.204l4,3.899l-0.944,5.505L8,13.009l4.944,2.599L12,10.103L16,6.204z" fill="#F7BB07"/>
          </svg>
    </h3>`;
    if(response["Type"] == "movie"){
        let watchbtn = "https://vidsrc.xyz/embed/movie/"+response["imdbID"];
        duration.innerHTML = `<h3><strong id="infotitle">Duration : </strong>${response["Runtime"]}</h3>`;
        watch.innerHTML = `<button id="wbtn"><a href="${watchbtn}" id="lbtn">Watch</a></button>`;
    }
    else if(response["Type"] == "series"){
        let watchbtn = "https://vidsrc.xyz/embed/tv/"+response["imdbID"];
        duration.innerHTML = `<h3><strong id="infotitle">Episode duration : </strong>${response["Runtime"]}</h3>`;
        watch.innerHTML = `<button id="wbtn"><a href="${watchbtn}" id="lbtn">Watch</a></button>`;

    }
}
function err(){
    title.innerHTML = "";
    poster.innerHTML = "";
    plot.innerHTML = "";
    release.innerHTML = "";
    genre.innerHTML = "";
    duration.innerHTML = "";
    rate.innerHTML = "";
    fetch("cat.svg")
    .then(response => response.text())
    .then(data => {
      cat.innerHTML = data;
      //cat.setAttribute("width", "100");
    //   cat.style.height = "100px";
      cat.style.width = "200px";
    });
    error.innerHTML = "<h1 id='error'>Not found, try again:(</h1>";
    error.style.height = "20vh";
}

