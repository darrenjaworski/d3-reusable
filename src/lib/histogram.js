import { ChartDefault } from './defaults';

export function histogram(){
  var updateData;
  var data = [];
  var margin = ChartDefault.margin;
  var width = ChartDefault.width;
  var height = ChartDefault.height;

  var x = d3.scaleLinear()
    .range([0, width]);

  var y = d3.scaleLinear()
    .range([height, 0]);

  var histogram = d3.histogram()
    .value(function(d) { return d; });

  function chart(selection){
    selection.each(function() {
      var t = d3.transition().duration(750);
      var dom = d3.select(this);

      var svg = dom.append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var xAxis = svg.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,'+ height +')')
        .call(d3.axisBottom(x));

      updateData = function() {
        x.domain(d3.extent(data, function(d) { return d; }));

        var bins = histogram.domain(x.domain())
          .thresholds(x.ticks(10))
          (data);

        y.domain([0, d3.max(bins, function(d) { return d.length; })]);

        // join
        var g = svg.selectAll(".bar")
          .data(bins);

        // exit
        g.exit()
          .transition(t)
          .style('opacity', 0)
          .remove();

        // update
        g.style('opacity', 1)
          .transition(t)
          .attr('transform', function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })

        // enter
        var bar = g.enter()
          .append('g')
          .attr('class', 'bar')
          .attr('transform', function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });

        bar.append('rect')
          .attr('x', 1)
          .attr('width', function(d) { return x(d.x1) - x(d.x0) - 1; })
          .attr('height', function(d) { return height - y(d.length); });

        bar.append('text')
          .attr("dy", ".75em")
          .attr("y", 6)
          .attr("x", function(d) { return (x(d.x1) - x(d.x0)) / 2; })
          .attr("text-anchor", "middle")
          .text(function(d) { return d.length; });

      }

      updateData();
    });
  }

  chart.data = function(_) {
    if (!arguments.length) return data;
    data = _;
    if (typeof updateData === 'function') updateData();
    return chart;
  }

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

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

  return chart;
}
