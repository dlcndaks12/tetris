var Items = function(num) {
    var x = 0;
    var y = 0;
    var block = new Array(4);
    var blockDirection = 0;
    var item = function() {
        switch (num) {
          case 0:
            block[0] = [ [ 3, 1 ], [ 4, 1 ], [ 5, 1 ], [ 6, 1 ] ];
            block[1] = [ [ 5, 0 ], [ 5, 1 ], [ 5, 2 ], [ 5, 3 ] ];
            block[2] = [ [ 3, 1 ], [ 4, 1 ], [ 5, 1 ], [ 6, 1 ] ];
            block[3] = [ [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ] ];
            break;

          case 1:
            block[0] = [ [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 5, 1 ] ];
            block[1] = [ [ 4, 0 ], [ 5, 0 ], [ 4, 1 ], [ 4, 2 ] ];
            block[2] = [ [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ] ];
            block[3] = [ [ 4, 0 ], [ 4, 1 ], [ 3, 2 ], [ 4, 2 ] ];
            break;

          case 2:
            block[0] = [ [ 5, 0 ], [ 3, 1 ], [ 4, 1 ], [ 5, 1 ] ];
            block[1] = [ [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 5, 2 ] ];
            block[2] = [ [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 3, 1 ] ];
            block[3] = [ [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 2 ] ];
            break;

          case 3:
            block[0] = [ [ 4, 0 ], [ 5, 0 ], [ 4, 1 ], [ 5, 1 ] ];
            block[1] = [ [ 4, 0 ], [ 5, 0 ], [ 4, 1 ], [ 5, 1 ] ];
            block[2] = [ [ 4, 0 ], [ 5, 0 ], [ 4, 1 ], [ 5, 1 ] ];
            block[3] = [ [ 4, 0 ], [ 5, 0 ], [ 4, 1 ], [ 5, 1 ] ];
            break;

          case 4:
            block[0] = [ [ 4, 0 ], [ 5, 0 ], [ 3, 1 ], [ 4, 1 ] ];
            block[1] = [ [ 4, 0 ], [ 4, 1 ], [ 5, 1 ], [ 5, 2 ] ];
            block[2] = [ [ 4, 0 ], [ 5, 0 ], [ 3, 1 ], [ 4, 1 ] ];
            block[3] = [ [ 3, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ] ];
            break;

          case 5:
            block[0] = [ [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 5, 1 ] ];
            block[1] = [ [ 5, 0 ], [ 4, 1 ], [ 5, 1 ], [ 4, 2 ] ];
            block[2] = [ [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 5, 1 ] ];
            block[3] = [ [ 4, 0 ], [ 3, 1 ], [ 4, 1 ], [ 3, 2 ] ];
            break;

          case 6:
            block[0] = [ [ 4, 0 ], [ 3, 1 ], [ 4, 1 ], [ 5, 1 ] ];
            block[1] = [ [ 4, 0 ], [ 4, 1 ], [ 5, 1 ], [ 4, 2 ] ];
            block[2] = [ [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 4, 1 ] ];
            block[3] = [ [ 4, 0 ], [ 3, 1 ], [ 4, 1 ], [ 4, 2 ] ];
            break;
        }
    }();
    return {
        getPosition: function() {
            return block[blockDirection];
        },
        crushCheck: function(direction) {
            var testBlock = this.getPosition();
            var leftX = testBlock[0][0];
            var rightX = testBlock[testBlock.length - 1][0];
            var bottomY = testBlock[testBlock.length - 1][1];
            for (var i in testBlock) {
                if (leftX > testBlock[i][0]) {
                    leftX = testBlock[i][0];
                }
                if (rightX < testBlock[i][0]) {
                    rightX = testBlock[i][0];
                }
            }
            if (leftX == 0 && direction == 0) {
                return false;
            } else if (rightX == 9 && direction == 1) {
                return false;
            } else if (bottomY >= 19 && direction == 2) {
                endPosition();
                return false;
            } else {
                return true;
            }
        },
        rotate: function() {
            blockDirection++;
            if (blockDirection == 4) {
                blockDirection = 0;
            }
            /* 회전시 위치 조정 */
            var testBlock = this.getPosition();
            var leftX = testBlock[0][0];
            var rightX = testBlock[testBlock.length - 1][0];
            var adjustLeft = leftX;
            while (adjustLeft < 0) {
                this.moveRight();
                adjustLeft = testBlock[0][0];
            }
            var adjustRight = rightX;
            while (adjustRight > 9) {
                this.moveLeft();
                adjustRight = testBlock[testBlock.length - 1][0];
            }
        },
        moveLeft: function() {
            for (var i in block) {
                for (var j = 0; j < block[i].length; j++) {
                    block[i][j][0]--;
                }
            }
        },
        moveRight: function() {
            for (var i in block) {
                for (var j = 0; j < block[i].length; j++) {
                    block[i][j][0]++;
                }
            }
        },
        moveBottom: function() {
            for (var i in block) {
                for (var j = 0; j < block[i].length; j++) {
                    block[i][j][1]++;
                }
            }
        },
        move: function(direction) {
            /*if(this.crushCheck(direction)) {
                switch(direction) {
                    case 0:
                        this.moveLeft();
                        break;
                    case 1:
                        this.moveRight();
                        break;
                    case 2:
                        this.moveBottom();
                        break;
                }
            }*/
            switch (direction) {
              case 0:
                this.moveLeft();
                break;

              case 1:
                this.moveRight();
                break;

              case 2:
                this.moveBottom();
                break;
            }
        }
    };
};