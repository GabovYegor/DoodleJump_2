class ActorClass {
    constructor() {
        this.xActorLocation = 400;
        this.yActorLocation = 1100;
        this.actorWidth = 80;
        this.actorHeight = 80;
        this.yActorSpeed = 20;
        this.xActorSpeed = 10;
        this.actorDirection = false;
        this.accelerationOfGravity = 0.5;
        this.actorLeftStateImage = new Image();
        this.actorLeftStateImage.src = "images/Actor/ActorLeft.png";
        this.actorRightStateImage = new Image();
        this.actorRightStateImage.src = "images/Actor/ActorRight.png";
        this.actorCurrentStateImage = this.actorLeftStateImage
        this.actorShootStateImage = new Image();
        this.actorShootStateImage.src = 'images/Actor/ActorShoot.png'
    }
}