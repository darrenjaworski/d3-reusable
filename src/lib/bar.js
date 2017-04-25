export function bar(){
  var data = [];
  var width = 960;
  var height = 500;
  var barPadding = 1;
  var fillColor = 'steelblue';

  function chart(selection){
    selection.each(function() {
      var barSpacing = height / data.length;
      var barHeight = barSpacing - barPadding;
      var maxValue = d3.max(data);
      var widthScale = width / maxValue;

      var t = d3.transition().duration(750);

      var svg = d3.select(this).append('svg')
        .attr('height', height)
        .attr('width', width);

      var bar = svg.selectAll('rect')
        .data(data);

      bar.exit()
        .attr('class', 'exit')
        .transition(t)
        .attr('width', function (d) { return d * widthScale})
        .style('fill-opacity', 1e-6)
        .remove();

      bar.attr('class', 'update')
        .attr('width', 0)
        .style('fill-opacity', 1)
        .transition(t)
        .attr('x', 0)

      bar.enter().append('rect')
        .attr('class', 'enter')
        .attr('y', function (d, i) { return i * barSpacing })
        .attr('height', barHeight)
        .attr('x', 0)
        .attr('width', function (d) { return d * widthScale})
        .style('fill', fillColor);

    });
  }

  chart.data = function(_) {
    if (!arguments.length) return data;
    data = _;
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

  chart.barPadding = function(_) {
    if (!arguments.length) return barPadding;
    barPadding = _;
    return chart;
  }

  chart.fillColor = function(_) {
    if (!arguments.length) return fillColor;
    fillColor = _;
    return chart;
  }

  return chart;
}
