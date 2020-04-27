"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const path_2 = __importDefault(require("path"));
var express = require('express');
const app = express_1.default();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'public', 'pong.html'));
});

app.use("/js", express.static('../public/js/'));


	this.users = []; 

	let game = {
		groundWidth : 700,
		groundHeight : 400,		
		netWidth : 6,
		netColor : "#FFFFFF",

		init: false,
		stoppedAi : [],
		ball : {
			width : 10,
			height : 10,
			color : "#FFFF00",
			posX : 200,
			posY : 200,
			speed : 1,
			directionX : 1,
			directionY : 1,

		
			collide : function(anotherItem) {
				if ( !( this.posX >= anotherItem.posX + anotherItem.width || this.posX <= anotherItem.posX - this.width || this.posY >= anotherItem.posY + anotherItem.height || this.posY <= anotherItem.posY - this.height ) ) {
				
				return true;
				} 
			return false;
			},
			bounce : function(soundToPlay) {
				if ( game.ball.posX > game.groundWidth || this.posX < 0 ) {
					this.directionX = -this.directionX;
					
				}
				if ( this.posY > game.groundHeight || this.posY < 0  ) {
					this.directionY = -this.directionY;

				}    
			},
			coord: function(){
				return [this.posX + this.directionX * this.speed, this.posY + this.directionY * this.speed]
			},
			move : function(coord) {
				this.posX = coord[0];
				this.posY = coord[1];	  
			}
		
		},

		teams:			
			[
				{ 
				id : 1,
				score: 0,
				playerOne : {
					width : 10,
					height : 50,
					color : "#39D7C9",
					posX : 30,
					posY : 50,	
					score: 0,
					goUp : false,
					goDown : false,
					originalPosition : "left",
					idClient: null

				 },	
				 playerTwo : {
					width : 10,
					height : 50,
					color : "#39D7C9",
					posX : 30,
					posY : 250,
					score: 0,
					goUp : false,
					goDown : false,
					originalPosition : "left",
					idClient: null
				}
				},
				{
				id : 2,
				score: 0,
				playerOne : {
					width : 10,
					height : 50,
					color : "#39D7C9",
					posX : 650,
					posY : 50,
					goUp : false,
					goDown : false,
					originalPosition : "right",
					idClient: null
				},
				playerTwo : {
					width : 10,
					height : 50,
					color : "#39D7C9",
					posX : 650,
					posY : 250,
					goUp : false,
					goDown : false,
					originalPosition : "right",
					idClient: null
				}}
			]		
		,		moveBall: function(coord) {
			if(coord[0] == this.ball.posX && coord[1] == this.ball.posY)
				return;
			this.ball.move(coord);
			this.ball.bounce(this.wallSound);
	
			if(this.ball.posX < 0){
				this.teams[1].score += 1;
				this.ball.posX = 200;
				this.ball.posY = 200;
				return [this.teams[0].score, this.teams[1].score];
			}else if(this.ball.posX > this.groundWidth){
				this.teams[0].score += 1;
				this.ball.posX = 400;
				this.ball.posY = 200;
				return [this.teams[0].score, this.teams[1].score];
			}
			return null;
		},
		assignPlay : function(id)
		{
			if(this.teams[0].playerOne.idClient == null)
			{
				this.teams[0].playerOne.idClient = id;
			}else if(this.teams[0].playerTwo.idClient == null)
			{
				this.teams[0].playerTwo.idClient = id;
			}else if(this.teams[1].playerOne.idClient == null)
			{
				this.teams[1].playerOne.idClient = id;
			}else if(this.teams[1].playerTwo.idClient == null)
			{
				this.teams[1].playerTwo.idClient = id;
			}
			
		},

		collideBallWithPlayersAndAction : function() { 
		  if ( this.ball.collide(game.teams[0].playerOne) || this.ball.collide(game.teams[0].playerTwo) ) {
				game.ball.directionX = -game.ball.directionX;
		  }
		  
		  if ( this.ball.collide(game.teams[1].playerOne) || this.ball.collide(game.teams[1].playerTwo) ) {
				game.ball.directionX = -game.ball.directionX;
		  }
		  return game.ball.directionX;
		}		
	};

	let initPlayersCoords = {
		teams : [
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
		}]
		
	};
	
	
    const room = "room";
	setInterval(function(){
		let score = game.moveBall(game.ball.coord());
		if(score !== null)
		{	
		
			
			io.to(room).emit('score',score);
			
		}
		var direction = game.collideBallWithPlayersAndAction();

		io.to(room).emit('ball',[game.ball.posX,game.ball.posY,direction]);
		
		let message = {
				teams : [
				{
					player1 : {
						y : game.teams[0].playerOne.posY,
						idClient : game.teams[0].playerOne.idClient
					},
					player2 : {
						y : game.teams[0].playerTwo.posY,
						idClient : game.teams[0].playerTwo.idClient						
					}
				},
				{
					player1 : {
						y : game.teams[1].playerOne.posY,
						idClient : game.teams[1].playerOne.idClient
					},
					player2 : {
						y : game.teams[1].playerTwo.posY,
						idClient : game.teams[1].playerTwo.idClient
					}
				}]
		};
		
		io.to(room).emit('players',message);
		


	}, 5);
		
io.on('connection', (socket) => {
    console.log('a user connected', socket);
    console.log("Un joueur vient de se connecter");
	
   
    socket.join(room);	

	game.assignPlay(socket.id);
	io.to(room).emit('init',game);
	io.to(room).emit('score',[0,0]);
	io.to(room).emit('ball',[game.ball.posX,game.ball.posY]);

	
	io.to(room).emit('players',initPlayersCoords);
   
    socket.on('disconnect', () => {
        console.log('Joueur Déconnecté');
    });

	socket.on('movePlayers', (message) => {
		
		game.teams[0].playerOne.posY  = message.teams[0].player1.y;
		game.teams[0].playerTwo.posY  = message.teams[0].player2.y;
		game.teams[1].playerOne.posY  = message.teams[1].player1.y;
		game.teams[1].playerTwo.posY  = message.teams[1].player2.y;
	
	});
	
	socket.on('stopIa', (message) => {
		game.stoppedAi.push(message);
		if(message[0] == 0)
		{
			game.teams[0].playerTwo.idClient = socket.id;
		}
		else if(message[0] == 1)
		{	
			game.teams[1].playerOne.idClient = socket.id;
		}
		else if(message[0] == 2)
		{
			game.teams[1].playerTwo.idClient = socket.id;
		}
		io.to(room).emit('stopIaReturn',[message,game]);
	});

   
    io.to(room).emit('welcome', room);
});
http.listen(3020, () => {
	console.info('HTTP server started on port 3020');
});
