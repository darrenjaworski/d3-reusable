import colorCheck from 'is-css-color';

export function bar(){
  var data = [];
  var width = 600;
  var height = 400;
  var barPadding = 1;
  var fillColor = 'steelblue';
  var durationTime = 750;
  var accessor = null;
  var isVertical = false;
  // var accessorFunction = function(d) {
  //   return accessor ? d[accessor] : d;
  // };
  var accessorFunction = function(d) {
    return d;
  };

  var updateData;

  function chart(selection){
    selection.each(function(d) {
      var dom = d3.select(this);
      var svg = dom.append('svg')
        .attr('height', height)
        .attr('width', width);
      var t = d3.transition().duration(durationTime);

      updateData = function() {
        var config = {
          dirAxis: isVertical ? 'x' : 'y',
          dirValue: isVertical ? 'width' : 'height',
          compAxis: isVertical ? 'y' : 'x',
          compValue: isVertical ? 'height' : 'width'
        };

        var barSpacing = isVertical ? width / data.length : height / data.length;
        var barSize = barSpacing - barPadding;
        var maxValue = d3.max(data, accessorFunction);
        var barLength = isVertical ? height / maxValue : width / maxValue;

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
          .attr(config.dirAxis, function (d, i) { return i * barSpacing; })
          .attr(config.dirValue, barSize);

        // enter
        bars.enter()
          .append('rect')
          .attr(config.dirAxis, function(d, i) { return i * barSpacing; })
          .attr(config.dirValue, barSize)
          .attr(config.compAxis, 0)
          .attr(config.compValue, 0)
          .style('fill', fillColor)
          .style('opacity', 0)
          .transition(t)
          .style('opacity', 1)
          .attr(config.compValue, function(d) { return d * barLength; });
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

  chart.accessor = function(_) {
    if (!arguments.length) return accessor;
    accessor = _;
    return chart;
  }

  chart.duration =  function(_) {
    if (!arguments.length) return durationTime;
    durationTime = _;
    return chart;
  }

  chart.fillColor = function(_) {
    if (!arguments.length) return fillColor;

    // must be a valid color
    if (!colorCheck(_)) {
      console.warn(_ + ' is not a valid color. Try a hex, rgb, hsl or named css color.');
      return chart;
    }
    fillColor = _;
    return chart;
  }

  chart.isVertical = function(_) {
    if (!arguments.length) return isVertical;

    // must be a valid boolean value
    if (typeof _ !== 'boolean') {
      console.warn('Value passed to the isVertical function must be a boolean.');
      return chart;
    }
    isVertical = _;
    return chart;
  }

  return chart;
}
