import { ChartDefault } from './defaults';

export function histogram(){
  var data = [];
  var margin = ChartDefault.margin;
  var width = ChartDefault.width;
  var height = ChartDefault.height;

  var formatCount = d3.format(",.0f");

  var x = d3.scaleTime()
    .rangeRound([0, width]);

  var y = d3.scaleLinear()
    .range([height, 0]);

  function chart(selection){
    selection.each(function() {
      x.domain(d3.extent(data, function(d) { return d.date; }));

      var histogram = d3.histogram()
        .value(function(d) { return d.date; })
        .domain(x.domain())
        .thresholds(x.ticks(d3.timeWeek));

      var bins = histogram(data);
      y.domain([0, d3.max(bins, function(d) { return d.length; })]);

      var svg = d3.select(this)
        .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,'+ height +')')
        .call(d3.axisBottom(x));

      var bar = svg.selectAll(".bar")
        .data(bins)
        .enter()
        .append("g")
        .attr("class", "bar")
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });

      bar.append("rect")
        .attr("x", 1)
        .attr("width", function(d) { return x(d.x1) - x(d.x0) - 1; })
        .attr("height", function(d) { return height - y(d.length); });

      bar.append("text")
        .attr("dy", ".75em")
        .attr("y", 6)
        .attr("x", function(d) { return (x(d.x1) - x(d.x0)) / 2; })
        .attr("text-anchor", "middle")
        .text(function(d) { return formatCount(d.length); });

    });
  }

  chart.data = function(_) {
    if (!arguments.length) return data;
    data = _;
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
