// var carousel = document.getElementById("carousel");
// var cards = carousel.getElementsByClassName("card");
// var currentCard = 0;

// function nextCard() {
//   cards[currentCard].style.display = "none";
//   currentCard = (currentCard + 1) % cards.length;
//   cards[currentCard].style.display = "block";
// }

// setInterval(nextCard, 3000); // Change the interval as needed


$(document).ready(function(){
    $('.carousel').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      adaptiveHeight: true,
      slidesToScroll: 3
    });
  });
  