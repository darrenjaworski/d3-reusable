import { ChartDefault } from './defaults';

export function line() {
  const margin = { top: 20, right: 30, bottom: 30, left: 20 };
  let width = 1000;
  let height = 500;
  let data = [];
  let updateData;
  let yLower;
  let yUpper;
  let colorArr = d3.schemeCategory10;

  function chart(selection) {
    selection.each(function () {
      width = width - margin.left - margin.right;
      height = height - margin.top - margin.bottom;
      yLower =
        typeof yLower !== 'undefined'
          ? yLower
          : d3.min(data.feeds, f => d3.min(f.values, d => d.y));
      yUpper =
        typeof yUpper !== 'undefined'
          ? yUpper
          : d3.max(data.feeds, f => d3.max(f.values, d => d.y));

      const x = d3.scaleTime().range([0, width]).domain([
        d3.min(data.feeds, f => d3.min(f.values, d => d.x)),
        d3.max(data.feeds, f => d3.max(f.values, d => d.x)),
      ]);

      const y = d3.scaleLinear().range([height, 0]).domain([yLower, yUpper]).nice();

      const color = d3.scaleOrdinal(colorArr).domain(
        data.feeds.map(f => f.id),
      );

      const line = d3
        .line()
        .curve(d3.curveBasis)
        .x(d => x(d.x))
        .y(d => y(d.y));

      const dom = d3.select(this);
      const svg = dom
        .append('svg')
        .attr('height', height + margin.top + margin.bottom)
        .attr('width', width + margin.left + margin.right);

      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      g
        .append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      g.append('g').attr('class', 'axis axis--y').call(d3.axisLeft(y));

      const feed = g.selectAll('.feed').data(data.feeds).enter().append('g').attr('class', 'feed');

      feed
        .append('path')
        .attr('class', 'line')
        .style('fill', 'none')
        .style('stroke-width', '2px')
        .attr('d', d => line(d.values))
        .style('stroke', d => color(d.id));

      // feed.append("text")
      //   .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
      //   .attr("transform", function(d) { return "translate(" + x(d.value.x) + "," + y(d.value.y) + ")"; })
      //   .attr("x", 3)
      //   .attr("dy", "0.35em")
      //   .style("font", "10px sans-serif")
      //   .text(function(d) { return d.id; });

      updateData = function () {
        const t = d3.transition().duration(750);

        const updateFeed = g.selectAll('.feed').data(data.feeds);

        const line = updateFeed.selectAll('.line');

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
      };
    });
  }

  chart.showWatch = function (_) {
    if (!arguments.length) return showWatch;
    if (typeof _ !== 'boolean') return showWatch;
    showWatch = _;
    return chart;
  };

  chart.showWarning = function (_) {
    if (!arguments.length) return showWarning;
    if (typeof _ !== 'boolean') return showWarning;
    showWatch = _;
    return chart;
  };

  chart.data = function (_) {
    if (!arguments.length) return data;
    data = _;
    if (typeof updateData === 'function') updateData();
    return chart;
  };

  chart.width = function (_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function (_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.yLower = function (_) {
    if (!arguments.length) return yLower;
    // if ()
    yLower = _;
    return chart;
  };

  chart.yUpper = function (_) {
    if (!arguments.length) return yUpper;
    yUpper = _;
    return chart;
  };

  chart.colorArray = function (_) {
    if (!arguments.length) return colorArr;
    colorArr = _;
    return chart;
  };

  return chart;
}
