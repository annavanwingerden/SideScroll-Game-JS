class Player {
    constructor(game){
        this.game = game;
        this.x = 20;
        this.y;
        this.spriteWidth = 200; 
        this.spriteHeight = 200; 
        this.width;
        this.height;
        this.speedY;
        this.flapSpeed;
        this.collisionX;
        this.collisionY;
        this.collisionRadius;
        this.collided;
        this.energy = 30;
        this.maxEnergy = this.energy * 2;
        this.minEnergy = 15;
        this.charging = false;
        this.image = new Image();
        this.image.src = 'assets/images/player.png'; 
    }

    draw () {
        this.game.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    update (){
        this.handleEnergy();
        this.y += this.speedY;
        this.collisionY = this.y + this.height * 0.5;
        if (!this.isTouchingBottom() && !this.charging) {
            this.speedY += this.game.gravity;
        } else {
            this.speedY = 0;
        }
        // Bottom boundary
        if (this.isTouchingBottom()){
            this.y = this.game.height - this.height;
        } 
    }

    resize(){
        this.width = this.spriteWidth * this.game.ratio;
        this.height = this.spriteHeight * this.game.ratio;
        this.y = this.game.height * 0.5 - this.height * 0.5;
        this.speedY = -8 * this.game.ratio;
        this.flapSpeed = 5 * this.game.ratio;
        this.collisionRadius = this.width * 0.5;
        this.collisionX = this.x + this.width * 0.5;
        this.collided = false;
        this.barSize = Math.ceil(5 * this.game.ratio); 
    }

    startCharge (){
        if(this.energy > 0){
            this.charging = true;
            this.game.speed = this.game.maxSpeed;
        }
    }

    stopCharge (){
        this.charging = false;
        this.game.speed = this.game.minSpeed;
    }

    isTouchingTop(){
        return this.y <= 0;
    }

    isTouchingBottom(){
        return this.y >= this.game.height - this.height;
    }

    handleEnergy(){
        if (this.game.eventUpdate){
            if (this.energy < this.maxEnergy){  
                this.energy += 0.5;
            }
            if (this.charging){
                this.energy -= 5;
                if (this.energy <= 0){
                    this.energy = 0; 
                    this.stopCharge();
                }
            }
        }
    }

    flap (){
        this.stopCharge();
        if (!this.isTouchingTop()){
            this.speedY = -this.flapSpeed;
        }
    }
}
