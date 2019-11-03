class ActorClass {
    constructor() {
        this.bullet = new Bullet();
        this.xActorLocation = 400;
        this.yActorLocation = 1100;
        this.actorWidth = 80;
        this.actorHeight = 80;
        this.yActorSpeed = 20;
        this.xActorSpeed = 20;
        this.actorDirection = false;
        this.accelerationOfGravity = 0.7;
        this.actorLeftStateImage = new Image();
        this.actorLeftStateImage.src = "images/Actor/ActorLeft.png";
        this.actorRightStateImage = new Image();
        this.actorRightStateImage.src = "images/Actor/ActorRight.png";
        this.actorShootStateImage = new Image();
        this.actorShootStateImage.src = 'images/Actor/ActorShoot.png';
        this.actorCurrentStateImage = this.actorLeftStateImage;
    }
}