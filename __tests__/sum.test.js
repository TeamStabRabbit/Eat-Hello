const sum = require('../sum');


describe('testing jest tests', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
})

describe('testing server endpints', () => {
  
})