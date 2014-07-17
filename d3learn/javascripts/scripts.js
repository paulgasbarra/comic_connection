
window.onload = function renderList() {

// selectAll + data + enter + append

var width = 1280,
  height = 700,
  padding = 1.5, // separation between same-color nodes
  clusterPadding = 6,
  maxRadius = 30,
  radius = 80;

d3.json("data.json", function(data) {
  list = data.results.character_enemies
  console.log(list[0].name)
  list.forEach(function(element, index, array){


        //cluster: i,
        list[index].radius = Math.floor(Math.random()*10)+30
        list[index].x = Math.cos(2 * Math.PI) * 200 + width / 2 + Math.random()
        list[index].y = Math.sin( 2 * Math.PI) * 200 + height / 2 + Math.random()
        list[index].width=30
        list[index].height=30
        list[index].textOffset = list[index].name.length

})

  nodes = list

  console.log(nodes)

  var force = d3.layout.force()
    .nodes(nodes)
    .size([width, height])
    .gravity(.05)
    .charge(.2)
    .on("tick", tick)
    .start();

  var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height",height);


  var elem = svg.selectAll("g").data(nodes)

  var elemEnter = elem.enter().append("g");


  var circle = elemEnter.append('circle')
    .attr('r', function(d){return d.radius})
    .call(force.drag);

  var text = elemEnter.append('text')
    .attr("dx", function(d){return -20})
    .text(function(d){ return d.name })
    .style("text-anchor", "middle")
    //.attr("transform", function(d,i){ return "translate(0,"+i *divHeight + ")";});
    .call(force.drag);

  var link = elemEnter.append("svg:a")
    .attr("xlink:href", function(d){return d.api_detail_url})


  // node.append("circle")
  //   .attr("r", function(d) {return radius;})
  //   //.attr("cx", function(d) {return radius * 2;})
  //   //.attr("x", divHeight - 1);
  //   //.attr("y", divHeight / 2);

// label = svg.selectAll("text")
//   .data(nodes)
//   .enter().append("text")
//   .attr("x", node.cx)
//   .attr("y", node.cy)
//   //.attr("x", function(d) {return radius*2-3;})
//   .style("text-anchor", "middle")
//   //.attr("dy", ".35em")
//   .text(function(d){return d.name;})
//   .call(force.drag);

  circle.transition()
  .duration(750)
  .delay(function(d, i) { return i * 5; })
  .attrTween("r", function(d) {
    var i = d3.interpolate(0, d.radius);
    return function(t) { return radius = i(t); };
  });

  function tick(e) {
  circle
      //.each(cluster(10 * e.alpha * e.alpha))
      .each(collide(.5))
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
  text
      .each(collide(.5))
      .attr("dx", function(d) { return d.x; })
      .attr("dy", function(d) { return d.y + 5 ; });
  link
      .each(collide(.5))
      .attr("dx", function(d){return d.x})
      .attr("dy", function(d){return d.y})
}

  // Resolves collisions between d and all other circles.
function collide(alpha) {
  var quadtree = d3.geom.quadtree(nodes);
  return function(d) {
    var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
    quadtree.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d)) {
        var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
        if (l < r) {
          l = (l - r) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    });
  };
}



    });





}
