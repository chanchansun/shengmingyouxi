class Cell {      //类class定义了同一组对象共有的属性和方法
  constructor(state, x, y) {  //返回对创建此对象的数组函数的引用，三个属性
    this.state = state;
    this.x = x;  //用this关键字指代实例对象（也可以是cell.x吗？）
    this.y = y;
  }
  nextState(cells) {  //确定cell的下一个状态，方法用nextstate
    var lives = this.getLives(cells);  //当前邻居细胞存活数目存到lives中
    if (this.state === 0) {
      if (lives === 3) {
        this.state = 1;
      }
    } else {
      if (lives < 2) {
        this.state = 0;
      } else if (lives > 3) {
        this.state = 0;
      }
    }
  }
  getLives(cells) {  //存活细胞数目getlives的边界问题3-8个
    var lives = 0;  //定义存活数目为0 ？？？
    for (var i = -1; i <= 1; i++) {  //定义二维数组
      if (cells[this.x + i]) {
        for (var j = -1; j <= 1; j++) {
          if (cells[this.x + i][this.y + j]) {
            lives += +Boolean(cells[this.x + i][this.y + j].state);  //将其存活状态转换成0/1
          }
        }
      }
    }
    lives -= cells[this.x][this.y].state;  //？？？？
    return lives;
  }
}

class LifeGame {  //定义类
  constructor(xlen, ylen) {
    this.xlen = xlen;
    this.ylen = ylen;
  }
    initState1(lifeCell) { //？？？
      var table = []; //定义table类，数组
      for (var i = 0; i < 3; i++) {
          table[i] = [];
          for (var j = 0; j < 3; j++) {
            for (var k = 0; k < lifeCell.length; k++) {
              if (i === lifeCell[k][0] && j === lifeCell[k][1]) {
               table[i][j] = new Cell(1, lifeCell[k][0], lifeCell[k][1])
              }else{
                table[i][j] = new Cell(0, i, j);
              }
            }
          }
      }
      return table;
    }
  getEmptyView(){  //初始化表格，没有生命细胞存在
    var table = [];
    for (var i = 0; i < this.xlen; i++) {
        table[i] = [];
        for (var j = 0; j < this.ylen; j++) {
          table[i][j] = new Cell(0, i, j);
        }
    }
    return table;
  }
  getTableView() {
    var table = [];
    for (var i = 0; i < this.xlen; i++) {
      table[i] = [];
      for (var j = 0; j < this.ylen; j++) {
        var num = Math.round(Math.random(1, 0));
        table[i][j] = new Cell(num, i, j);
      }
    }
    // this.table = table;
    return table;
  }
  dynamic(table) {
    let tempTable = [];
    for (var i = 0; i < this.xlen; i++) {
      tempTable[i] = [];
      for (var j = 0; j < this.ylen; j++) {
        const oldCell = table[i][j];
        const cell = new Cell(oldCell.state, i, j);
        tempTable[i][j] = cell;
        cell.nextState(table);
      }
    }
    table = tempTable;
    return table;
  }
}

export { LifeGame, Cell }
