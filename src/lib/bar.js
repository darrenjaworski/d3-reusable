import colorCheck from 'is-css-color';

function bar() {
  let data = [];
  let width = 600;
  let height = 400;
  let barPadding = 1;
  let fillColor = 'steelblue';
  let durationTime = 750;
  let accessor = null;
  let isVertical = false;
  // var accessorFunction = function(d) {
  //   return accessor ? d[accessor] : d;
  // };
  const accessorFunction = d => d;

  let updateData;

  function chart(selection) {
    selection.each(function eachSelection() {
      const dom = d3.select(this);
      const svg = dom.append('svg').attr('height', height).attr('width', width);
      const t = d3.transition().duration(durationTime);

      updateData = () => {
        const config = {
          dirAxis: isVertical ? 'x' : 'y',
          dirValue: isVertical ? 'width' : 'height',
          compAxis: isVertical ? 'y' : 'x',
          compValue: isVertical ? 'height' : 'width',
        };

        const barSpacing = isVertical ? width / data.length : height / data.length;
        const barSize = barSpacing - barPadding;
        const maxValue = d3.max(data, accessorFunction);
        const barLength = isVertical ? height / maxValue : width / maxValue;

        // join
        const bars = svg.selectAll('rect').data(data);

        // exit
        bars.exit().transition(t).style('opacity', 0).remove();

        // update
        bars
          .style('opacity', 1)
          .transition(t)
          .attr(config.dirAxis, (d, i) => i * barSpacing)
          .attr(config.dirValue, barSize);

        // enter
        bars
          .enter()
          .append('rect')
          .attr(config.dirAxis, (d, i) => i * barSpacing)
          .attr(config.dirValue, barSize)
          .attr(config.compAxis, 0)
          .attr(config.compValue, 0)
          .style('fill', fillColor)
          .style('opacity', 0)
          .transition(t)
          .style('opacity', 1)
          .attr(config.compValue, d => d * barLength);
      };

      updateData();
    });
  }

  chart.data = (_) => {
    if (!arguments.length) return data;
    data = _;
    if (typeof updateData === 'function') updateData();
    return chart;
  };

  chart.width = (_) => {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = (_) => {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.barPadding = (_) => {
    if (!arguments.length) return barPadding;
    barPadding = _;
    return chart;
  };

  chart.accessor = (_) => {
    if (!arguments.length) return accessor;
    accessor = _;
    return chart;
  };

  chart.duration = (_) => {
    if (!arguments.length) return durationTime;
    durationTime = _;
    return chart;
  };

  chart.fillColor = (_) => {
    if (!arguments.length) return fillColor;

    // must be a valid color
    if (!colorCheck(_)) {
      console.warn(`${_} is not a valid color. Try a hex, rgb, hsl or named css color.`);
      return chart;
    }
    fillColor = _;
    return chart;
  };

  chart.isVertical = (_) => {
    if (!arguments.length) return isVertical;

    // must be a valid boolean value
    if (typeof _ !== 'boolean') {
      console.warn('Value passed to the isVertical function must be a boolean.');
      return chart;
    }
    isVertical = _;
    return chart;
  };

  return chart;
}

export default bar;
