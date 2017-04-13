var refreshInterval;

var block;

var score = 0;

var ingCnt = 0;

var nextItem;

var interval = 300;

var blockSize = 30;

var fixItem = [];

var $container;

var $block = $("<div />", {
    class: "block"
});

function init() {
    $container = $(".tetris-container");
    $container.empty();
    fixItem = [];
    ingCnt = 0;
    score = 0;
}

function getRandom() {
    var idx = Math.ceil(Math.random() * 7 - 1);
    return idx;
}

function startGame() {
    $(".gameover").hide();
    $(".start-area").fadeOut();
    $(".container").removeClass("blur");
    onKeydown();
    init();
    block = new BlockItem(getRandom());
    nextItem = getRandom();
    renderNext(nextItem);
    refreshInterval = setInterval(ingGame, interval);
}

function ingGame() {
    block.moveDown();
    render(block);
}

function gameOver() {
    $(".gameover").show();
    $(".gameover .save").show();
    $(".gameover .score .num").text(score);
    $(".container").addClass("blur");
}

//다음블럭
function renderNext(nextItemIdx) {
    var img = '<img src="../images/item' + nextItemIdx + '.png">';
    $(".next-block").html(img);
}

//난이도 상승
function levelUp() {
    ingCnt++;
    if (ingCnt == 30) {
        interval = 250;
        clearInterval(refreshInterval);
        refreshInterval = setInterval(ingGame, interval);
    }
    if (ingCnt == 60) {
        interval = 200;
        clearInterval(refreshInterval);
        refreshInterval = setInterval(ingGame, interval);
    }
    if (ingCnt == 90) {
        interval = 150;
        clearInterval(refreshInterval);
        refreshInterval = setInterval(ingGame, interval);
    }
    if (ingCnt == 120) {
        interval = 100;
        clearInterval(refreshInterval);
        refreshInterval = setInterval(ingGame, interval);
    }
}

//블럭의 움직임이 종료될때
function endPosition() {
    //끝에 도달한 블럭의 위치값을 저장시킨다.
    var endBlock = block.getCurrentBlock();
    for (var i in endBlock) {
        //블럭의 모양을 배열에 저장한다. ( 렌더링할때 색깔을 다르게 주기위해서 )
        endBlock[i][2] = block.getType();
        fixItem.push(endBlock[i]);
    }
    //라인클리어
    clearLine();
    //난이도상승
    levelUp();
    //종료 체크
    if (block.getCurrentBlock()[1][1] < 1) {
        clearInterval(refreshInterval);
        gameOver();
        return false;
    }
    //블럭을 새로 생성한다.
    block = new BlockItem(nextItem);
    //다음블럭값 을 생성한다.
    nextItem = getRandom();
    renderNext(nextItem);
}

//라인클리어
function clearLine() {
    var lineCnt = 0;
    for (var n = 0; n < 20; n++) {
        var rowNum = n;
        var row = [];
        for (var i in fixItem) {
            if (fixItem[i][1] == rowNum) {
                row.push(fixItem[i]);
            }
        }
        //한줄이 모두 채워졌을때
        if (row.length == 10) {
            //고정된블럭 배열에서 채워진 한줄을 삭제한다.
            deleteArray(fixItem, row);
            //한줄을 삭제후 빈행을 채운다. arrange(삭제된 행 번호)
            arrange(row[0][1]);
            score += 100;
            lineCnt++;
        }
    }
    //지워진 줄수가 2개 이상일때 보너스 점수추가
    if (lineCnt > 1) {
        score += (lineCnt - 1) * 100;
    }
    $(".score-area .num").text(score);
}

//고정된블럭 배열에서 선택된 행 삭제
function deleteArray(fixed, row) {
    for (var i in fixed) {
        var testBlock = fixed[i];
        for (var j in row) {
            var testRow = row[j];
            if (testRow[0] == testBlock[0] && testRow[1] == testBlock[1]) {
                fixItem.splice(i, 1);
                deleteArray(fixed, row);
                return;
            }
        }
    }
}

//삭제된 행의 빈자리를 채움
function arrange(row) {
    for (var i in fixItem) {
        var testItem = fixItem[i][1];
        if (testItem < row) {
            testItem++;
            if (testItem != 20) {
                fixItem[i][1]++;
            }
        }
    }
}

//고정된 블럭배열, 현재 선택된 블럭을 화면에 그림
function render(block) {
    //현재 선택된 블럭
    var currentBlock = block.getCurrentBlock();
    $container.empty();
    //고정블럭 그리기
    for (var i = 0; i < fixItem.length; i++) {
        $block.css({
            left: fixItem[i][0] * blockSize + "px",
            top: fixItem[i][1] * blockSize + "px"
        });
        $container.append($block.clone().attr("class", "block type" + fixItem[i][2]));
    }
    //현재블럭 그리기
    for (var i = 0; i < currentBlock.length; i++) {
        $block.css({
            left: currentBlock[i][0] * blockSize + "px",
            top: currentBlock[i][1] * blockSize + "px"
        });
        $container.append($block.clone().attr("class", "block type" + block.getType()));
    }
}

//keydown 이벤트 bind
function onKeydown() {
    $("body").off().on("keydown", function(e) {
        var keyCode = e.keyCode;
        if (keyCode == 37) {
            block.moveLeft();
        } else if (keyCode == 38) {
            block.rotate();
        } else if (keyCode == 39) {
            block.moveRight();
        } else if (keyCode == 40) {
            block.moveDown();
        } else if (keyCode == 32) {
            block.moveEnd();
        }
        render(block);
    });
}

$(document).on("click", ".start-area a, .btn.replay", function() {
    startGame();
});

$(document).on("click", ".btn.save", function() {
    $(".save-wrap").addClass("active");
});