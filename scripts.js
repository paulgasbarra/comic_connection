array.prototype
Array.prototype.sample = function() {
   var idx = Math.floor(this.length * Math.random());
   return this[idx];
};

function projectData(list) {

   // Select entire svg
   var svg = d3.select('svg');

   // Need new circles? If so... build them
   var circles = svg.selectAll('circle')
                     .data(list)
                     .enter()
                     .append('circle');

   // Update visualization with new data
   var circles = svg.selectAll('circle')
                     .data(data)
                     .transition()
                        .duration(200)
                           .attr('r', function(d){return d*4 + 'px'})
                           .attr('cx', function(){return (Math.random()*100)+'%'})
                           .attr('cy', function(){return (Math.random()*100)+'%'})
                           .style('opacity', function(){return Math.random()})
                           .style('fill', function(){return crayola.sample().hex});
                           .append

   svg.selectAll('circle')
      .data(data)
      .exit()
      .remove();
};

window.onload = function() {
  d3.select('svg')
    .attr('width', '100%')
    .attr('height', '75%')
    .style('border', '1px solid darkgray');

   setInterval(function() {
      projectData([10, 15, 20, 25, 30]);
   }, 500)
}

