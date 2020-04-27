class ai {
  
 
  constructor(team, player, ball) {
    this.team = team;
	this.player = player;
    this.ball = ball;
	this.enabled = true;
	
  }
   
   move() {
	if(this.enabled === true)
	{
		if ( this.ball.directionX == 1 ) {
		  if ( this.player.originalPosition == "right" ) {
			// follow
			return this.followBall();
		  }
		  if ( this.player.originalPosition == "left" ) {
			// center
			return this.goCenter();
		  }    
		} else {
		  if ( this.player.originalPosition == "right" ) {
			// center
			return this.goCenter();
		  }
		  if ( this.player.originalPosition == "left" ) {
			// follow
			return this.followBall();
		  }  
		}
	}
  }
 
  followBall() {
    if ( this.ball.posY < this.player.posY + this.player.height/2 ) {
      // la position de la balle est sur l'écran, au dessus de celle de la raquette
      this.player.posY -= 3;
    } else if ( this.ball.posY > this.player.posY + this.player.height/2 ) {
      // la position de la balle est sur l'écran, en dessous de celle de la raquette
      this.player.posY += 3;
    }
	return this.player.posY;
  }
 
  goCenter() {
    if ( this.player.posY + this.player.height/2 > game.groundHeight / 2 ) {
      this.player.posY--;
    } else if ( this.player.posY + this.player.height/2 < game.groundHeight / 2 ) {
      this.player.posY++;
    }
	
	return this.player.posY;
  }
}