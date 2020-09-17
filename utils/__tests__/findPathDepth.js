const findPathDepth = require("../findPathDepth");

test('it correctly returns path depth', ()=>{

    expect(
      findPathDepth(
        "https://www.4ivan.com/hunter-douglas/side-panels-drapery.html"
      )
    ).toBe(`../`);
})