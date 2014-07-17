
Array.prototype.sample = function() {
   var idx = Math.floor(this.length * Math.random());
   return this[idx];
};

function projectData(data) {

   // Select entire svg
   var svg = d3.select('svg');

   // Need new circles? If so... build them
   var circles = svg.selectAll('circle')
                     .data(data)
                     .enter()
                     .append('circle');

   // Update visualization with new data
   var circles = svg.selectAll('circle')
                     .data(data)
                     //.text("Hi!");
                     .transition()
                        .duration(200)
                           .attr('r', function(d){return d*4 + 'px'})
                           .attr('cx', function(){return (Math.random()*100)+'%'})
                           .attr('cy', function(){return (Math.random()*100)+'%'})
                           .style('opacity', function(){return Math.random()})
                           .style('fill', function(){return crayola.sample().hex});


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

