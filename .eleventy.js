module.exports = function(eleventyConfig) {
  let tableify = require("tableify");
  const pathPrefix = '/aria-at-results-viewer'; // This is for deployment to GitHub pages

  eleventyConfig.addShortcode("resultsTable", function(value, tests, testPageName) {
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
      for (const test of tests) {
        const testName = test.name;
        if (!testPageName) {
          // index page
          const row = addRow(testName);
          if (!(testName in value[item])) {
            row[item] = "No results.";
          } else {
            let testsPassed = 0;
            for (const subTest of value[item][testName].tests) {
              const results = subTest.results[0].results;
              if (results.filter(result => result.pass === true).length === results.length) {
                testsPassed++;
              }
            }
            const testsTotal = value[item][testName].tests.length;
            row[item] = `${testsPassed} / ${testsTotal}`;
          }
        } else {
          // results for one test
          if (!(testName in value[item]) || testName !== testPageName) {
            continue;
          }
          for (const subTest of value[item][testName].tests) {
            const testName = subTest.filepath.replace(".collected.json", "");
            const row = addRow(testName);
            row[item] = subTest.log.map(item => item.text).join('\n');
          }
        }
      }
    }
    if (table.length === 0) {
      return "<p>There are no results for this test.</p>";
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
