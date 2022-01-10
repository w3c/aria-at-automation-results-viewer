module.exports = function(eleventyConfig) {
  let tableify = require("tableify");
  const pathPrefix = 'aria-at-automation-results-viewer'; // This is for deployment to GitHub pages

  eleventyConfig.addShortcode("resultsTable", function(value, testPageName) {
    const table = [];

    function addRow(testName) {
      const existingRow = table.find(x => x.Test === testName);
      const row = existingRow || { Test: testName };
      if (!existingRow) {
        table.push(row);
      }
      return row;
    }
    for (const item in value) {
      for (const test in value[item]) {
      	const testName = test;
        if (!testPageName) {
          // index page
          const row = addRow(testName);
          let testsPassed = 0;
          for (const subTest of value[item][test].tests) {
          	const results = subTest.results[0].results;
          	if (results.filter(result => result.pass === true).length === results.length) {
          		testsPassed++;
          	}
          }
          const testsTotal = value[item][test].tests.length;
          row[item] = `${testsPassed} / ${testsTotal}`;
        } else {
          // results for one test
          if (testName !== testPageName) {
            continue;
          }
          for (const subTest of value[item][test].tests) {
            const testName = subTest.filepath.replace(".collected.json", "");
            const row = addRow(testName);
            row[item] = subTest.log.map(item => item.text).join('\n');
          }
        }
      }
    }
    let rv = tableify(table);
    if (!testPageName) {
      rv = rv.replace(/<tr><td class="string">([^<]+)/g, `<tr><td class="string"><a href="${ pathPrefix }/results/$1">$1</a>`);
    } else {
    	rv = rv.replace(/<\/td><td class="string">([^<]+)/g, '</td><td class="string"><pre>$1</pre>');
    }
    return rv;
  });

  eleventyConfig.setDataDeepMerge(true);

  return {
    passthroughFileCopy: true,
    pathPrefix,
  	dir: {
  		input: "pages",
  		output: "_site",
  		data: "../_data",
  		includes: "../_includes"
  	}
  };
}
