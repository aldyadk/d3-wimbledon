/* global d3 */

// Our canvas
const width = 750, height = 300, margin = 20, marginLeft = 40
const yscale = d3.scaleLinear()
const xscale = d3.scaleLinear()
const leftAxis = d3.axisLeft()
const bottomAxis = d3.axisBottom()

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background-color','#cacaca')

// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv('afcw-results.tsv',rows => {
    let arr = []
    rows.forEach(row=>{
      arr.push(row.GoalsScored)
    })
    redraw(arr)
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  yscale.domain([d3.min(data),d3.max(data)]).range([0,height-2*marginLeft])
  xscale.domain([0,data.length]).range([0,width-marginLeft])
  svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('x',(d,i)=> marginLeft + xscale(i))
  .attr('y',d=>height - yscale(d) - marginLeft)
  .attr('width',i=>xscale(1)-2)
  .attr('height',d=>yscale(d))
  .attr('fill','teal')

  svg.append('g')
  .attr('transform',`translate(${marginLeft})`)
  .call(leftAxis.scale(d3.scaleLinear().domain([d3.min(data),d3.max(data)]).range([height-marginLeft,marginLeft])))

  svg.append('g')
  .attr('transform',`translate(${marginLeft},${height-marginLeft})`)
  .call(bottomAxis.scale(d3.scaleLinear().domain([0,data.length]).range([0,width-marginLeft])))
}

reload()
