function loadMap(path, map) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            map.parseMapProperties(request.responseText)
        }
    };
    request.open("GET", path, false);
    request.send();
}

function initEventListeners(game) {
    addEventListener('keydown', function (e) {
        if (e.code === 'ArrowRight') {
            game.isMoveRight = true;
            if(!game.actor.actorCurrentStateImage === game.actor.actorShootStateImage) {
                game.actor.actorCurrentStateImage = game.actor.actorRightStateImage;
            }
        }

        if (e.code === 'ArrowLeft') {
            game.isMoveLeft = true;
            if(!game.actor.actorCurrentStateImage === game.actor.actorShootStateImage) {
                game.actor.actorCurrentStateImage = game.actor.actorLeftStateImage;
            }
        }

        if(e.code === 'Space') {
            game.actor.actorCurrentStateImage = game.actor.actorShootStateImage;
        }
    });

    addEventListener('keyup', function (e) {
        if(e.code === 'ArrowRight'){
            game.isMoveRight = false;
        }

        if(e.code === 'ArrowLeft'){
            game.isMoveLeft = false;
        }

        if (e.code === 'Space') {
            game.actor.actorCurrentStateImage = game.actor.actorLeftStateImage;
        }
    });
}