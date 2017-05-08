

var myGamePiece;
var gravity = 0.2;
var keys = [];
var myScore;
var blockGroup = []
var gameOver = false;
var i;
var j;
var k;


//origin tests


function startGame() {
    map = new mapObject();
    player = new playerObject()
                              //  wi  he   col   x    y    spe  rot  pla.he type
    smallblock1 = new blockObject(30, 30, "block4.png", 460, 151, 3.2, 2.2, 435, 1);       //GS2R   HER
    smallblock2 = new blockObject(30, 30, "retroblock.png", 493, 418, 3.2, 10.1, 435, 1);    //GS5R  HERE
    largeblock1 = new blockObject(80, 30, "longblock1.png", 219, 205, 2.8, 6.9 , 390, 1);   //GS3L  HERE #
    largeblock2 = new blockObject(80, 30, "longblock2.png", 258 , 431, 2.8, 11.6, 390, 1);   //GS6L  HERE
    floatblock1 = new blockObject(30, 30, "block3.png", 258 , 431, 2.3, 11.6, 390, 1);   //GS6L  HERE

    Rsmallblock = new blockObject(30, 30, "block2.png", 493, 418, 3.2, 10.1, 435, -1);    //GS5R  HERE
    Rlargeblock = new blockObject(80, 30, "longblock1.png", 258 , 431, 2.8, 11.6, 390, -1);   //GS6L  HERE
    Rfloatblock = new blockObject(30, 30, "block1.png", 258 , 431, 2.3, 11.6, 390, -1);   //GS6L  HERE


    blockGroup.push(smallblock1, smallblock2, largeblock1, largeblock2, floatblock1, Rsmallblock, Rlargeblock, Rfloatblock)

    myGameArea.start();
    drawScore();
}
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 700;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;

        myGameArea.frameNo += .05;
        difficulty = Math.round(myGameArea.frameNo)


        this.interval = setInterval(updateGameArea, 5);



    },
    stop : function() {
        clearInterval(this.interval);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
function drawScore(){
  ctx = myGameArea.context;
  ctx.font = "22px 'Quantico', sans-serif";
  ctx.fillStyle = "black";
  myGameArea.frameNo += .05;
  myScore = Math.round(myGameArea.frameNo)
  ctx.fillText("Score: " + myScore, 300, 550);
}

function mapObject () {
    this.radius = 200;
    this.angle = 0;
    this.x = 350;
    this.y = 310;
    this.width = 420
    this.height = 420


    this.image = new Image();
    this.image.src = "CircleFrame.png"

    this.updateMap = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.image, this.width / -2, this.height / -2, this.width, this.height);
        ctx.setLineDash([15, 20]);
        ctx.beginPath();

        ctx.arc(-(this.x)/360,-(this.y)/360,this.radius,0,2*Math.PI);
        // ctx.stroke();
        ctx.restore();
    }
}
function playerObject(){
    this.x = map.x - 12
    this.y = map.y + 169
    this.width = 30
    this.height = 30
    this.speed = 3
    this.velX = 0
    this.velY = 0
    this.jumping = false
    this.image = new Image();
    this.image.src = "hamster.png"

    this.updatePlayer = function(){
        ctx = myGameArea.context;
        ctx.save();
        // check keys

        if (keys[38] || keys[32]) {
            // up arrow or space
            if(!this.jumping){  // if player.jumping = false
              this.jumping = true;
              this.velY = -this.speed*2; //Negative so it can be lessened by the gravity, which is a positive number and a fraction
            }
        }
        this.velY += gravity;
        this.y += this.velY;
        if(this.y >= 500 - this.height){
            this.y = 500 - this.height;
            this.jumping = false;
        }


        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      //  ctx.fillStyle = '#3582ba';
      //  ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.crashWith = function(otherobj) {
      var myleft = this.x;
      var myright = this.x + (this.width) + 12;
      var mytop = this.y;
      var mybottom = this.y + (this.height);
      var otherleft = otherobj.x;
      var otherright = otherobj.x + (otherobj.width) - 50;
      var othertop = otherobj.y;
      var otherbottom = otherobj.y + (otherobj.height);
      var crash = true;
      if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
          crash = false;
      }
      //for grounded square blocks
        if (mybottom < othertop && myright > otherleft+10 && myleft < otherright+20){
          if (this.y > otherobj.plat){
            this.jumping = false
            this.y = otherobj.plat
          }
      }
      return crash;
    }
}
// The type "keyup" event happens when the key is released
document.body.addEventListener("keydown", function(e) {
    console.log("DOWN")
    keys[e.keyCode] = true;   // e.keycode will return the ascii code for
});
document.body.addEventListener("keyup", function(e) {
    console.log("UP")
    keys[e.keyCode] = false;
});
  function blockObject(width, height, image, x, y, speed,rotate, plat, reverse)  {
      this.RoriginX = [440,455,425]
      this.RoriginY = [180,153,190]
      this.RoriginR = 11.6

      this.originX = [258,244,275]
      this.originY = [436,455,415]
      this.originR = 11.6

      this.width = width;
      this.height = height;

      this.speed = speed;
      this.angle = rotate;
      this.moveAngle = reverse;
      this.x = x;
      this.y = y;
      this.plat = plat;


      this.image = new Image();
      this.image.src = image
      this.updateBlock = function() {

          ctx = myGameArea.context;
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.angle);
          ctx.drawImage(this.image, this.width / -2, this.height / -2, this.width, this.height);
          // ctx.fillStyle = color;
          // ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
          ctx.restore();
      }
        this.newPos = function() {
        this.angle += this.moveAngle * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
        }
}
function updateGameArea() {
  if (player.crashWith(blockGroup[0]) ||
  player.crashWith(blockGroup[1]) ||
  player.crashWith(blockGroup[2]) ||
  player.crashWith(blockGroup[3]) ||
  player.crashWith(blockGroup[4]) ||
  player.crashWith(blockGroup[5]) ||
  player.crashWith(blockGroup[6]) ||
  player.crashWith(blockGroup[7])) {
    myGameArea.stop()
    console.log('GAME OVER');
    gameOver = true;
    document.getElementById('die').play();
    document.getElementById('song').pause();
    $('.gameOver').show();


  }
  else {
    myGameArea.clear();
    map.angle += 0.5 * Math.PI / 180;
    map.updateMap();
    map.angle += 0.5 * Math.PI / 180;


      if((myScore) % 20 == 0){
        i = Math.floor(Math.random() * (8));

      }


      if((myScore) % 35 == 0){
        j = Math.floor(Math.random() * (8));

      }


      if((myScore) % 25 == 0){
        k = Math.floor(Math.random() * (8));

      }




    if (i == 0 || j == 0 || k == 0){
      blockGroup[0].newPos();
      blockGroup[0].updateBlock();

    }else{
      blockGroup[0].x = blockGroup[0].originX[1]
      blockGroup[0].y = blockGroup[0].originY[1]
      blockGroup[0].angle = blockGroup[0].originR
    }


    if (i == 4 || j == 4 || k == 4){
      blockGroup[4].newPos();
      blockGroup[4].updateBlock();
    }else{
      blockGroup[4].x = blockGroup[4].originX[2]
      blockGroup[4].y = blockGroup[4].originY[2]
      blockGroup[4].angle = blockGroup[4].originR
    }


    if (i == 1 || j == 1 || k == 1){
      blockGroup[1].newPos();
      blockGroup[1].updateBlock();
    }else{
      blockGroup[1].x = blockGroup[1].originX[1]
      blockGroup[1].y = blockGroup[1].originY[1]
      blockGroup[1].angle = blockGroup[1].originR
    }



    if (i == 2 || j == 2 || k == 2){

      blockGroup[2].newPos();
      blockGroup[2].updateBlock();
    }else{
      blockGroup[2].x = blockGroup[2].originX[0]
      blockGroup[2].y = blockGroup[2].originY[0]
      blockGroup[2].angle = blockGroup[2].originR
    }



    if (i == 3 || j == 3 || k == 3){
      blockGroup[3].newPos();
      blockGroup[3].updateBlock();
    }else{
      blockGroup[3].x = blockGroup[3].originX[0]
      blockGroup[3].y = blockGroup[3].originY[0]
      blockGroup[3].angle = blockGroup[3].originR
    }

    if ((i == 5 || j == 5 || k == 5) && myScore > 200){
      blockGroup[5].newPos();
      blockGroup[5].updateBlock();
    }else{
      blockGroup[5].x = blockGroup[5].RoriginX[1]
      blockGroup[5].y = blockGroup[5].RoriginY[1]
      blockGroup[5].angle = blockGroup[5].RoriginR
    }

    if ((i == 6 || j == 6 || k == 6) && myScore > 200){
      blockGroup[6].newPos();
      blockGroup[6].updateBlock();
    }else{
      blockGroup[6].x = blockGroup[6].RoriginX[0]
      blockGroup[6].y = blockGroup[6].RoriginY[0]
      blockGroup[6].angle = blockGroup[6].RoriginR
    }

    if ((i == 7 || j == 7 || k == 7) && myScore > 200){
      blockGroup[7].newPos();
      blockGroup[7].updateBlock();
    }else{
      blockGroup[7].x = blockGroup[7].RoriginX[2]
      blockGroup[7].y = blockGroup[7].RoriginY[2]
      blockGroup[7].angle = blockGroup[7].RoriginR
    }








    //speed

    player.updatePlayer();
    drawScore();

  }
  if (gameOver) {
    console.log(myScore);
    $.ajax({
            type: 'POST',
            data: {myScore : myScore},
            url: '/endpoint',
            success: function (result) {
              console.log(result);
            },
            failure: function (errMsg) {
                console.log(errMsg);
            }
    });
  }
}
