var Items = function(num) {
    var x = 0;
    var y = 0;
    var block = new Array(4);
    var blockDirection = 0;
    var item = function() {
        switch (num) {
          case 0:
            block[0] = [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ] ];
            break;

          case 1:
            break;

          case 2:
            break;

          case 3:
            break;

          case 4:
            break;

          case 5:
            break;

          case 6:
            break;
        }
    }();
    return {
        getPosition: function() {
            return block[blockDirection];
        },
        move: function() {
            for (var i in block) {
                //for(var i=0; i < block.length; i++) {
                for (var j = 0; j < block[i].length; j++) {
                    block[i][j][0]++;
                }
            }
        }
    };
};