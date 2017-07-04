# D3Re

THIS LIBRARY HAS NOT YET BEEN PUBLISHED. THE INFORMATION BELOW IS LIKELY TO BE UPDATED OR CHANGED COMPLETELY. DOCUMENTATION AND PUBLIC API ARE STILL BEING ACTIVELY WRITTEN. THANK YOU FOR YOUR PATIENCE.

A small D3 reusable charts library. Inspired by [Towards Reusable Charts](https://bost.ocks.org/mike/chart/) by Mike Bostock, this is (another) D3 chart library that abstracts away some of the pain of D3 so you can easily define and render a chart on your page.

- bar
- line
- histogram
- scatterplot
- bubble

## Getting started.

This guide will get you up and running on the D3Re library basics. Here is a basic example:

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
  <div id="barchart"></div>

  <script src="/path/to/d3.min.js"></script>
  <script src="/path/to/d3re.min.js"></script>
  <script>
  (function(){
    // define chart
    var runningChart = d3re.bar();

    // data
    var milesRun = [2, 5, 4, 1, 2, 6, 5];

    // add data and options to chart
    runningChart.data(milesRun)
      .fillColor('salmon')
      .barPadding(3);

    // select DOM element and call chart.
    d3.select('#barchart').call(runningChart);
  })()
  </script>
</body>
</html>
```

### Include library

In the HTML.

```html
<script src="/path/to/d3re.min.js"></script>
<script src="/path/to/d3.min.js"></script>
```

Or include as a module.

```javascript
// ECMAScript 2015 import
import d3re from 'd3re';
```

Or use your favorite module bundler.

```javascript
// CommonJS modules
var d3re = require('d3re');
```

### Define target element.

```html
<div id="barchart"></div>
```

### Define chart.

```javascript
var runningChart = d3re.bar();
```

### Define data and add to chart.

```javascript
var runningChart = d3re.bar();

var milesRun = [2, 5, 4, 1, 2, 6, 5];

runningChart.data(milesRun);
```

### Select element and render chart.

```javascript
// define chart
var runningChart = d3re.bar();

// define data
var milesRun = [2, 5, 4, 1, 2, 6, 5];

// update chart with data
runningChart.data(milesRun);

// select DOM element and call chart.
d3.select('#barchart').call(runningChart);
```

### Use getters and setters to customize chart.

```javascript
runningChart.barPadding(2)
  .fillColor('salmon')
  .barPadding(1)
  .width(500)
  .duration(1500)
  .isVertical(false)
  .fillColor('salmon');
```
