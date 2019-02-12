import { aroon, aroonosc } from '../src/aroon'
import sh603101 from './sh603101.json'

describe('Aroon', () => {
  it('Aroon', () => {
    const expectResults = {
      up: [100, 100, 100, 100, 100, 100, 100, 100, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 100, 100],
      down: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0, 0, 0, 0, 0, 0, 100, 90, 80, 70],
    }
    const returnedResults = aroon(10)(sh603101)
    expect(returnedResults).toEqual(expectResults)
  })

  it('expectResults', () => {
    const expectResults = [0, 10, 20, 30, 40, 50, 60, 70, 80, 80, 80, 70, 60, 50, 40, 30, -80, -80, 20, 30]
    const returnedResults = aroonosc(10)(sh603101)
    expect(returnedResults).toEqual(expectResults)
  });
});
