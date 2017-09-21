const expect = require('chai').expect;
const browse = require('./src/components/Browse.js');

describe('Browse walk', ()=>{

  it("renders a `BrowseList`", () => {
    expect(browse.getWalks().find(BrowseList).length).toBe(1);
  });

});