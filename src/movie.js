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
  // console.log(movie)

  // html문서에 영화 카드 만들기
  const card = document.createElement("div");
  const poster = document.createElement("img");
  const mvTitle = document.createElement("h2");
  const mvOverview = document.createElement("p");
  const mvVote_average = document.createElement("p");

  // html 요소에 클래스네임 부여
  card.className = 'card';
  poster.className = 'poster';
  mvTitle.className = 'mvTitle';
  mvOverview.className = 'mvOverview';
  mvVote_average.className = 'vote-mvVote_average';

  // 이미지 경로
  poster.src = `https://image.tmdb.org/t/p/w500${poster_path}`;

  // 제목 등 요소에 내용 삽입
  mvTitle.innerText = title;
  mvOverview.innerText = overview;
  mvVote_average.innerText = `Vote Average: ${vote_average}`;

  // 만들어진 카드 내용들은 카드div에 추가
  card.appendChild(poster);
  card.appendChild(mvTitle);
  card.appendChild(mvOverview);
  card.appendChild(mvVote_average);

  // 컨테이너에 카드 추가
  moviesBox.appendChild(card);

  // console.log(card);

  // 상세페이지로 카드 정보 보내기
  card.addEventListener("click", (e) => {
    console.log(card);

    // localStorage.setItem("clickedMovieId", id);
    localStorage.setItem("clickedTitle", title);
    localStorage.setItem("clickedOverview", overview);
    localStorage.setItem("clickedPosterPath", poster_path);
    localStorage.setItem("clickedVoteAverage", vote_average);

    window.location.href = "comment.html";

  });
  return card;

};

// 제목 검색 시 결과 띄우기
// form을 사용할 경우, Enter이벤트를 따로 작성하지않아도 적용된다.
let searchForm = document.getElementById("searchForm");

// 새로고침 안내 문구
let logoText = document.getElementById("logoText");
logoText.style.display = "none"

searchForm.addEventListener("submit", (e) => {
  // preventDefault 기본행동을 막는 함수 form은 기본적으로 새로고침을한다
  // e - 이벤트 대상
  e.preventDefault();

  // 인풋값을 소문자로 변환하여 가져오기
  // 영화 카드 가져오기 (카드 제목으로 검색 키워드랑 비교해야 하니까)
  const searchInput = document.getElementById("search").value.toLowerCase();
  const movieCards = document.querySelectorAll(".card");

  movieCards.forEach(card => {
    const title = card.querySelector(".mvTitle").textContent.toLowerCase();
    // textContent - value는 사용자가 입력하는 텍스트에서만 사용.

    if (title.includes(searchInput)) {
      card.style.display = "flex"; // 제목이 일치하면 카드 띄우기
      logoText.style.display = "flex";
    } else {
      card.style.display = "none"; // 일치하지 않으면 카드를 숨기기
      logoText.style.display = "flex";
    }
  });
});