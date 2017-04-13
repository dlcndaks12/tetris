var BlockItem = function(num) {
    var bottomFlag = true;
    var block = new Array(4);
    //블럭형태 코드값
    var type = num;
    //블럭의 현재 회전방향
    var blockDirection = 0;
    //블럭형태 세팅
    switch (num) {
      case 0:
        block[0] = [ [ 3, -2 ], [ 4, -2 ], [ 5, -2 ], [ 6, -2 ] ];
        block[1] = [ [ 4, -3 ], [ 4, -2 ], [ 4, -1 ], [ 4, 0 ] ];
        block[2] = [ [ 3, -2 ], [ 4, -2 ], [ 5, -2 ], [ 6, -2 ] ];
        block[3] = [ [ 4, -3 ], [ 4, -2 ], [ 4, -1 ], [ 4, 0 ] ];
        break;

      case 1:
        block[0] = [ [ 3, -2 ], [ 3, -1 ], [ 4, -1 ], [ 5, -1 ] ];
        block[1] = [ [ 4, -2 ], [ 5, -2 ], [ 4, -1 ], [ 4, 0 ] ];
        block[2] = [ [ 3, -2 ], [ 4, -2 ], [ 5, -2 ], [ 5, -1 ] ];
        block[3] = [ [ 4, -2 ], [ 4, -1 ], [ 3, 0 ], [ 4, 0 ] ];
        break;

      case 2:
        block[0] = [ [ 5, -2 ], [ 3, -1 ], [ 4, -1 ], [ 5, -1 ] ];
        block[1] = [ [ 4, -2 ], [ 4, -1 ], [ 4, 0 ], [ 5, 0 ] ];
        block[2] = [ [ 3, -2 ], [ 4, -2 ], [ 5, -2 ], [ 3, -1 ] ];
        block[3] = [ [ 3, -2 ], [ 4, -2 ], [ 4, -1 ], [ 4, 0 ] ];
        break;

      case 3:
        block[0] = [ [ 4, -1 ], [ 5, -1 ], [ 4, 0 ], [ 5, 0 ] ];
        block[1] = [ [ 4, -1 ], [ 5, -1 ], [ 4, 0 ], [ 5, 0 ] ];
        block[2] = [ [ 4, -1 ], [ 5, -1 ], [ 4, 0 ], [ 5, 0 ] ];
        block[3] = [ [ 4, -1 ], [ 5, -1 ], [ 4, 0 ], [ 5, 0 ] ];
        break;

      case 4:
        block[0] = [ [ 4, -2 ], [ 5, -2 ], [ 3, -1 ], [ 4, -1 ] ];
        block[1] = [ [ 4, -2 ], [ 4, -1 ], [ 5, -1 ], [ 5, 0 ] ];
        block[2] = [ [ 4, -2 ], [ 5, -2 ], [ 3, -1 ], [ 4, -1 ] ];
        block[3] = [ [ 4, -2 ], [ 4, -1 ], [ 5, -1 ], [ 5, 0 ] ];
        break;

      case 5:
        block[0] = [ [ 3, -2 ], [ 4, -2 ], [ 4, -1 ], [ 5, -1 ] ];
        block[1] = [ [ 4, -2 ], [ 3, -1 ], [ 4, -1 ], [ 3, 0 ] ];
        block[2] = [ [ 3, -2 ], [ 4, -2 ], [ 4, -1 ], [ 5, -1 ] ];
        block[3] = [ [ 4, -2 ], [ 3, -1 ], [ 4, -1 ], [ 3, 0 ] ];
        break;

      case 6:
        block[0] = [ [ 4, -2 ], [ 3, -1 ], [ 4, -1 ], [ 5, -1 ] ];
        block[1] = [ [ 4, -2 ], [ 4, -1 ], [ 5, -1 ], [ 4, 0 ] ];
        block[2] = [ [ 3, -2 ], [ 4, -2 ], [ 5, -2 ], [ 4, -1 ] ];
        block[3] = [ [ 4, -2 ], [ 3, -1 ], [ 4, -1 ], [ 4, 0 ] ];
        break;
    }
    return {
        getType: function() {
            return type;
        },
        getCurrentBlock: function() {
            return block[blockDirection];
        },
        moveUp: function() {
            for (var i in block) {
                for (var j = 0; j < block[i].length; j++) {
                    block[i][j][1]--;
                }
            }
        },
        moveLeft: function() {
            for (var i in block) {
                for (var j = 0; j < block[i].length; j++) {
                    block[i][j][0]--;
                }
            }
            this.crushChk(0);
        },
        moveRight: function() {
            for (var i in block) {
                for (var j = 0; j < block[i].length; j++) {
                    block[i][j][0]++;
                }
            }
            this.crushChk(1);
        },
        moveDown: function() {
            for (var i in block) {
                for (var j = 0; j < block[i].length; j++) {
                    block[i][j][1]++;
                }
            }
            this.crushChk(2);
        },
        moveEnd: function() {
            while (bottomFlag) {
                this.moveDown();
            }
        },
        crushChk: function(direction) {
            var testBlock = block[blockDirection];
            var bottomY = testBlock[testBlock.length - 1][1];
            var leftX;
            var rightX;
            for (var i = 0; i < testBlock.length; i++) {
                if (i == 0) {
                    leftX = testBlock[i][0];
                    rightX = testBlock[i][0];
                    continue;
                }
                if (testBlock[i][0] < leftX) {
                    leftX = testBlock[i][0];
                }
                if (testBlock[i][0] > rightX) {
                    rightX = testBlock[i][0];
                }
            }
            if (leftX < 0) {
                this.moveRight();
                return false;
            } else if (rightX > 9) {
                this.moveLeft();
                return false;
            } else if (bottomY > 19) {
                this.moveUp();
                bottomFlag = false;
                endPosition();
                return false;
            }
            for (var i = 0; i < testBlock.length; i++) {
                for (var j in fixItem) {
                    /* 겹침 */
                    if (testBlock[i][0] == fixItem[j][0] && testBlock[i][1] == fixItem[j][1]) {
                        if (direction == 0) {
                            this.moveRight();
                        }
                        if (direction == 1) {
                            this.moveLeft();
                        }
                        if (direction == 2) {
                            this.moveUp();
                            bottomFlag = false;
                            endPosition();
                        }
                        return false;
                    }
                }
            }
        },
        rotate: function() {
            blockDirection++;
            if (blockDirection == 4) {
                blockDirection = 0;
            }
            var testBlock = this.getCurrentBlock();
            /* 회전시 충돌있으면 회전하기 전으로 돌리기 */
            for (var i = 0; i < testBlock.length; i++) {
                for (var j in fixItem) {
                    /* 겹침 */
                    if (testBlock[i][0] == fixItem[j][0] && testBlock[i][1] == fixItem[j][1]) {
                        blockDirection--;
                        if (blockDirection == -1) {
                            blockDirection = 3;
                        }
                        return false;
                    }
                }
            }
            //회전시 위치 조정
            var leftX;
            var rightX;
            for (var i = 0; i < testBlock.length; i++) {
                if (i == 0) {
                    leftX = testBlock[i][0];
                    rightX = testBlock[i][0];
                    continue;
                }
                if (testBlock[i][0] < leftX) {
                    leftX = testBlock[i][0];
                }
                if (testBlock[i][0] > rightX) {
                    rightX = testBlock[i][0];
                }
            }
            while (leftX < 0) {
                this.moveRight();
                leftX++;
            }
            while (rightX > 9) {
                this.moveLeft();
                rightX--;
            }
        }
    };
};