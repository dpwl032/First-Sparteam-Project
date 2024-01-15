// //moviesBox 누르면 모달창 켜지게 하기
// const modal = document.getElementById("modal")
// const btnModal = document.getElementById("moviesBox")
// btnModal.addEventListener("click", e => {
//     modal.style.display = "flex"
// })

//모달창의 클로즈(x) 버튼을 누르면 모달창이 꺼지게 하기
const closeBtn = modal.querySelector(".close-area")
closeBtn.addEventListener("click", e => {
    modal.style.display = "none"
})


//모달창 바깥 영역을 클릭하면 모달창이 꺼지게 하기
modal.addEventListener("click", e => {
    const evTarget = e.target
    if (evTarget.classList.contains("modal-overlay")) {
        modal.style.display = "none"
    }
})

//모달창이 켜진 상태에서 ESC 버튼을 누르면 모달창이 꺼지게 하기
window.addEventListener("keyup", e => {
    if (modal.style.display === "flex" && e.key === "Escape") {
        modal.style.display = "none"
    }
})

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTI3MDJhMzJkMmRjODkyZmY0MWVkNDUyY2FkNzlmNSIsInN1YiI6IjY1OWE2NjgwODc0MWM0MDE0OWNmZThhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YP6AFRBzCxXt71iiMIveA22dxWAIxInrzwPri1QfSqg'
    }
};
fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => {
        // console.log(response);
        const result = response.results;
        // console.log("result",result);

        // 배열 형태의 api문서를 배열 반복문을 사용하여 addMovie 이벤트에 인자로 전달
        result.forEach(movie => {
            // console.log("movie", movie)
            addMovie(movie);
        });
    })
    .catch(err => console.error(err));


function addMovie(movie) {
    const moviesBox = document.getElementById("moviesBox");

    // 인자로 받은 객체 데이터를 구조분해 할당으로 원하는 값만 추출
    const { title, overview, poster_path, vote_average, id } = movie;
    // console.log(movie);

    const movieTitle = title;
    const moviePoster = poster_path;
    const movieOverview = overview;
    console.log(movie);
    poster.src = `https://image.tmdb.org/t/p/w500${poster_path}`;

    title.innerText = title;
    overview.innerText = overview;

    const modalImg = document.getElementById("modalImg");
    const modalTitle = document.getElementById("modalTitle");
    const contentName = document.getElementById("contentName");

    //moviesBox 누르면 모달창 켜지게 하기
    const modal = document.getElementById("modal")
    const btnModal = document.getElementById("moviesBox")
    btnModal.addEventListener("click", e => {
        modal.style.display = "flex"

        const modalimg = document.getElementById("modalImg");
        const modaltitle = document.getElementById("modalTitle");
        const modalcontentName = document.getElementById("contentName");
        modalimg.innerHTML = poster;
        modaltitle.innerText = title;
        modalcontentName.innerText = overview;
        
    });
}
