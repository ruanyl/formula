import { prevhl } from '../../src/custom/turtle'
import { CLOSE } from '../../src/cons'
import sh603101 from '../sh603101.json'

describe('TURTLE', () => {
  it('Highest and Lowest price in pervious (N, M) periods', () => {
    const expectResults = {
      longPeriodsHigh: [12.69, 13.96, 15.36, 16.9, 18.59, 20.45, 22.5, 24.75, 25.89, 25.89, 25.89, 25.89, 25.89, 25.89, 25.89, 25.89, 25.89, 25.89, 27.37, 28.82],
      shortPeriodsHigh: [12.69, 13.96, 15.36, 16.9, 18.59, 20.45, 22.5, 24.75, 25.89, 25.89, 25.89, 25.89, 25.89, 23.63, 24.06, 24.32, 24.32, 24.88, 27.37, 28.82],
      longPeriodsLow: [12.69, 12.69, 12.69, 12.69, 12.69, 12.69, 12.69, 12.69, 12.69, 12.69, 13.96, 15.36, 16.9, 18.59, 20.45, 22.44, 22.44, 22.44, 22.44, 22.44],
      shortPeriodsLow: [12.69, 12.69, 12.69, 12.69, 12.69, 13.96, 15.36, 16.9, 18.59, 20.45, 22.5, 22.87, 22.44, 22.44, 22.44, 22.44, 22.44, 23.32, 23.59, 23.59],
    }
    const shortPeriods = 5
    const longPeriods = 10
    const returnedResults = prevhl(CLOSE, shortPeriods, longPeriods)(sh603101)
    expect(returnedResults).toEqual(expectResults)
  })
});
