class Bullet {
    constructor() {
        this.xBulletLocation = -1;
        this.yBulletLocation = -1;
        this.bulletWidth = 40;
        this.bulletHeight = 40;
        this.bulletYSpeed = 40;
        this.isBulletFired = false;
        this.bulletImage = new Image();
        this.bulletImage.src = "images/Actor/Bullet.png";
    }
}