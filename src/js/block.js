var Items = function(num) {
    var bottomFlag = true;
    var x = 0;
    var y = 0;
    var block = new Array(4);
    var blockDirection = 0;
    var type = num;
    var item = function() {
        switch(num) {
            case 0:
                block[0] = [
                    [3,-1],[4,-1],[5,-1],[6,-1]
                ];
                block[1] = [
                    [4,-2],
                    [4,-1],
                    [4, 0],
                    [4, 1]
                ];
                block[2] = [
                    [3,-1],[4,-1],[5,-1],[6,-1]
                ];
                block[3] = [
                    [4,-2],
                    [4,-1],
                    [4, 0],
                    [4, 1]
                ];
                break;
            case 1:
                block[0] = [
                    [3,-1],
                    [3, 0],[4, 0],[5, 0]
                ];
                block[1] = [
                    [4,-1],[5,-1],
                    [4, 0],
                    [4, 1]
                ];
                block[2] = [
                    [3,-1],[4,-1],[5,-1],
                                  [5, 0]
                ];
                block[3] = [
                           [4,-1],
                           [4, 0],
                    [3, 1],[4, 1]
                ];
                break;
            case 2:
                block[0] = [
                                  [5,-1],
                    [3, 0],[4, 0],[5, 0]
                ];
                block[1] = [
                    [4,-1],
                    [4, 0],
                    [4, 1],[5, 1]
                ];
                block[2] = [
                    [3,-1],[4,-1],[5,-1],
                    [3, 0]
                ];
                block[3] = [
                    [3,-1],[4,-1],
                           [4, 0],
                           [4, 1]
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
                           [4,-1],[5,-1],
                    [3, 0],[4, 0]
                ];
                block[1] = [
                    [4,-1],
                    [4, 0],[5, 0],
                           [5, 1]
                ];
                block[2] = [
                           [4,-1],[5,-1],
                    [3, 0],[4, 0]
                ];
                block[3] = [
                    [4,-1],
                    [4, 0],[5, 0],
                           [5, 1]
                ];
                break;
            case 5:
                block[0] = [
                    [3,-1],[4,-1],
                           [4, 0],[5, 0]
                ];
                block[1] = [
                           [4,-1],
                    [3, 0],[4, 0],
                    [3, 1]
                ];
                block[2] = [
                    [3,-1],[4,-1],
                           [4, 0],[5, 0]
                ];
                block[3] = [
                           [4,-1],
                    [3, 0],[4, 0],
                    [3, 1]
                ];
                break;
            case 6:
                block[0] = [
                           [4,-1],
                    [3, 0],[4, 0],[5, 0]
                ];
                block[1] = [
                    [4,-1],
                    [4, 0],[5, 0],
                    [4, 1]
                ];
                block[2] = [
                    [3,-1],[4,-1],[5,-1],
                           [4, 0]
                ];
                block[3] = [
                           [4,-1],
                    [3, 0],[4, 0],
                           [4, 1]
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
        crushCheck: function(direction) {
            var testBlock = this.getPosition();
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

            if(leftX == 0 && direction == 0) {
                return false;
            }else if(rightX == 9 && direction == 1) {
                return false;
            }else if(bottomY >= 19 && direction == 2){
                endPosition();
                return false;
            }else{
                return true;
            }
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
                endPosition();
                return;
            }else if(bottomY > 19 && direction == 22){
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
                        if(direction == 2 || direction == 22) {
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

            /* 회전시 충돌있으면 돌리기 */
            loop1: for(var i=0; i < testBlock.length; i++) {
                for(var j in fixItem) {
                    if(testBlock[i][0] == fixItem[j][0] && testBlock[i][1] == fixItem[j][1]) {
                        blockDirection--;
                        if(blockDirection == -1) {
                            blockDirection = 4;
                        }

                        return;
                    }
                }
            }

            /* 회전시 위치 조정 */
            var leftX = testBlock[0][0];
            var rightX = testBlock[testBlock.length-1][0];
            var adjustLeft = leftX;
            while(adjustLeft < 0) {
                this.moveRight();
                adjustLeft = testBlock[0][0];
            }
            var adjustRight = rightX;
            while(adjustRight > 9) {
                this.moveLeft();
                adjustRight = testBlock[testBlock.length-1][0];
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
        moveTop: function() {
            for (var i in block) {
                for (var j=0; j < block[i].length; j++) {
                    block[i][j][1]--;
                }
            }
        },
        moveBottom: function(direction) {
            for(var i in block) {
                for(var j=0; j < block[i].length; j++) {
                    block[i][j][1]++;
                }
            }

            this.crushChk(direction);
        },
        move: function(direction) {
            //if(this.crushCheck(direction)) {
                switch(direction) {
                    case 0:
                        this.moveLeft();
                        break;
                    case 1:
                        this.moveRight();
                        break;
                    case 2:
                        this.moveBottom(direction);
                        break;
                    case 22:
                        /*for(var i=0; i<10; i++) {
                            console.log(bottomFlag);
                            this.moveBottom(direction);

                            if(bottomFlag == false) {
                                break;
                            }
                        }*/
                        while(bottomFlag){
                            this.moveBottom(direction);
                        }
                        break;
                }
            //}

            /*switch(direction) {
                case 0:
                    this.moveLeft();
                    break;
                case 1:
                    this.moveRight();
                    break;
                case 2:
                    this.moveBottom();
                    break;
            }*/
        }
    }
};