import { ChartDefaults } from './defaults';

function histogram() {
  let updateData;
  let data = [];
  let margin = ChartDefaults.margin;
  let width = ChartDefaults.width;
  let height = ChartDefaults.height;

  const x = d3.scaleLinear().range([0, width]);

  const y = d3.scaleLinear().range([height, 0]);

  const hist = d3.histogram().value(d => d);

  function chart(selection) {
    selection.each(function eachSelection() {
      const t = d3.transition().duration(750);
      const dom = d3.select(this);

      const svg = dom
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const xAxis = svg
        .append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      updateData = function updateDataFn() {
        x.domain(d3.extent(data, d => d));

        const bins = hist.domain(x.domain()).thresholds(x.ticks(10))(data);

        y.domain([0, d3.max(bins, d => d.length)]);

        // join
        const g = svg.selectAll('.bar').data(bins);

        // exit
        g.exit().transition(t).style('opacity', 0).remove();

        // update
        g
          .style('opacity', 1)
          .transition(t)
          .attr('transform', d => `translate(${x(d.x0)},${y(d.length)})`);

        // enter
        const bar = g
          .enter()
          .append('g')
          .attr('class', 'bar')
          .attr('transform', d => `translate(${x(d.x0)},${y(d.length)})`);

        bar
          .append('rect')
          .attr('x', 1)
          .attr('width', d => x(d.x1) - x(d.x0) - 1)
          .attr('height', d => height - y(d.length));

        bar
          .append('text')
          .attr('dy', '.75em')
          .attr('y', 6)
          .attr('x', d => (x(d.x1) - x(d.x0)) / 2)
          .attr('text-anchor', 'middle')
          .text(d => d.length);
      };

      updateData();
    });
  }

  chart.data = function dataFn(_) {
    if (!arguments.length) return data;
    data = _;
    if (typeof updateData === 'function') updateData();
    return chart;
  };

  chart.margin = function marginFn(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function widthFn(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function heightFn(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  return chart;
}

export default histogram;
