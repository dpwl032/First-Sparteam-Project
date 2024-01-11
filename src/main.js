//movie, search.js 파일 불러오기
import { generateMovieCards } from "./movie.js";
import { handleSearch } from "./search.js";

generateMovieCards();

const searchInput = document.querySelector("#search-input");
searchInput.focus();

//form input이 submit 될때마다 이벤트 실행
const form = document.querySelector("#search-form");
form.addEventListener("submit", (event) => { 
  event.preventDefault();
  handleSearch(searchInput.value);
});


//card-list 누르면 모달창 켜지게 하기
const modal = document.getElementById("modal")
const btnModal = document.getElementById("card-list")
btnModal.addEventListener("click", e => {
    modal.style.display = "flex"
})

//모달창의 클로즈(x) 버튼을 누르면 모달창이 꺼지게 하기
const closeBtn = modal.querySelector(".close-area")
closeBtn.addEventListener("click", e => {
    modal.style.display = "none"
})


//모달창 바깥 영역을 클릭하면 모달창이 꺼지게 하기
modal.addEventListener("click", e => {
  const evTarget = e.target
  if(evTarget.classList.contains("modal-overlay")) {
      modal.style.display = "none"
  }
})

//모달창이 켜진 상태에서 ESC 버튼을 누르면 모달창이 꺼지게 하기
window.addEventListener("keyup", e => {
  if(modal.style.display === "flex" && e.key === "Escape") {
      modal.style.display = "none"
  }
})



