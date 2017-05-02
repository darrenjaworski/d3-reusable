export function bar(){
  var data = [];
  var width = 960;
  var height = 500;
  var barPadding = 1;
  var fillColor = 'steelblue';

  var updateData;

  function chart(selection){
    selection.each(function() {
      var dom = d3.select(this);
      var svg = dom.append('svg')
        .attr('height', height)
        .attr('width', width);
        var t = d3.transition().duration(750);

      updateData = function() {
        var barSpacing = height / data.length;
        var barHeight = barSpacing - barPadding;
        var maxValue = d3.max(data);
        var widthScale = width / maxValue;

        // join
        var bars = svg.selectAll('rect')
          .data(data);

        // exit
        bars.exit()
          .transition(t)
          .style('opacity', 0)
          .remove();

        // update
        bars.style('opacity', 1)
          .transition(t)
          .attr('y', function (d, i) { return i * barSpacing; })
          .attr('height', barHeight);

        // enter
        bars.enter()
          .append('rect')
          .attr('y', function(d, i) { return i * barSpacing; })
          .attr('height', barHeight)
          .attr('x', 0)
          .attr('width', 0)
          .style('fill', fillColor)
          .style('opacity', 0)
          .transition(t)
          .style('opacity', 1)
          .attr('width', function(d) { return d * widthScale; });
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
