
window.onload = function() {

// selectAll + data + enter + append

var width = 980,
  height = 500,
  padding = 1.5, // separation between same-color nodes
  // clusterPadding = 6,
  // maxRadius = 30,
  // radius = 30;

d3.json("data.json", function(data) {
  list = data.results.character_enemies
  console.log(list[0].name)
  list.forEach(function(element, index, array){
        list[index].radius = radius,
        list[index].x = Math.cos(2 * Math.PI) * 200 + width / 2 + Math.random(),
        list[index].y = Math.sin(2 * Math.PI) * 200 + height / 2 + Math.random()
        list[index].width=30
        list[index].height=30
})

  nodes = list
  console.log(nodes)

  var force = d3.layout.force()
    .nodes(nodes)
    .size([width, height])
    .gravity(.02)
    .charge(0)
    .on("tick", tick)
    .start();

  var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height",height);


  var node = svg.selectAll("g")
    .data(nodes)
    .enter()
    .append("g")
    .call(force.drag);

  // var circles = node.append("circle")
  //       .attr("cy", node.y)
  //       .attr("cx", node.x)
  // node.append("circle")
  //   .attr("r", function(d) {return radius;})
  //   //.attr("cx", function(d) {return radius * 2;})
  //   //.attr("x", divHeight - 1);
  //   //.attr("y", divHeight / 2);

var label = node.append("text")
  .text(function(d){return d.name;});

  node.transition()
  .duration(750)
  .delay(function(d, i) { return i * 5; })
  .attrTween("r", function(d) {
    var i = d3.interpolate(0, d.width);
    return function(t) { return d.width = i(t); };
  });

  function tick(e) {
  node
      //.each(cluster(10 * e.alpha * e.alpha))
      .each(collide(.5))
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; });
}

  // Resolves collisions between d and all other circles.
function collide(alpha) {
  var quadtree = d3.geom.quadtree(nodes);
  return function(d) {
    var r = d.width + width + Math.max(padding, clusterPadding),
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
