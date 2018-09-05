// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

  constructor(y, speed){
    // Number of pixel per x move
    this.xMove = 101;
    //Set initial position
    this.x = -101;
    this.y = y + 55;
    this.speed = speed;
    //Set border for replication
    this.border = this.xMove*5;
    //Bug's image
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
  update(dt) {
    if (this.x < this.border){
      //If enemy is not passed boundary
        //Move forward
        //Increment x by speed *dt
      this.x += this.speed*dt;
    } else {
      //Reset speed to 0 to remove with removeBug function
      this.speed = 0;
    }
}

// Draw the enemy on the screen, required method for game
    render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Hero{
  constructor(){
    // Number of pixel per x and y move
    this.xMove = 101;
    this.yMove = 83;
    // Starting point (unchangeable)
    this.xStart =  this.xMove*2;
    this.yStart = this.yMove*4+55;
    // Initial position at the beginning of the game
    this.x = this.xStart;
    this.y = this.yStart;
    //Hero's image
    this.sprite = 'images/char-cat-girl.png';
    this.winner = false;
  }

  // Draw hero at initial position
  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  //Update position
  update(){
    /**
     * Check if hero and enemy collided
     *
     * e    e+xMove     x      x+xMove
     * [ bug ] -------> [ hero ]
     *          moving
     *
     * if e+xMove >= x => DEAD
     * if e+xMove+xMove <= x+xMove => DEAD (xMove cancelled out on both side)
     *
     * Since the xMove gap between bug and hero is too big,
     * we will divide it to 2 to make it looks more reasonalbe
     */
    for (let enemy of allEnemies){
      if (this.y === enemy.y && (this.x < enemy.x + enemy.xMove/2 && enemy.x < this.x + this.xMove/2)){
        this.reset();
      }
    }

    // Check if hero could get to the river
    if (this.y == -28){
      this.winner = true;
    }
  }

  reset(){
    this.x = this.xStart;
    this.y = this.yStart;
  }

  /**
   * Make hero moves according to keyobard input
   * Making sure hero won't move out of the screen with the 'if' condition
   *
   * @param {string} input - direction to go
   */
  handleInput(input){

         switch (input){
          case 'left':
           if (this.x > 0){
            this.x -= this.xMove;
          }
            break;
          case 'right':
           if (this.x < this.xMove*4){
            this.x += this.xMove;
          }
            break;
          case 'up':
            if (this.y > -20){
            this.y -= this.yMove;
          }
            break;
          case 'down':
            if (this.y < this.yMove*4){
            this.y += this.yMove;
          }
            break;
          }
     }
}

//Generate bug with random speed and postion
function generateBug(){
  //Location and speed constant
  const yBug = [0, 83, 83*2];
  const speedBug = [2,2.5,3,3.5,4,4.5,5];

  //Bug's location and speed info
  let yRand = yBug[Math.floor(Math.random()*yBug.length)];
  let speedRand = speedBug[Math.floor(Math.random()*speedBug.length)];

  // Create new bug and push to the array
  let bug = new Enemy(yRand, 100*speedRand);
  allEnemies.push(bug);
}


//Remove bugs that went out of the screen
function removeBug(){
  for (i in allEnemies){
    if (allEnemies[i].speed == 0) {
        allEnemies.splice(i,1);
    }}
}

const player = new Hero(); //Our hero
const allEnemies = []; //Empty list of enemy

// If number of bugs less than 5, create new bug
// and check for old bug for removal
setInterval(function(){
  if(allEnemies.length < 5){
    generateBug();
  }
  removeBug();
}, 10);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
