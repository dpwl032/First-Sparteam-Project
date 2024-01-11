export const handleSearch = (searchKeyword) => {
    const movieCards = document.querySelectorAll(".movie-card");
  
    movieCards.forEach((card) => {
      const title = card.querySelector(".movie-title").textContent.toLowerCase();
      const searchedValue = searchKeyword.toLowerCase();
  
      //내가 입력한 값에 맞게 카드 display 유무
      if (title.includes(searchedValue)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  };