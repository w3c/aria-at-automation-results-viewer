module.exports = function(eleventyConfig) {
  let tableify = require("tableify");

  eleventyConfig.addShortcode("resultsTable", function(value) {
    return tableify(value);
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
