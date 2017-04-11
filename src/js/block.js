var Items = function(num) {
    var bottomFlag = true;
    var x = 0;
    var y = 0;
    var block = new Array(4);
    //블럭모양
    var type = num;
    //블럭의 현재 회전방향
    var blockDirection = 0;
    var item = function() {
        switch(num) {
            case 0:
                block[0] = [
                    [3,-2],[4,-2],[5,-2],[6,-2]
                ];
                block[1] = [
                    [4,-3],
                    [4,-2],
                    [4,-1],
                    [4, 0]
                ];
                block[2] = [
                    [3,-2],[4,-2],[5,-2],[6,-2]
                ];
                block[3] = [
                    [4,-3],
                    [4,-2],
                    [4,-1],
                    [4, 0]
                ];
                break;
            case 1:
                block[0] = [
                    [3,-2],
                    [3,-1],[4,-1],[5,-1]
                ];
                block[1] = [
                    [4,-2],[5,-2],
                    [4,-1],
                    [4, 0]
                ];
                block[2] = [
                    [3,-2],[4,-2],[5,-2],
                                  [5,-1]
                ];
                block[3] = [
                           [4,-2],
                           [4,-1],
                    [3, 0],[4, 0]
                ];
                break;
            case 2:
                block[0] = [
                                  [5,-2],
                    [3,-1],[4,-1],[5,-1]
                ];
                block[1] = [
                    [4,-2],
                    [4,-1],
                    [4, 0],[5, 0]
                ];
                block[2] = [
                    [3,-2],[4,-2],[5,-2],
                    [3,-1]
                ];
                block[3] = [
                    [3,-2],[4,-2],
                           [4,-1],
                           [4, 0]
                ];
                break;
            case 3:
                block[0] = [
                    [4,-1],[5,-1],
                    [4, 0],[5, 0]
                ];
                block[1] = [
                    [4,-1],[5,-1],
                    [4, 0],[5, 0]
                ];
                block[2] = [
                    [4,-1],[5,-1],
                    [4, 0],[5, 0]
                ];
                block[3] = [
                    [4,-1],[5,-1],
                    [4, 0],[5, 0]
                ];
                break;
            case 4:
                block[0] = [
                           [4,-2],[5,-2],
                    [3,-1],[4,-1]
                ];
                block[1] = [
                    [4,-2],
                    [4,-1],[5,-1],
                           [5, 0]
                ];
                block[2] = [
                           [4,-2],[5,-2],
                    [3,-1],[4,-1]
                ];
                block[3] = [
                    [4,-2],
                    [4,-1],[5,-1],
                           [5, 0]
                ];
                break;
            case 5:
                block[0] = [
                    [3,-2],[4,-2],
                           [4,-1],[5,-1]
                ];
                block[1] = [
                           [4,-2],
                    [3,-1],[4,-1],
                    [3, 0]
                ];
                block[2] = [
                    [3,-2],[4,-2],
                           [4,-1],[5,-1]
                ];
                block[3] = [
                           [4,-2],
                    [3,-1],[4,-1],
                    [3, 0]
                ];
                break;
            case 6:
                block[0] = [
                           [4,-2],
                    [3,-1],[4,-1],[5,-1]
                ];
                block[1] = [
                    [4,-2],
                    [4,-1],[5,-1],
                    [4, 0]
                ];
                block[2] = [
                    [3,-2],[4,-2],[5,-2],
                           [4,-1]
                ];
                block[3] = [
                           [4,-2],
                    [3,-1],[4,-1],
                           [4, 0]
                ];
                break;
        }
    }();

    return {
        getType: function() {
            return type;
        },
        getPosition: function() {
            return block[blockDirection];
        },
        crushChk: function(direction) {
            var testBlock = block[blockDirection];
            var leftX = testBlock[0][0];
            var rightX = testBlock[testBlock.length-1][0];
            var bottomY = testBlock[testBlock.length-1][1];

            for(var i in testBlock) {
                if(leftX > testBlock[i][0]) {
                    leftX = testBlock[i][0];
                }
                if(rightX < testBlock[i][0]) {
                    rightX = testBlock[i][0];
                }
            }

            if(leftX < 0 && direction == 0) {
                this.moveRight();
                return;
            }else if(rightX > 9 && direction == 1) {
                this.moveLeft();
                return;
            }else if(bottomY > 19 && direction == 2){
                this.moveTop();
                bottomFlag = false;
                endPosition();
                return;
            }

            loop1: for(var i=0; i < testBlock.length; i++) {
                for(var j in fixItem) {
                    if(testBlock[i][0] == fixItem[j][0] && testBlock[i][1] == fixItem[j][1]) {
                        if(direction == 0) {
                            this.moveRight();
                        }
                        if(direction == 1) {
                            this.moveLeft();
                        }
                        if(direction == 2) {
                            this.moveTop();
                            bottomFlag = false;
                            endPosition();
                        }
                        break loop1;
                    }
                }
            }
        },
        rotate: function() {
            blockDirection++;
            if(blockDirection == 4) {
                blockDirection = 0;
            }
            var testBlock = this.getPosition();

            /* 회전시 충돌있으면 회전하기 전으로 돌리기 */
            loop1: for(var i=0; i < testBlock.length; i++) {
                for(var j in fixItem) {
                    if(testBlock[i][0] == fixItem[j][0] && testBlock[i][1] == fixItem[j][1]) {
                        blockDirection--;
                        if(blockDirection == -1) {
                            blockDirection = 0;
                        }
                        break loop1;
                    }
                }
            }

            //회전시 위치 조정
            //가장 왼쪽 블럭의 좌표
            var leftX;
            for(var i=0; i<testBlock.length; i++) {
                if(i==0) {
                    leftX = testBlock[i][0];
                    continue;
                }
                if(testBlock[i][0] < leftX) {
                    leftX = testBlock[i][0];
                }
            }
            //가장 오른쪽 블럭의 좌표
            var rightX;
            for(var i=0; i<testBlock.length; i++) {
                if(i==0) {
                    rightX = testBlock[i][0];
                    continue;
                }
                if(testBlock[i][0] > rightX) {
                    rightX = testBlock[i][0];
                }
            }
            while(leftX < 0) {
                this.moveRight();
                leftX++;
            }
            while(rightX > 9) {
                this.moveLeft();
                rightX--;
            }
        },
        moveTop: function() {
            for (var i in block) {
                for (var j=0; j < block[i].length; j++) {
                    block[i][j][1]--;
                }
            }
        },
        moveLeft: function() {
            for(var i in block) {
                for(var j=0; j < block[i].length; j++) {
                    block[i][j][0]--;
                }
            }
            this.crushChk(0);
        },
        moveRight: function() {
            for(var i in block) {
                for(var j=0; j < block[i].length; j++) {
                    block[i][j][0]++;
                }
            }
            this.crushChk(1);
        },
        moveBottom: function() {
            for(var i in block) {
                for(var j=0; j < block[i].length; j++) {
                    block[i][j][1]++;
                }
            }
            this.crushChk(2);
        },
        moveEnd: function() {
            while(bottomFlag){
                this.moveBottom();
            }
        }
    }
};