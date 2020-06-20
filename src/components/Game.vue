<template>
  <div class="content">
    <div class="leftAction">
      <div class="logo"> <img src="../../src/assets/logo.png"></div>
      <h1>LlifeGame</h1>
      <table>
        <tbody>
          <tr v-for="(rows,i) in table" :key="i">
            <td v-for="(cell,j) in rows" :key="j" :data-index="i" :class="cell.state===0?'dead':'live'" v-on:click="addLife(j)"></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="rightAction">
      <div class="speed">
        <div class="line">游戏界面选择</div>
        <label>line</label><input class="controlSize" type="number" v-model="rowTemp">
        <label>row</label><input class="controlSize" type="number" v-model="columnTemp">
        <button class="size" v-on:click="submit">Submit</button>

      </div>

      <div class="speed">
        <div class="line">速度选择</div>
        <Select class="controlSpeed" v-model="selected" @change="changeSpeed($event)">
          <Option v-for="item in stateList" :value="item.value" :key="item.value">
            {{item.value }}
          </Option>
        </Select>
      </div>
      <div>
        <div class="line">按钮操作区</div>
        <button class="random" v-on:click="randomPlay">Random</button>
        <button class="start" v-on:click="startPlay">Start</button>
        <button class="pause" v-on:click="pausePlay">Pause</button>
        <button class="replay" v-on:click="rePlay">RePlay</button>
      </div>
      <img src="../../src/assets/top.gif">
    </div>
  </div>

</template>
<style scoped>
.content {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
}
table {
  margin: 0 auto;
}
td {
  width: 30px;
  height: 30px;
  border: 1px solid #eaeaea;
}
.leftAction {
  width: 60%;
}
.logo {
  width: 40%;
  height: 80px;
}
.logo img {
  width: 100%;
  height: 80px;
}
.rightAction {
  width: 30%;
  padding: 0 10% 0 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
.speed {
  margin-top: 5%;
}
.line {
  border-bottom: 2px solid #eaeaea;
}
.controlSize {
  margin: 5% 0;
  width: 40%;
  height: 40px;
  border-radius: 10px;
  /* border:none; */
  outline: none;
}
.controlSpeed {
  margin: 5% 0;
  width: 60%;
  height: 40px;
  border-radius: 10px;
}
.size {
  width: 60%;
  border: none;
  height: 40px;
  border-radius: 15px;
  background-color: orangered;
  color: #fff;
}
.random {
  margin: 5% 0 0 0;
  width: 60%;
  border: none;
  height: 40px;
  border-radius: 15px;
  background-color: deepskyblue;
  color: #fff;
}
.start {
  margin: 5% 0;
  width: 60%;
  border: none;
  height: 40px;
  border-radius: 15px;
  background-color: lawngreen;
  color: #fff;
}
.replay {
  margin: 5% 0;
  width: 60%;
  border: none;
  height: 40px;
  border-radius: 15px;
  background-color: indianred;
  color: #fff;
}
.pause {
  width: 60%;
  border: none;
  height: 40px;
  border-radius: 15px;
  background-color: red;
  color: #fff;
}
.live {
  border-radius: 50%;
  background-color: coral;
}
.dead {
  background-color: #ccc;
}
</style>
<script>
import { LifeGame, Cell } from '../lifeGame.js'
export default {
  data() {
    return {
      game: {},
      table: [],
      rowTemp: 15,
      columnTemp: 15,
      timer: null,
      stateList: [
         {
          index: '1',
          value: '200'
        },
        {
          index: '2',
          value: '800'
        },
        {
          index: '3',
          value: '500'
        },
        {
          index: '4',
          value: '1000'
        },
      ],
      selected: '200'
    }
  },
  created() {
    this.game = new LifeGame(this.rowTemp, this.columnTemp)
    this.table = this.game.getTableView()
    this.table = this.initState()
  },
  methods: {
    initState: function(lifeCell) {
      if (lifeCell) {
        for (var i = 0; i < this.table.length; i++) {
          for (var j = 0; j < this.table[i].length; j++) {
            for (var k = 0; k < lifeCell.length; k++) {
              if (i === lifeCell[k][0] && j === lifeCell[k][1]) {
                this.table[i][j] = new Cell(1, lifeCell[k][0], lifeCell[k][1])
              }
            }
          }
        }
        return this.table
      }
      this.table = this.game.getEmptyView()
      return this.table
    },
    submit: function() {
      this.game = new LifeGame(this.rowTemp, this.columnTemp)
      this.table = this.game.getEmptyView()
    },
    addLife: function(indexj) {
      var e = e || window.event
      var indexi = e.currentTarget.getAttribute('data-index')
      var curCell = this.table[indexi][indexj]
      if (curCell.state === 0) {
        curCell.state = 1
      }
    },
    randomPlay: function() {
       if(this.timer){
      clearInterval(this.timer)
      }
      this.table = this.game.getTableView()
      this.timer = setInterval(() => {
        this.table = this.game.dynamic(this.table)
      }, this.selected)
    },
    startPlay: function() {
      if(this.timer){
      clearInterval(this.timer)
      }
      this.timer = setInterval(() => {
        this.table = this.game.dynamic(this.table)
      }, this.selected)
    },
    rePlay: function() {
      if(this.timer){
      clearInterval(this.timer)
      }
      this.table = this.game.getEmptyView()
      clearInterval(this.timer)
    },
    pausePlay: function() {
      clearInterval(this.timer)
    },
    changeSpeed(event) {
      this.selected = event.target.value
      clearInterval(this.timer)
      this.startPlay(this.selected)
      clearInterval(this.timer)
    }
  }
}
</script>