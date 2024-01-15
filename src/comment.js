// 카드 정보 받아오기
// const clickedMovieId = localStorage.getItem("clickedMovieId");
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

  // 알림창은뜨지만 인풋 빈값으로 만들기, 포커스가 적용안됨
  if (pw !== pwCheck) {
    alert('비밀번호 오류입니다 다시 입력해주세요.');
    pw.value = '';
    pwCheck.value = '';
    pw.focus();
  };

  // if (localStorage.getItem(userName) !== null) {
  //   alert('동일한 이름이 존재합니다. 다른 이름을 사용해주세요.');
  //   return;
  // }

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

  const getComment = window.localStorage.getItem(userName);

  // 문자열로 변환된 댓글을 다시 객체로 변환 
  // 문자열은 그대로 "userName" 이렇게 값이 나오기 때문 우리가 원하는 값은 userName 변수에 들어있는 값이다(EX.userName : 김뽀삐)
  const returnObjcomment = JSON.parse(getComment);
  console.log(returnObjcomment);

  // html 요소 만들기
  const comments = document.createElement('li');
  const commentText = document.createElement('p');
  const userText = document.createElement('p');
  const deletBtn = document.createElement('button');

  deletBtn.className = 'deletBtn';

  // 댓글 객체 쪼개기(닉넴, 내용을 하나씩 요소에 담기)
  returnObjcomment.userName
  returnObjcomment.comment

  // 만들어진 요소에 댓글 넣기
  comments.innerText = `${returnObjcomment.comment} - ${returnObjcomment.userName}`;
  deletBtn.innerText = '삭제';

  commentBox.append(comments);
  comments.append(deletBtn);

  loadComments();
});


// 페이지 로드 시 댓글 목록 불러오기
loadComments();

// 댓글 불러오기
function loadComments() {
  // 모든 댓글을 가져오기
  const allComments = Object.keys(localStorage).map(key => {

    return JSON.parse(localStorage.getItem(key));
  });

  // 가져온 댓글을 화면에 표시
  commentBox.innerHTML = ''; // 기존의 댓글 목록 초기화

  allComments.forEach(comment => {
    const commentElement = document.createElement('li');
    commentElement.innerText = `${comment.comment} - ${comment.userName}`;
    commentElement.dataset.userName = comment.userName;
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteBtn';
    deleteBtn.innerText = '삭제';
    commentElement.appendChild(deleteBtn);
    commentBox.appendChild(commentElement);
  });
}

// 댓글 삭제
function deleteComment(userName) {

  // 로컬 스토리지에서 유저네임의 댓글 삭제
  localStorage.removeItem(userName);
}

// 댓글 삭제
commentBox.addEventListener("click", (e) => {

  if (e.target.classList.contains('deleteBtn')) {

    const commentElement = e.target.parentElement;
    const userName = commentElement.dataset.userName; // 댓글의 유저네임을 가져옴
    deleteComment(userName); // 댓글 삭제 함수 호출
    commentElement.remove(); // 화면에서도 삭제된 댓글 제거
  }
});






