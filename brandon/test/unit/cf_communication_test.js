var angular = require('angular');

describe('cfCommunication Service', () => {
  beforeEach(angular.mock.module('liveApp'));

  it('should return a function', angular.mock.inject((theOldRepublic) => {
    expect(typeof theOldRepublic).toBe('object');
  }));

  it('should add to the count for addJedi on a new Jedi creation',
    angular.mock.inject((theOldRepublic) => {
    theOldRepublic.addJedi();
    expect(theOldRepublic.jedis.length).toBe(1);
  }));

  it('should add to the sith count of addSith on a new Sith creation',
    angular.mock.inject((theOldRepublic) => {
    theOldRepublic.addSith();
    expect(theOldRepublic.siths.length).toBe(1);
  }));
});
