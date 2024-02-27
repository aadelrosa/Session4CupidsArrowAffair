var gameState="wait"
var splash;
var playbutton
var aboutbutton
var bg1;
var player;
var player_img;
var heart;
var heart1_img;
var heart2_img;
var heartGroup;

function preload(){
splash=loadImage("assets/splash3.gif")
bg1=loadImage("assets/bg2.jpg")
player_img=loadImage("assets/cupid.png")
heart1_img=loadImage("assets/heart.png")
heart2_img=loadImage("assets/heart1.png")
}

function setup(){
    createCanvas(windowWidth, windowHeight)

    playbutton = createImg("assets/playButton.png")
    playbutton.position(840, 523)
    playbutton.size(200, 90)
    playbutton.hide()

    aboutbutton = createImg("assets/aboutButton.png")
    aboutbutton.position(580, 520)
    aboutbutton.size(200, 95)
    aboutbutton.hide()

    player = createSprite(400, 600)
    player.addImage("main", player_img)
    player.visible = false

    heartGroup = new Group()
}

function draw(){
    if (gameState === "wait") {


        background(splash)
        playbutton.show()
        aboutbutton.show()
        //background_music.play();
    }

    aboutbutton.mousePressed(() => {
        playbutton.hide();
        aboutbutton.hide();
        gameState = "about";
    })

    if (gameState == "about") {
        aboutgame();
    }

    playbutton.mousePressed(() => {
        playbutton.hide();
        aboutbutton.hide();
        gameState = "play";
    })

    if (gameState == "play") {
        //background_music.stop();
        background(bg1)
        player.visible = true
        spawnHearts()
    }
}

function aboutgame() {

    swal({
        title: "About Game === How to Play!!",
        text: "Shoot the hearts and escape from the black hearts!\nUse Arrow Keys to move up and down and Space Bar to release the Arrows",
        textAlign: "center",
        imageUrl: "assets/logo.gif",
        imageSize: "200x200",
        confirmButtonText: "Let's fly!",
        confirmButtonColor: "purple",
    },

        function () {
            gameState = "wait"
        }
    )

}

function spawnHearts() {

    if (frameCount % 100 == 0) {

        var randy = Math.round(random(50, 600))
        heart = createSprite(width, randy);
        heart.scale = 0.25
        heart.velocityX = -8;

        var randimg = Math.round(random(1, 2))
        switch (randimg) {

            case 1:
                heart.addImage(heart1_img)
                heart.setCollider("rectangle", 0, 0, 250, 300)
                break;

            case 2:
                heart.addImage(heart2_img)
                heart.setCollider("rectangle", 0, 0, heart.width, heart.height)
                break;

            default: break;

        }

        heart.depth = player.depth;
        player.depth = player.depth + 1;

        heartGroup.add(heart);

    }

}