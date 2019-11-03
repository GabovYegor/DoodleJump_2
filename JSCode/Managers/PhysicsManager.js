class PhysicsManager {
    constructor(actor = new ActorClass()) {
        this.actor = actor;
    }

    jumpCalculatePosition() {
        this.actor.yActorSpeed -= this.actor.accelerationOfGravity;
        this.actor.yActorLocation -= this.actor.yActorSpeed;
        this.actor.actorDirection = this.actor.yActorSpeed > 0;
    }

    moveRight() {
        this.actor.xActorLocation += this.actor.xActorSpeed
        if(this.actor.xActorLocation >= canvas.width) {
            this.actor.xActorLocation = 0
        }
    }

    moveLeft() {
        this.actor.xActorLocation -= this.actor.xActorSpeed
        if(this.actor.xActorLocation <= 0) {
            this.actor.xActorLocation = canvas.width
        }
    }

    bulletCalculatePosition(){
        this.actor.bullet.yBulletLocation -= this.actor.bullet.bulletYSpeed;
        if(this.actor.bullet.yBulletLocation < 0){
            this.actor.bullet.isBulletFired = false;
        }
    }
}