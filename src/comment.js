// 카드 정보 받아오기
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


// =========== 댓글기능 구현 =========== 

// 댓글 입력 폼 
const commentForm = document.querySelector('.commentForm');

// 댓글 목록 ul
const commentBox = document.querySelector('.commentBox');

// 폼 submit 이벤트
commentForm.addEventListener("submit", (e) => {

  // 폼은 기본적으로 새로고침을한다. 이벤트의 기본 동작을 취소시킴(새로고침 막기)
  e.preventDefault();

  // 인풋 가져오기
  const userName = document.querySelector('.userName')
  const comment = document.querySelector('.comment')
  const pw = document.querySelector('.pw')
  const pwCheck = document.querySelector('.pwCheck')

  // 비밀번호와, 비밀번호 확인 값이 다를경우 알림창
  if (pw.value !== pwCheck.value) {
    alert('비밀번호 오류입니다 다시 입력해주세요.');
    pw.value = '';
    pwCheck.value = '';
    pw.focus();
  }else{
    return;
  }


  // 로컬스토리지에 저장된 영화 아이디값을 기준으로 댓글 불러오기
  let getComment = window.localStorage.getItem(clickedMovieId);

  // 로컬스토리지는 문자열로 저장된다, 문자열로 변환된 댓글을 다시 객체로 변환 
  // 문자열은 그대로 "userName" 이렇게 값이 나오기 때문 우리가 원하는 값은 userName 변수에 들어있는 값이다(EX.userName : 김뽀삐)
  let returnObjcomment = JSON.parse(getComment);

  // 댓글이 없다면 빈 배열로 반환
  if (!returnObjcomment) {
    returnObjcomment = [];
  }
  console.log("returnObjcomment", returnObjcomment);
  console.log("getComment", getComment);

  // 댓글 객체 생성(작성자, 댓글 내용, 비밀번호) 
  const id = Date.now(); // 댓글 삭제를 위한 id값
  const makeComment = {
    userName: userName.value,
    comment: comment.value,
    pw: pw.value,
    id
  };

  // 댓글을 생성하면 댓글목록 배열에 추가
  returnObjcomment.push(makeComment);

  // 로컬스토리지에 저장하는 값은 문자열이여야한다.
  // JSON.stringify 메서드로 객체를 문자열로 변환
  const objComment = JSON.stringify(returnObjcomment);

  // 댓글 객체 영화id를 키값으로 로컬스토리지에 저장
  const setComment = localStorage.setItem(clickedMovieId, objComment);
  console.log(clickedMovieId);

  // html 요소 만들기
  const comments = document.createElement('li');
  const commentText = document.createElement('p');
  const userText = document.createElement('p');
  const deletBtn = document.createElement('button');

  // 댓글 삭제 버튼 클레스 네임 부여
  deletBtn.className = 'deletBtn';

  // 댓글 객체 쪼개기(닉넴, 내용을 하나씩 요소에 담기)
  returnObjcomment.userName
  returnObjcomment.comment

  // 만들어진 요소에 댓글 넣기
  comments.innerText = `${returnObjcomment.comment} - ${returnObjcomment.userName}`;
  deletBtn.innerText = '삭제';

  commentBox.append(comments);
  comments.append(deletBtn);

  // 댓글 목록 불러오는 함수 호출
  loadComments();
});


// 페이지 로드 시 댓글 목록 불러오기
loadComments();

// 댓글 불러오기
function loadComments() {
  // 모든 댓글을 영화id 키값으로 가져오기
  const allComments = JSON.parse(localStorage.getItem(clickedMovieId));
  console.log("allComments", allComments);

  commentBox.innerHTML = ''; // 기존의 댓글 목록 초기화

  // 댓글 목록 화면에 뿌리기
  allComments.forEach(comment => {
    const commentElement = document.createElement('li');
    commentElement.innerText = `${comment.comment} - ${comment.userName}`;
    commentElement.dataset.userName = comment.userName;
    commentElement.dataset.id = comment.id;
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteBtn';
    deleteBtn.innerText = '삭제';
    commentElement.appendChild(deleteBtn);
    commentBox.appendChild(commentElement);
    console.log(comment)
  });
}


// 비밀번호 삭제
commentBox.addEventListener("click", (e) => {

  // 이벤트 대상의 클레스가 deleteBtn이면 작동
  if (e.target.classList.contains('deleteBtn')) {

    const commentElement = e.target.parentElement; // 이벤트 대상(삭제 대상)의 부모 요소를 변수에 담음
    const id = commentElement.dataset.id; // 이벤트 대상(삭제 대상)의 id값을 변수에 담음
    // console.log("id", commentElement.dataset.id)

    // 댓글 가져오기
    const comments = JSON.parse(localStorage.getItem(clickedMovieId));

    // 댓글 id와 이벤트 대상의 id가 같다는 조건을 반환
    const comment = comments.find(function (comment) {
      return String(comment.id) === id
    });
    // console.log("comment", comment);

    // 비밀번호 입력 받기
    const userPassword = prompt("댓글을 삭제하려면 비밀번호를 입력하세요:");

    // // 입력된 비밀번호와 댓글에 저장된 비밀번호 비교
    if (userPassword === comment.pw) {

      // 비밀번호가 일치하는 경우 댓글 삭제
      alert('테스트');

      commentElement.remove();  // html에서 댓글 요소 삭제

      // 필터를 통해 댓글의 id와 이벤트 대상의 id가 같지 않은것만 반환한다(id값이 같은 대상은 삭제)
      let filteredComments = comments.filter(function (comment) {
        return String(comment.id) !== id
      });
      // console.log("filteredComments",filteredComments)

      // 필터로 이벤트 대상이 아닌 id값만 모인 댓글은 로컬스토리지에 다시 저장해준다.
      localStorage.setItem(clickedMovieId, JSON.stringify(filteredComments));

      alert("댓글이 삭제되었습니다.");
    } else {
      // 비밀번호가 일치하지 않는 경우
      alert("비밀번호가 일치하지 않습니다. 삭제 권한이 없습니다.");
    }
  }
});
