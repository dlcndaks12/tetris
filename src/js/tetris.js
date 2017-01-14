$(document).on('click', '.btn-start', function() {
    $(this).fadeOut();

    startGame();
});

var current;
var interval = 1000;
var blockSize = 35;
var container = new Array(10);
var fixItem = [];
var $container;
var $block = $('<div />', {
    class: 'block'
});

function getRandom() {
    var idx = Math.ceil(Math.random() * 7 - 1);
    return idx;
}

function init() {
    $container = $('.tetris-container');

    for(var x=0; x < container.length; x++) {
        container[x] = new Array(20);
    }

    for(var i=0; i < 10; i++) {
        for(var y=0; y < 20; y++) {
            container[i][y] = 0;
        }
    }
}

function startGame() {
    init();

    current = new Items(getRandom());
    render(current.getPosition());

    /*setInterval(function() {
        current.move(2);
        render(current.getPosition());
    }, interval);*/
}

function endPosition() {
    /* 끝에 도달한 블럭의 위치값을 저장시킨다. */
    var endBlock = current.getPosition();
    for(var i in endBlock) {
        fixItem.push(endBlock[i]);
    }

    var random = getRandom();
    current = new Items(random);
}

function render(current) {
    $container.empty();

    for(var x in container) {
        for(var y in container[x]) {
            for(var i in fixItem) {
                if(fixItem[i][0] == x && fixItem[i][1] == y) {
                    $block.css({
                        left: x * blockSize + 'px',
                        top: y * blockSize + 'px'
                    });

                    $container.append($block.clone());
                }
            }

            for(var i=0; i < current.length; i++) {
                if(current[i][0] == x && current[i][1] == y) {
                    $block.css({
                        left: x * blockSize + 'px',
                        top: y * blockSize + 'px'
                    });

                    $container.append($block.clone());
                }
            }
        }
    }
}

$(document).on('keydown', 'body', function(e) {
    var keyCode = e.keyCode;

    if(keyCode == 37) {
        current.move(0);
    }else if(keyCode == 38) {
        current.rotate();
    }else if(keyCode == 39) {
        current.move(1);
    }else if(keyCode == 40) {
        current.move(2)
    }

    render(current.getPosition());
});

$(document).ready(function() {
    startGame();
});