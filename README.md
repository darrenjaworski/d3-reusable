# D3 Re

THIS LIBRARY HAS NOT YET BEEN PUBLISHED. THE INFORMATION BELOW IS LIKELY TO BE UPDATED OR CHANGED COMPLETELY. DOCUMENTATION AND PUBLIC API ARE STILL BEING ACTIVELY WRITTEN. THANK YOU FOR YOUR PATIENCE.

Small d3 reusable charts library.

- bar
- line
- histogram
- scatterplot
- bubble

## Getting started.

1. Reference Library

Include in page.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="chart"></div>

  <script src="/path/to/d3re.min.js"></script>
  <script src="/path/to/d3.min.js"></script>
  <script>
  (function(){
    // data
    var milesRun = [2, 5, 4, 1, 2, 6, 5];

    // define chart
    var runningChart = d3re.bar().data(milesRun).barPadding(2);

    // select DOM element and call chart.
    d3.select('#runningHistory').call(runningChart);
  })()
  </script>
</body>
</html>
```

Or include as a module.

```javascript
// ECMAScript 2015 import
import d3re from 'd3re';

// data
var milesRun = [2, 5, 4, 1, 2, 6, 5];

// define chart
var runningChart = d3re.bar().data(milesRun).barPadding(2);

// select DOM element and call chart.
d3.select('#runningHistory').call(runningChart);

// Or use your favorite module bundler.
// CommonJS modules
var d3re = require('d3re');
```
