$(document).on("click", ".btn-start", function() {
    $(this).fadeOut();
    startGame();
});

var current;

var interval = 1e3;

var blockSize = 40;

var container = new Array(10);

var $container;

var $block = $("<div />", {
    class: "block"
});

function init() {
    $container = $(".tetris-container");
    for (var x = 0; x < container.length; x++) {
        container[x] = new Array(20);
    }
    for (var i = 0; i < 10; i++) {
        for (var y = 0; y < 20; y++) {
            container[i][y] = 0;
        }
    }
}

function startGame() {
    init();
    current = new Items(0);
    render(current.getPosition());
}

function render(item) {
    for (var x in container) {
        for (var y in container[x]) {
            for (var i = 0; i < item.length; i++) {
                if (item[i][0] == x && item[i][1] == y) {
                    console.log("X,Y 맞음 : " + x + "," + y);
                    $block.css({
                        left: x * blockSize + "px",
                        top: y * blockSize + "px"
                    });
                    $container.append($block.clone());
                }
            }
        }
    }
}

$(document).on("click", "body", function() {
    current.move();
    console.log(current);
    render(current);
});

$(document).ready(function() {
    startGame();
});