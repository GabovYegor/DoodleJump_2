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
        this.bulletParameter.yBulletLocation -= this.bulletParameter.bulletYSpeed;
        if(this.bulletParameter.yBulletLocation < 0){
            return false
        }
        return true
    }
}