import { ChartDefault } from './defaults';

export function hydrograph(){

  var margin = {top: 20, right: 30, bottom: 30, left: 20};
  var width = 1000;
  var height = 500;
  var data = [];
  var updateData;
  var yLower = undefined;
  var yUpper = undefined;
  var colorArr = d3.schemeCategory10;
  var showWatch = true;
  var showWarning = true;

  function chart(selection) {
    selection.each(function() {
      width = width - margin.left - margin.right;
      height = height - margin.top - margin.bottom;
      yLower = typeof yLower != 'undefined' ? yLower : d3.min(data.feeds, function(f) { return d3.min(f.values, function(d) { return d.y; }) });
      yUpper = typeof yUpper != 'undefined' ? yUpper : d3.max(data.feeds, function(f) { return d3.max(f.values, function(d) { return d.y; }) });

      var x = d3.scaleTime()
        .range([0, width])
        .domain([
          d3.min(data.feeds, function(f) { return d3.min(f.values, function(d) { return d.x; }) }),
          d3.max(data.feeds, function(f) { return d3.max(f.values, function(d) { return d.x; }) })
        ]);

      var y = d3.scaleLinear()
        .range([height, 0])
        .domain([
          yLower,
          yUpper
        ])
        .nice();

      var color = d3.scaleOrdinal(colorArr)
        .domain(data.feeds.map(function(f) { return f.id; }));

      var line = d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });

      var dom = d3.select(this);
      var svg = dom.append('svg')
        .attr('height', height + margin.top + margin.bottom)
        .attr('width', width + margin.left + margin.right);

      var g = svg.append('g')
        .attr('transform', 'translate('+ margin.left +','+ margin.top +')');

      g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,'+ height +')')
        .call(d3.axisBottom(x));

      g.append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(y));

      var watch = g.selectAll('.watch')
        .data(data.watch)
        .enter()
        .append('rect')
        .attr('class', 'watch')
        .attr('y', function(d){ return y(data.warning); })
        .attr('x', 0)
        .attr('height', function(d) { return y(d) - y(data.warning); })
        .attr('width', width)
        .style('fill', '#FD0')
        .style('opacity', 0.1);

      var warn = g.selectAll('.warn')
        .data(data.warning)
        .enter()
        .append('rect')
        .attr('class', 'warn')
        .attr('y', 0)
        .attr('x', 0)
        .attr('height', function(d) {
          return y(d); })
        .attr('width', width)
        .style('fill', 'red')
        .style('opacity', 0.1);

      var feed = g.selectAll('.feed')
        .data(data.feeds)
        .enter()
        .append('g')
        .attr('class', 'feed');

      feed.append('path')
        .attr('class', 'line')
        .style('fill', 'none')
        .style('stroke-width', '2px')
        .attr('d', function(d) { return line(d.values); })
        .style('stroke', function(d) { return color(d.id); });

      // feed.append("text")
      //   .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
      //   .attr("transform", function(d) { return "translate(" + x(d.value.x) + "," + y(d.value.y) + ")"; })
      //   .attr("x", 3)
      //   .attr("dy", "0.35em")
      //   .style("font", "10px sans-serif")
      //   .text(function(d) { return d.id; });

      updateData = function() {
        var t = d3.transition().duration(750);

        var updateFeed = g.selectAll('.feed')
          .data(data.feeds)

        var line = updateFeed.selectAll('.line');

        // updateFeed.enter()
        //   .append('g')
        //   .attr('class', 'feed')
        //   .append('path')
        //   .attr('class', 'line')
        //   .attr('d', '')
        //   .style('fill', 'none')
        //   .style('stroke-width', '1.5px')
        //   .style('opacity', 0)
        //   .transition(t)
        //   .delay(function(d, i) { return (data.length - i) * 40; })
        //   .attr('d', function(d) { return line(d.values); })
        //   .style('stroke', function(d) { return color(d.id); })
        //   .style('opacity', 1);
        //
        // update.exit()
        //   .transition(t)
        //   .style('opacity', 0)
        //   .remove();
      }

    });
  }

  chart.showWatch = function(_) {
    if (!arguments.length) return showWatch;
    if (typeof _ != 'boolean') return showWatch;
    showWatch = _;
    return chart;
  }

  chart.showWarning = function(_) {
    if (!arguments.length) return showWarning;
    if (typeof _ != 'boolean') return showWarning;
    showWatch = _;
    return chart;
  }

  chart.data = function(_) {
    if (!arguments.length) return data;
    data = _;
    if (typeof updateData === 'function') updateData();
    return chart;
  }

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.yLower = function(_) {
    if (!arguments.length) return yLower;
    // if ()
    yLower = _;
    return chart;
  }

  chart.yUpper = function(_) {
    if (!arguments.length) return yUpper;
    yUpper = _;
    return chart;
  }

  chart.colorArray = function(_) {
    if (!arguments.length) return colorArr;
    colorArr = _;
    return chart;
  }

  return chart;

}
