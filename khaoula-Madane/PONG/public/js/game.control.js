game.control = {
  
  controlSystem : null,
  mousePointer : null,
   
  onKeyDown : function(event) {
   
    game.control.controlSystem = "KEYBOARD";
	if(game.teams[0].playerOne.usable == true){
		if ( event.keyCode == game.keycode.KEYDOWN ) { 
			game.teams[0].playerOne.goDown = true;
		} else if ( event.keyCode == game.keycode.KEYUP ) { 
			game.teams[0].playerOne.goUp = true;
		}
	}
	if(game.teams[0].playerTwo.usable == true){
		if ( event.keyCode == game.keycode.KEYQ ) {
			console.log(game.clientId);
			game.socket.emit('stopIa',[0, game.clientId, 0]);
			game.teams[0].playerTwo.goDown = true;
		} else if ( event.keyCode == game.keycode.KEYA ) { 
			game.socket.emit('stopIa',[0, game.clientId, 0]);
			game.teams[0].playerTwo.goUp = true;
		}
	}
	if(game.teams[1].playerOne.usable == true){	
		if ( event.keyCode == game.keycode.KEYG ) { 
			game.socket.emit('stopIa',[1, game.clientId, 1]);
			game.teams[1].playerOne.goDown = true;
		} else if ( event.keyCode == game.keycode.KEYT ) { 
			game.socket.emit('stopIa',[1, game.clientId,1]);
			game.teams[1].playerOne.goUp = true;
		}
	}
	if(game.teams[1].playerTwo.usable == true){		
		if ( event.keyCode == game.keycode.KEYM ) {
			game.socket.emit('stopIa',[2, game.clientId, 1]);
			game.teams[1].playerTwo.goDown = true;
		} else if ( event.keyCode == game.keycode.KEYP ) { 
			game.socket.emit('stopIa',[2, game.clientId, 1]);
			game.teams[1].playerTwo.goUp = true;
		}
	}
  },
  stopIa : function(id)
  {
	  if(game.ais[id[0]] != undefined && game.ais[id[0]] != undefined && game.ais[id[0]].player !== null )
	  {
		game.ais[id[0]].enabled = false;
		if(game.ais[id[0]].player.id == 1)
		{
			game.teams[id[2]].playerOne.clientId = id[1]
		}
		else if(game.ais[id[0]].player.id == 2)
		{
	     	game.teams[id[2]].playerTwo.clientId = id[1]
		}
	  }
  }, 
  onKeyUp : function(event) {
	if(game.teams[0].playerOne.usable == true){
		if ( event.keyCode == game.keycode.KEYDOWN ) { 
			game.teams[0].playerOne.goDown = false;
		} else if ( event.keyCode == game.keycode.KEYUP ) { 
			game.teams[0].playerOne.goUp = false;
		}
	}
	if(game.teams[0].playerTwo.usable == true){
		if ( event.keyCode == game.keycode.KEYQ ) {
			game.socket.emit('stopIa',[0, game.clientId, 0]);
			game.teams[0].playerTwo.goDown = false;
		} else if ( event.keyCode == game.keycode.KEYA ) { 
			game.socket.emit('stopIa',[0, game.clientId, 0]);
			game.teams[0].playerTwo.goUp = false;
		}
	}
	if(game.teams[1].playerOne.usable == true){	
		if ( event.keyCode == game.keycode.KEYG ) { 
			game.socket.emit('stopIa',[1, game.clientId, 1]);
			game.teams[1].playerOne.goDown = false;
		} else if ( event.keyCode == game.keycode.KEYT ) { 
			game.socket.emit('stopIa',[1, game.clientId, 1]);
			game.teams[1].playerOne.goUp = false;
		}
	}
	if(game.teams[1].playerTwo.usable == true){		
		if ( event.keyCode == game.keycode.KEYM ) {
			game.socket.emit('stopIa',[2, game.clientId, 1]);
			game.teams[1].playerTwo.goDown = false;
		} else if ( event.keyCode == game.keycode.KEYP ) { 
			game.socket.emit('stopIa',[2, game.clientId, 1]);
			game.teams[1].playerTwo.goUp = false;
		}
	}
  },
   
  onMouseMove : function(event) {
    
    game.control.controlSystem = "MOUSE";
 
    if ( event ) {
      game.control.mousePointer = event.clientY;
    }
  
    if ( game.control.mousePointer > game.playerOne.posY ) {
      game.playerOne.goDown = true;
      game.playerOne.goUp = false;
    } else if ( game.control.mousePointer < game.playerOne.posY ) {
      game.playerOne.goDown = false;
      game.playerOne.goUp = true;
    } else {
      game.playerOne.goDown = false;
      game.playerOne.goUp = false;
    }
  }
};