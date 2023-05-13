const cursor = document.querySelector(".cursor");
const cats = [...document.querySelectorAll(".cat")];
const scoring = [...document.querySelectorAll(".score span")];
const start = document.querySelector(".start");
const playAgain = document.querySelector(".play_again");
const modal = document.querySelector(".modal");
const modal_gameover = document.querySelector(".modal_gameover");

// score starts at 0
let score = 0;

let game_over = 0;

const audio = new Audio("./assets/meow.mp3");

function Run() {
  // generate timer
  if (score === 0) {
    let timer = null;
  }

  // generate random index
  const index = Math.floor(Math.random() * cats.length);

  // get cat with the corresponding index
  const cat = cats[index];

  // create <img> with hungry cat
  const img = document.createElement("img");
  img.classList.add("hungry_cat");
  img.src = "./assets/cat-hungry.png";

  // when user clicks on hungry cat
  img.addEventListener("click", () => {
    // add 10 points to score
    score += 10;

    //
    game_over += 1;

    // play meow
    audio.play();

    // update score on board with accumulated score
    scoring[0].textContent = score;
    scoring[1].textContent = score;
    img.src = "./assets/cat-happy.png";
  });

  // generate hungry cat on board at random
  cat.appendChild(img);
  game_over -= 1;

  if (game_over === -5) {
    game_over = 0;
    modal_gameover.classList.remove("hidden");
    cat.removeChild(img);
  } else {
    // change hungry cat after 1.5s if score below 100 else speed up every 100 points
    if (score >= 300) {
      timer = setTimeout(() => {
        cat.removeChild(img);
        Run();
      }, 500);
    } else if (score >= 200) {
      timer = setTimeout(() => {
        cat.removeChild(img);
        // audio speed x2
        audio.playbackRate = 2.0;
        Run();
      }, 800);
    } else if (score >= 100) {
      timer = setTimeout(() => {
        cat.removeChild(img);
        Run();
      }, 1000);
    } else {
      timer = setTimeout(() => {
        cat.removeChild(img);
        Run();
      }, 1500);
    }
  }
}

// remove modal when start is pressed & run game
start.addEventListener("click", () => {
  modal.classList.add("hidden");
  Run();
});

playAgain.addEventListener("click", () => {
  modal_gameover.classList.add("hidden");
  // reset score
  score = 0;
  scoring[0].textContent = score;
  scoring[1].textContent = score;
  Run();
});

// make heart image ".cursor" follow cursor
window.addEventListener("mousemove", (event) => {
  cursor.style.top = event.pageY + "px";
  cursor.style.left = event.pageX + "px";
});

// add active class (scales up) when clicked
window.addEventListener("mousedown", () => {
  cursor.classList.toggle("active");
});
// remove active class (returns to normal) when click is release
window.addEventListener("mouseup", () => {
  cursor.classList.remove("active");
});

// disable dragging of any element
window.ondragstart = () => {
  return false;
};
