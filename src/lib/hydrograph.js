import { ChartDefault } from './defaults';

export function hydrograph(){

  var margin = ChartDefault.margin;
  var width = ChartDefault.width;
  var height = ChartDefault.height;

  function chart(selection) {
    selection.each(function(data) {
      console.log(data)
    });
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
