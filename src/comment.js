
// // 카드 정보 받아오기
const clickedMovieId = localStorage.getItem("clickedMovieId");
const clickedTitle = localStorage.getItem("clickedTitle");
const clickedOverview = localStorage.getItem("clickedOverview");
const clickedPosterPath = localStorage.getItem("clickedPosterPath");
const clickedVoteAverage = localStorage.getItem("clickedVoteAverage");


// 받아온 카드 정보 담을 박스
const clickedMoviev = document.querySelector('.clickedMoviev');

// html문서에 들어갈 영화 내용 요소 만들기
const movieposter = document.createElement("img");
const movieTitle = document.createElement("div");
const movieOverview = document.createElement("p");
const movieVoteAverage = document.createElement("p");

// html 요소에 클래스네임 부여
movieposter.className = 'movieposter';
movieTitle.className = 'movieTitle';
movieOverview.className = 'movieOverview';
movieVoteAverage.className = 'movieVoteAverage';

// 이미지 경로
movieposter.src = `https://image.tmdb.org/t/p/w500${clickedPosterPath}`;

// 제목 등 요소에 내용 삽입
movieTitle.innerText = clickedTitle;
movieOverview.innerText = clickedOverview;
movieVoteAverage.innerText = `평점 : ${clickedVoteAverage}`;

// 컨테이너에 추가
clickedMoviev.appendChild(movieposter);
clickedMoviev.appendChild(movieTitle);
clickedMoviev.appendChild(movieOverview);
clickedMoviev.appendChild(movieVoteAverage);



// 댓글기능 구현

// 댓글 입력 폼 
const commentForm = document.querySelector('.commentForm');

// 댓글 목록 ul
const commentBox = document.querySelector('.commentBox');

// 폼 submit 이벤트
commentForm.addEventListener("submit", (e) => {

  // 폼은 기본적으로 새로고침을한다. 이벤트의 기본 동작을 취소시킴(새로고침 막기)
  e.preventDefault();

  // 인풋 가져오기
  const userName = document.querySelector('.userName').value;
  const comment = document.querySelector('.comment').value;
  const pw = document.querySelector('.pw').value;
  const pwCheck = document.querySelector('.pwCheck').value;

  // 비밀번호와, 비밀번호 확인 값이 다를경우 알림창
  if (pw !== pwCheck) {
    alert('비밀번호 오류입니다 다시 입력해주세요.');
    pw.value = '';
    pwCheck.value = '';
    pw.focus();
  };

  // 댓글 객체 생성(작성자, 댓글 내용, 비밀번호) 
  const makeComment = {
    userName: userName,
    comment: comment,
    pw: pw
  };

  // 로컬스토리지에 저장하는 값은 문자열이여야한다.
  // JSON.stringify 메서드로 객체를 문자열로 변환
  const objComment = JSON.stringify(makeComment);

  // 댓글 객체를 문자열로 변환 후 로컬스토리지에 저장
  const setComment = localStorage.setItem(userName, objComment);
  // console.log(setComment)

  const getComment = window.localStorage.getItem(userName);

  // 문자열로 변환된 댓글을 다시 객체로 변환 
  // 문자열은 그대로 "userName" 이렇게 값이 나오기 때문 우리가 원하는 값은 userName 변수에 들어있는 값이다(EX.userName : 김뽀삐)
  const returnObjcomment = JSON.parse(getComment);
  console.log(returnObjcomment);

  // html 요소 만들기
  const comments = document.createElement('li');
  const commentText = document.createElement('p');
  const userText = document.createElement('p');

  // 댓글 객체 쪼개기(닉넴, 내용을 하나씩 요소에 담기)
  returnObjcomment.userName
  returnObjcomment.comment

  // 만들어진 요소에 댓글 넣기

  comments.innerText = `${returnObjcomment.comment} - ${returnObjcomment.userName}`;

  userName.value = '';
  comment.value = '';
  commentBox.append(comments);
});

let logo = document.getElementById("logo");
logo.addEventListener("click", (e) => {


  window.location.href = "index.html";

});

// 제목 검색 시 결과 띄우기
// form을 사용할 경우, Enter이벤트를 따로 작성하지않아도 적용된다.
let searchForm = document.getElementById("searchForm");


// searchForm.addEventListener("submit", (e) => {
//   // preventDefault 기본행동을 막는 함수 form은 기본적으로 새로고침을한다
//   // e - 이벤트 대상
//   e.preventDefault();

//   // 인풋값을 소문자로 변환하여 가져오기
//   // 영화 카드 가져오기 (카드 제목으로 검색 키워드랑 비교해야 하니까)
//   const searchInput = document.getElementById("search").value.toLowerCase();
//   // console.log(searchInput);
//   const Input = document.getElementById("movies");
//   Input.style.display = "block";
//   Input.innerHTML = searchInput;
// });


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
  .catch( err => console.error(err));

  function addMovie(movie) {
    const moviesBox = document.getElementById("movies");
  
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

    card.appendChild(poster);
    card.appendChild(mvTitle);
    card.appendChild(mvOverview);
    card.appendChild(mvVote_average);

    moviesBox.appendChild(card);

    searchForm.addEventListener("submit", (e) => {
      // preventDefault 기본행동을 막는 함수 form은 기본적으로 새로고침을한다
      // e - 이벤트 대상
      e.preventDefault();
    
      // 인풋값을 소문자로 변환하여 가져오기
      // 영화 카드 가져오기 (카드 제목으로 검색 키워드랑 비교해야 하니까)
      const searchInput = document.getElementById("search").value.toLowerCase();
      // console.log(searchInput);
      const Input = document.getElementById("movies");
      const showBox = document.getElementsByClassName("showBox")[0];
      showBox.style.display = "none";
      Input.style.display = "flex";
      // Input.style.display = "block";
      // Input.innerHTML = searchInput;
      const movieCards = document.querySelectorAll(".card");

      movieCards.forEach(card => {
        const title = card.querySelector(".mvTitle").textContent.toLowerCase();
        // textContent - value는 사용자가 입력하는 텍스트에서만 사용.
    
        if (title.includes(searchInput)) {
          card.style.display = "flex"; // 제목이 일치하면 카드 띄우기
         
        } else {
          card.style.display = "none"; // 일치하지 않으면 카드를 숨기기
          
        }
      
    });
    
    card.addEventListener("click", (e) => {
      //   console.log(card);
    
        // localStorage.setItem("clickedMovieId", id);
        localStorage.setItem("clickedTitle", title);
        localStorage.setItem("clickedOverview", overview);
        localStorage.setItem("clickedPosterPath", poster_path);
        localStorage.setItem("clickedVoteAverage", vote_average);
    
        window.location.href = "comment.html";
    
      });

    });
    
    
  };

  