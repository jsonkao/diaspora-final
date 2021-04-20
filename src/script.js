import { select } from 'd3-selection';
import { line } from 'd3-shape';
import { interpolateViridis as interpolatePlasma } from 'd3-scale-chromatic';

/* Mapping */
const markerBoxWidth = 13;
const markerBoxHeight = 13;
const refX = markerBoxWidth / 2;
const refY = markerBoxHeight / 2;
const arrowPoints = [
  [0, 0],
  [0, markerBoxWidth],
  [markerBoxWidth, markerBoxWidth / 2],
];

[...document.getElementsByClassName('mapping')].forEach(div => {
  const { left, right } = JSON.parse(div.getAttribute('data'));
  select(div)
    .selectAll('div')
    .data([left, null, right])
    .join('div')
    .attr('class', (_, i) => ['left', 'connector', 'right'][i])
    .selectAll('p')
    .data(d => (d ? d.split(', ') : []))
    .enter()
    .append('p')
    .text(d => d)
    .style('background-color', (_, i) => interpolatePlasma(i / 5) + 'cd')
    .style('color', (_, i) => i >= 4 ? '#121212' : '#fff');

  const width = 140;
  const height = 20;
  const svg = select(div)
    .select('.connector')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  svg
    .append('defs')
    .append('marker')
    .attr('id', 'arrow')
    .attr('viewBox', [0, 0, markerBoxWidth, markerBoxHeight])
    .attr('refX', refX)
    .attr('refY', refY)
    .attr('markerWidth', markerBoxWidth)
    .attr('markerHeight', markerBoxHeight)
    .attr('orient', 'auto-start-reverse')
    .append('path')
    .attr('d', line()(arrowPoints))
    .attr('stroke', 'black');

  svg
    .append('path')
    .attr(
      'd',
      line()([
        [0, height / 2],
        [width - refX, height / 2],
      ]),
    )
    .attr('stroke', 'black')
    .attr('marker-end', 'url(#arrow)')
    .attr('fill', 'none');
});

/* Biblliography */

[...document.getElementsByTagName('cite')].forEach((el, i) => {
  el.innerHTML = `<a href="#f${i+1}"><sup>${i+1}</sup></a>`;
});

[...document.getElementsByClassName('bib')].forEach((el, i) => {
  el.innerHTML = `<a name="f${i+1}"><sup>${i+1}</sup></a>${el.innerHTML}`;
})