$(document).ready(function (){

    // *** Game Functionality ***

    //Defining a character. The player and enemies will both be characters.
    function character(src, x, y, z){
        this.size = 150 / 4;// relative to the canvas size.
        this.x = x;// characters x location.
        this.y = y;// characters y location.
        this.z = z;// characters direction.

        //Creating an image from the provided source.
        this.image = new Image();
        this.image.src = src;

        //The update method adjusts the characters x and y locations depending on its direction.
        this.update = function(){
            switch (this.z){
                case 0: // up
                    if (this.y > 0)this.y-=4;//this prevents the players character leaving the screen.
                    break;
                case 1: // left
                    this.x+=4;
                    break;
                case 2: // down
                    //this prevents the players character leaving the screen.
                    if (this.y < $("#game-screen")[0].height - this.size)this.y+=4;
                    break;
                case 3: // right
                    this.x-=4;
                    break;
                default:
                    break;
            }
        };

        //Basic collision detection
        this.hasCollided = function(character){
            //Checking if image area of characters overlap.
            if (this.x > character.x - this.size && this.x < character.x + character.size &&
                this.y > character.y - this.size && this.y < character.y + character.size){
                return true;
            }
            return false;
        }
    }

    //Creating and running game instance.
    function startGame() {
        $("#game-screen").remove();//Removing current game instance if there is one.
        $("#game-container").append("<canvas id='game-screen'></canvas>");//Creating new Game canvas.
        $("#game-screen").css("height", $("#game-screen").width()*.75 + "px");//Setting canvas height relative to width.
        var context = $("#game-screen")[0].getContext("2d");//Retrieving context to draw onto the canvas.

        //Creating in game variables
        var player = new character("images/dave-character-8bit.png", 0, 150/8*3, 4);
        var enemies = [];
        var enemyCount = 0;
        var enemySpeed = 50;

        //Adding key listener to alter the players direction.
        $(document).keypress(function(e) {
            switch(e.which){
                case 119: // key: w
                    player.z = 0; // up
                    break;
                case 115: // key: s
                    player.z = 2; // down
                    break;
            }
        });

        //Updating the game. triggered every 100 milliseconds. (Game Loop)
        var tick = setInterval(function () {
            if (enemyCount < 1){//Adding enemy when enemy count is 0
                //Generating random height for the enemy.
                var randomHeight = Math.floor(Math.random() * ($('#game-screen')[0].height - player.size));
                //Creating new enemy and adding it to the array.
                enemies.push(new character("images/8_bit_zombie_by_melolzugaming-d50kbqk.png",
                    Math.floor($('#game-screen')[0].width), randomHeight, 3));
                enemyCount = enemySpeed;//resetting count.
                enemySpeed-=2;//reducing next increment.
            }
            enemyCount--;//counting down.

            //Updating character location relative to their directions.
            player.update();
            for (var i = 0; i < enemies.length; i++){
                enemies[i].update();
            }

            //Refreshing the screen to illustrate the new character positions.
            context.clearRect(0, 0, $("#game-screen")[0].width, $("#game-screen")[0].height);// clearing screen
            context.drawImage(player.image, player.x, player.y, player.size, player.size);// drawing player
            for (var i = 0; i < enemies.length; i++){ // drawing enemies
                context.drawImage(enemies[i].image, enemies[i].x, enemies[i].y, enemies[i].size, enemies[i].size);
            }

            //Ending the game if a collision happens.
            for (var i = 0; i < enemies.length; i++) {
                if (enemies[i].hasCollided(player)){ //If a collision has happened end the game.
                    //displaying game over message.
                    context.fillText("Game Over", $("#game-screen")[0].width / 2.5, $("#game-screen")[0].height / 3);
                    clearInterval(tick); //Exiting the game loop.
                    return true;
                }
            }
        }, 100);
    }

    //Adding functionality to trigger the starting of the game.
    $("#start-game-button").click(function() {
        startGame();
    });

    //Adjusting the Canvas height relative to the width on screen resize.
    $(window).resize(function() {
        $("#game-screen").css("height", $("#game-screen").width()*.75 + "px");
    });
});