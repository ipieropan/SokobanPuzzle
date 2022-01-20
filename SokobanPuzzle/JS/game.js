const playground = document.getElementById('playground');
document.body.addEventListener('keydown', keyPress);
let elementsG = null;
var player = {
  x: 11,
  y: 11,
};

// restart button settings
let button = document.getElementById("restart");
button.addEventListener("click", () => restartGame());

function initializeMap() {
  for (let col = 0; col < tileMap01.width; col++) {
    for (let row = 0; row < tileMap01.height; row++) {
      var element = document.createElement('div');
      element.classList.add('block');
      if (tileMap01.mapGrid[col][row][0] !== ' ') {
        element.classList.add(tileMap01.mapGrid[col][row][0]);
      }
      element.id = 'x' + col + 'y' + row;

      playground.appendChild(element);
    }
  }
  elementsG = document.querySelectorAll('.G');
}

function keyPress(e) {
  switch (e.key) {
    case 'ArrowUp':
    case 'w':
      e.preventDefault();
      movePlayer(-1, 0);
      break;

    case 'ArrowDown':
    case 's':
      e.preventDefault();
      movePlayer(1, 0);

      break;

    case 'ArrowLeft':
    case 'a':
      e.preventDefault();
      movePlayer(0, -1);

      break;

    case 'ArrowRight':
    case 'd':
      e.preventDefault();
      movePlayer(0, 1);

      break;

    default:
      console.error();
      break;
  }
}

function movePlayer(x, y) {
  var newY = player.y + y;
  var newX = player.x + x;

  var playerElement = document.getElementById('x' + player.x + 'y' + player.y);
  var destination = document.getElementById('x' + newX + 'y' + newY);
  if (!destination.classList.contains('W')) {
    const destination2 = document.getElementById(
      'x' + (newX + x) + 'y' + (newY + y)
    );
    if (destination.classList.contains('B')) {
      if (!destination2.classList.contains('W')) {
        if (!destination2.classList.contains('B')) {
          player.x = newX;
          player.y = newY;
          playerElement.classList.remove('P');
          destination.classList.remove('B');
          destination.classList.add('P');
          destination2.classList.add('B');
        }
      }
    } else {
      playerElement.classList.remove('P');
      destination.classList.add('P');
      player.x = newX;
      player.y = newY;
    }
    let count = 0;
    elementsG.forEach(element => {
      if (element.classList.contains('B')) {
        count++;
      }
    });
    if (count === 6) {
      Swal.fire({
        icon: 'success',
        title: 'Good job!',
        text: 'You win!!!!',
        backdrop: `
            rgba(0,0,123,0.4)
            url("images/nyan-cat.gif")
            left top
            no-repeat
          `,
        confirmButtonText: 'Restart',
      }).then(result => {
        if (result.isConfirmed) {
          restartGame();
        }
      });
    }
  }
}

function restartGame(){
  player.x = 11;
  player.y = 11;
  document.getElementById('playground').innerHTML = '';
  initializeMap();
}

initializeMap();
