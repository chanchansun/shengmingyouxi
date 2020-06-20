import { LifeGame,Cell } from '../../src/lifeGame'

const lifeGame = require('../../src/lifeGame')
const game = new LifeGame(3, 3)

describe('main', () => {
  test('several book return 23.2', () => {
    let inputs = [[0, 1], [1, 2], [2, 0], [2, 1], [2, 2]]
  let outputs=[[new Cell(0,0,0) ,new Cell(1,0,1),new Cell(0,0,2)],
  [new Cell(0,1,0) ,new Cell(0,1,1),new Cell(1,1,2)],
  [new Cell(1,2,0) ,new Cell(1,2,1),new Cell(1,2,2)]]
    expect(game.initState1(inputs)).toBe(outputs)
  })
})
