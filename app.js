// ---------Concentration (memory game)-----------

// Grid showing 6(row) to 6(column) boxes
// Each box holds 1 figure or a card/image
// Grid contains a pair of figure or a card
// User clicks a box and if the figure in the first clicked box matches with the figure in the next clicked box it stays open
// User clicks a box and if the figure in the first clicked box does not match with the figure in the next clicked box both of the boxes flips over
// Unmatched figures should flip back
// The game ends when all the figure/image or cards match
// It should display total count of moves - couldnot make it
// It should display total time spent - couldnot make it
// After game completes it should display a congratulating message
// Add a click counter to set the limit
// Will not be used as I need to keep it simple -- If a player wants continue playing "Play again"  button should start another round
//Will not be used as I need to keep it simple --  "Play again" button should shuffle the boxes so the player could not match them in the previous pattern
/*---------------------------- Setup ----------------------------*/

// Get all boxes

const vegetables = [
  {
    id: 1,
    name: "aubergine",
    img: "images/aubergine.jpg",
  },
  {
    id: 2,
    name: "beetroot",
    img: "images/beetroot.jpg",
  },
  {
    id: 3,
    name: "cabbage",
    img: "images/cabbage.jpg",
  },
  {
    id: 4,
    name: "carrot",
    img: "images/carrot.jpg",
  },
  {
    id: 5,
    name: "cucumber",
    img: "images/cucmber.jpg",
  },
  {
    id: 6,
    name: "grape",
    img: "images/grape.jpg",
  },
  {
    id: 7,
    name: "green_apple",
    img: "images/green_apple.jpg",
  },
  {
    id: 8,
    name: "lemon",
    img: "images/lemon.jpg",
  },
  {
    id: 9,
    name: "mellon",
    img: "images/mellon.jpg",
  },
  {
    id: 10,
    name: "pear",
    img: "images/pear.jpg",
  },
  {
    id: 11,
    name: "pepper",
    img: "images/pepper.jpg",
  },
  {
    id: 12,
    name: "plum",
    img: "images/plum.jpg",
  },
  {
    id: 13,
    name: "potato",
    img: "images/potato.jpg",
  },
  {
    id: 14,
    name: "pumpkin",
    img: "images/pumpkin.jpg",
  },
  {
    id: 15,
    name: "red_apple",
    img: "images/red_apple.jpg",
  },
  {
    id: 16,
    name: "strawberry",
    img: "images/strawberry.jpg",
  },
  {
    id: 17,
    name: "tomato",
    img: "images/tomato.jpg",
  },
  {
    id: 18,
    name: "watermelone",
    img: "images/watermelone.jpg",
  },
];

/* ------------variables--------------- */
let firstPick = null;
let secondPick = null;
let lockBoard = false;
let matches = 0;
const clicksLeft = document.querySelector(".main");
const boxes = document.querySelectorAll(".box");
const movesRemaining = document.querySelector(".click-counts");
let clickCounts = 0;

/* ------------functions--------------- */

//function handleRowClicks() {}
clicksLeft.addEventListener("click", () => {
  clickCounts = clickCounts + 1;
  movesRemaining.textContent = parseInt(108 - clickCounts);
  if (movesRemaining.textContent <= 0) {
    setTimeout(() =>
      alert("You lost! Please refresh the page to restart the game!s")
    );
  }
});

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

let veggiePairs = [...vegetables, ...vegetables];
veggiePairs = shuffle(veggiePairs);

boxes.forEach((box, index) => {
  const veg = veggiePairs[index];
  box.dataset.name = veg.name;
  box.dataset.img = veg.img;

  box.addEventListener("click", handleClick);
});

function handleClick(event) {
  const box = event.currentTarget;

  if (lockBoard || box === firstPick || box.classList.contains("matched"))
    return;

  box.style.backgroundImage = `url(${box.dataset.img})`;
  box.style.backgroundSize = "cover";
  box.style.backgroundPosition = "center";

  if (!firstPick) {
    firstPick = box;
  } else {
    secondPick = box;
    checkMatch();
  }
}

function checkMatch() {
  lockBoard = true;

  const isMatch = firstPick.dataset.name === secondPick.dataset.name;

  if (isMatch) {
    firstPick.classList.add("matched");
    secondPick.classList.add("matched");
    matches++;

    resetPicks();

    if (matches === vegetables.length) {
      setTimeout(() => alert("🎉 Congratulations you WON!!!! "));
    }
  } else {
    setTimeout(() => {
      firstPick.style.backgroundImage = "";
      secondPick.style.backgroundImage = "";
      resetPicks();
    }, 1000);
  }
}

function resetPicks() {
  [firstPick, secondPick] = [null, null];
  lockBoard = false;
}
