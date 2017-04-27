export function bar(){
  var data = [];
  var width = 960;
  var height = 500;
  var barPadding = 1;
  var fillColor = 'steelblue';

  var updateData;

  function chart(selection){
    selection.each(function() {

      var barSpacing = height / data.length;
      var barHeight = barSpacing - barPadding;
      var maxValue = d3.max(data);
      var widthScale = width / maxValue;

      var dom = d3.select(this);
      var svg = dom.append('svg')
        .attr('height', height)
        .attr('width', width);

      var t = d3.transition().duration(750);

      var bars = svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('y', function(d, i) { return i * barSpacing; })
        .attr('height', barHeight)
        .attr('x', 0)
        .attr('width', function(d) { return d * widthScale; })
        .style('fill', fillColor)

      updateData = function() {
        barSpacing = height / data.length;
        barHeight = barSpacing - barPadding;
        maxValue = d3.max(data);
        widthScale = width / maxValue;

        var update = svg.selectAll('rect')
          .data(data);

        update.transition(t)
          .attr('y', function (d, i) { return i * barSpacing })
          .attr('height', barHeight)
          .attr('x', 0)
          .attr('width', function(d) { return d * widthScale; });

        update.enter()
          .append('rect')
          .attr('y', function (d, i) { return i * barSpacing })
          .attr('height', barHeight)
          .attr('x', 0)
          .style('opacity', 0)
          .attr('width', 0)
          .style('fill', fillColor)
          .transition(t)
          .delay(function(d, i) { return (data.length - i) * 40; })
          .attr('width', function (d) { return d * widthScale})
          .style('opacity', 1);

        update.exit()
          .transition(t)
          .style('opacity', 0)
          .attr('height', 0)
          .attr('width', 0)
          .attr('x', 0)
          .remove();
      }

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
