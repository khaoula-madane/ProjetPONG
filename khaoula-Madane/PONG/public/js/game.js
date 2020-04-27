var game = {
  groundWidth : null,
  groundHeight : null,
  groundColor : "#000000",
  netColor : "#39D7C9",
  netWidth : null,
  socket: null,
  groundLayer : null,  
  scoreLayer : null,
  playersBallLayer : null,
  scorePosPlayer1 : 250,
  scorePosPlayer2 : 450,
  loaded: false,
  clientId: null,
  ball : {
    width : 10,
    height : 10,
    color : "#FFFF00",
    posX : 200,
    posY : 200,
    speed : 1,
    directionX : 1,
    directionY : 1,

  
    coord: function(){
		 return [this.posX + this.directionX * this.speed, this.posY + this.directionY * this.speed]
	},
    move : function(coord) {
      this.posX = coord[0];
      this.posY = coord[1];
	  this.directionX = coord[2];	
    },
  },
  ais : [

  ],
  teams: [
			
	{
		id : 1,
		score: 0,
		playerOne : {
			id:1,
			width : 10,
			height : 50,
			color : "#39D7C9",
			posX : 30,
			posY : 50,	
			score: 0,
			goUp : false,
			goDown : false,
			usable: true,
			clientId: null,
			originalPosition : "left"

		 },	
		 playerTwo : {
			id:2,
			width : 10,
			height : 50,
			color : "#39D7C9",
			posX : 30,
			posY : 250,
			score: 0,
			goUp : false,
			goDown : false,
			usable: true,
			clientId: null,
			originalPosition : "left"
		}
	},
	{	
		id : 2,
		score: 0,
		playerOne : {
			id:1,
			width : 10,
			height : 50,
			color : "#39D7C9",
			posX : 650,
			posY : 50,
			goUp : false,
			goDown : false,
			usable: true,
			clientId: null,
			originalPosition : "right"
		},
		playerTwo : {
			id:2,
			width : 10,
			height : 50,
			color : "#39D7C9",
			posX : 650,
			posY : 250,
			goUp : false,
			goDown : false,
			usable: true,
			clientId: null,
			originalPosition : "right"
		}
	}			
],
 
  init : function(param) {
	  
	this.groundWidth = param.groundWidth;
	this.groundHeight = param.groundHeight;
	
    this.groundLayer = game.display.createLayer("terrain", this.groundWidth, this.groundHeight, undefined, 0, "#39ACD7", 200, 200); 
   
    game.display.drawRectangleInLayer(this.groundLayer, param.netWidth, this.groundHeight, param.netColor, this.groundWidth/2 - param.netWidth/2, 0);
    this.scoreLayer = game.display.createLayer("score", this.groundWidth, this.groundHeight, undefined, 1, undefined, 200, 200);
   
    game.display.drawTextInLayer(this.scoreLayer, "SCORE", "10px Arial", "#39ACD7", 10, 10);
    this.playersBallLayer = game.display.createLayer("joueursetballe", this.groundWidth, this.groundHeight, undefined, 2, undefined, 200, 200);  
   
    game.display.drawTextInLayer(this.playersBallLayer, "JOUEURSETBALLE", "10px Arial", "#39ACD7", 100, 100);


    this.displayScore(this.teams[0].score, this.teams[0].score);
    this.displayBall(200,200);
    this.displayPlayers();

    this.initKeyboard(game.control.onKeyDown, game.control.onKeyUp);
    
	
    game.ais[0] = new ai(this.teams[0].id,this.teams[0].playerTwo, this.ball);
    game.ais[1] = new ai(this.teams[1].id,this.teams[1].playerOne, this.ball);
    game.ais[2] = new ai(this.teams[1].id,this.teams[1].playerTwo, this.ball);
	
	param.stoppedAi.forEach(function(element){
		game.control.stopIa(element);
	});
	this.disabledPlayers(param)
	
	this.loaded = true;
  },
	disabledPlayers: function(param)
	{
		console.log(param)
		console.log(this)
		if(this.teams[0].playerOne.idClient == null ){
			this.teams[0].playerOne.clientId = param.teams[0].playerOne.idClient;	
		}
		if(this.teams[0].playerTwo.clientId == null){
			this.teams[0].playerTwo.clientId = param.teams[0].playerTwo.idClient;
		}
		if(this.teams[1].playerOne.idClient == null){
			this.teams[1].playerOne.clientId = param.teams[1].playerOne.idClient;
		}
		if(this.teams[1].playerTwo.idClient == null){
			this.teams[1].playerTwo.clientId = param.teams[1].playerTwo.idClient;
		}
		
		if(this.teams[0].playerOne.clientId != game.clientId){
			this.teams[0].playerOne.usable = false;
			console.log(false)
		}
		if(this.teams[0].playerTwo.clientId != null && this.teams[0].playerTwo.clientId != game.clientId){
			this.teams[0].playerTwo.usable = false;
				console.log(false)
		}
		if(this.teams[1].playerOne.clientId != null && this.teams[1].playerOne.clientId != game.clientId){
			this.teams[1].playerOne.usable = false;
				console.log(false)
		}
		if(this.teams[1].playerTwo.clientId != null && this.teams[1].playerTwo.clientId != game.clientId){
			this.teams[1].playerTwo.usable = false;
				console.log(false)
		}
	},
  displayScore : function(scorePlayer1, scorePlayer2) {
    game.display.drawTextInLayer(this.scoreLayer, scorePlayer1, "60px Arial", "#FFFFFF", this.scorePosPlayer1, 55);
    game.display.drawTextInLayer(this.scoreLayer, scorePlayer2, "60px Arial", "#FFFFFF", this.scorePosPlayer2, 55);
  },
  updateScore: function(data)
  {
	if(this.scoreLayer !== null)
	{
		this.scoreLayer.clear();
		this.displayScore(data[0],data[1]);
	}
 },
  displayBall : function() {
    game.display.drawRectangleInLayer(this.playersBallLayer, this.ball.width, this.ball.height, this.ball.color, this.ball.posX, this.ball.posY);
  },
  displayPlayers : function() {
    game.display.drawRectangleInLayer(this.playersBallLayer, this.teams[0].playerOne.width, this.teams[0].playerOne.height, this.teams[0].playerOne.color, this.teams[0].playerOne.posX, this.teams[0].playerOne.posY);
    game.display.drawRectangleInLayer(this.playersBallLayer, this.teams[0].playerTwo.width, this.teams[0].playerTwo.height, this.teams[0].playerTwo.color, this.teams[0].playerTwo.posX, this.teams[0].playerTwo.posY);
    game.display.drawRectangleInLayer(this.playersBallLayer, this.teams[1].playerOne.width, this.teams[1].playerOne.height, this.teams[1].playerOne.color, this.teams[1].playerOne.posX, this.teams[1].playerOne.posY);
    game.display.drawRectangleInLayer(this.playersBallLayer, this.teams[1].playerTwo.width, this.teams[1].playerTwo.height, this.teams[1].playerTwo.color, this.teams[1].playerTwo.posX, this.teams[1].playerTwo.posY);
  },
  coordBall : function() { 
	return this.ball.coord();
  },
  
    clearLayer : function(targetLayer) {
    targetLayer.clear();
  },
  initKeyboard : function(onKeyDownFunction, onKeyUpFunction) {
    window.onkeydown = onKeyDownFunction;
    window.onkeyup = onKeyUpFunction;
  },
  /* : function() {
	if (game.playerOne.scorePlayer1 == 5) {
		document.write("LE JOUEUR 1 A GAGNER !!");
		return true; }
	if (game.playerTwo.scorePlayer2 == 5) {
		document.write("LE JOUEUR 2 A GAGNER !!");
		return true;
	}
	return false;
},*/
 coordPlayers : function()
 {
	var coords = {
		teams: [
			{
				player1 : {
					y : game.teams[0].playerOne.posY
				},
				player2 : {
					y : game.teams[0].playerTwo.posY
				}
			},
			{
				player1 : {
					y : game.teams[1].playerOne.posY
				},
				player2 : {
					y : game.teams[1].playerTwo.posY
				}
			},
		]
	};
	if ( game.control.controlSystem == "KEYBOARD" ) {
     
      if ( game.teams[0].playerOne.goUp ) {
          if(coords.teams[0].player1.y > 0){
            coords.teams[0].player1.y-=5;
        }
      } else if ( game.teams[0].playerOne.goDown ) {
          if((coords.teams[0].player1.y+50) < this.groundHeight){
            coords.teams[0].player1.y+=5;
        }
      }
	  
	  if ( game.teams[0].playerTwo.goUp ) {
          if(coords.teams[0].player2.y > 0){
            coords.teams[0].player2.y-=5;
        }
      } else if ( game.teams[0].playerTwo.goDown ) {
          if((coords.teams[0].player2.y+50) < this.groundHeight){
            coords.teams[0].player2.y+=5;
        }
      }
	  
	  
      if ( game.teams[1].playerOne.goUp ) {
          if(coords.teams[1].player1.y > 0){
            coords.teams[1].player1.y-=5;
        }
      } else if ( game.teams[1].playerOne.goDown ) {
          if((coords.teams[1].player1.y+50) < this.groundHeight){
            coords.teams[1].player1.y+=5;
        }
      }
	  
	  if ( game.teams[1].playerTwo.goUp ) {
          if(coords.teams[1].player2.y > 0){
            coords.teams[1].player2.y-=5;
        }
      } else if ( game.teams[1].playerTwo.goDown ) {
          if((coords.teams[1].player2.y+50) < this.groundHeight){
            coords.teams[1].player2.y+=5;
        }
      }
    }
	return coords;
	
 }, 
 movePlayers : function(playersCoords) {
	game.teams[0].playerOne.posY = playersCoords.teams[0].player1.y;
	game.teams[0].playerTwo.posY = playersCoords.teams[0].player2.y;
	game.teams[1].playerOne.posY = playersCoords.teams[1].player1.y;
	game.teams[1].playerTwo.posY = playersCoords.teams[1].player2.y;
 }
};
