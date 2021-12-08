module.exports = function(eleventyConfig) {
  let tableify = require("tableify");

  eleventyConfig.addShortcode("resultsTable", function(value) {
    const table = [];
    for (const item in value) {
      for (const test in value[item]) {
      	const testName = test.substr('aria-at-harness-result-'.length);
      	const existingRow = table.find(x => x.Test === testName);
        let row = existingRow || {};
        if (!existingRow) {
        	table.push(row);
        }
        row.Test = testName;
        let testsPassed = 0;
        for (const subTest of value[item][test].tests) {
        	const results = subTest.results[0].results;
        	if (results.filter(result => result.pass === true).length === results.length) {
        		testsPassed++;
        	}
        }
        const testsTotal = value[item][test].tests.length;
        row[item] = `${testsPassed} / ${testsTotal}`;
      }
    }
    return tableify(table);
  });

  eleventyConfig.setDataDeepMerge(true);

  return {
    passthroughFileCopy: true,
  	dir: {
  		input: "results",
  		output: "_site",
  		data: "../_data",
  		includes: "../_includes"
  	}
  };
}
