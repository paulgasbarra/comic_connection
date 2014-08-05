
function clearSVG(){
  d3.select("svg").remove();
}

function d3Display(data, options)  {

  var options = options || {};
  var success = options.success || function(){};
  var colorGoal = options.colorGoal || 'green';
  var clickEvent = options.clickEvent || function(d){
    characterAPI = d.api_detail_url; characterData(d.api_detail_url);
  }


  list = $.parseJSON(data)

  if (list.length > 750)(list = list.slice(0,750))

  if (list.length * 30 > 980){var width = 980}else if(list.length*30 < 500){var width = 800}else{var width = list.length * 30};
  if (list.length * 30 > 600){var height = 600}else if(list.length*30 < 200){var height = 200}else{var height = list.length * 20};

  var
    padding = 1.5,
    clusterPadding = 6,
    maxRadius = 30,
    radius = 80;

  var color = d3.scale.category10()
    .domain(d3.range(10));

  d3.json(list.json, function(data) {
    console.log("This is list data: " + data)
    list.forEach(function(element, index, array){

          list[index].radius = Math.floor(Math.random()*10)+30
          list[index].x = Math.cos(2 * Math.PI) * 200 + width / 2 + Math.random()
          list[index].y = Math.sin( 2 * Math.PI) * 200 + height / 2 + Math.random()
          // list[index].width=30
          // list[index].height=30
          list[index].textOffset = list[index].name.length

    })

    nodes = list

    console.log(nodes)

    var force = d3.layout.force()
      .nodes(nodes)
      .size([width, height])
      .gravity(.05)
      .charge(.1)
      .on("tick", tick)
      .start();

    var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height",height);

     var elem = svg.selectAll("g").data(nodes)


     var elemEnter = elem.enter().append("g");

     var circle = elemEnter.append('circle')
        .style('fill', colorGoal)
        .attr('r', function(d){return d.radius})
      .call(force.drag)
      .style("cursor", "pointer")
      .on("click", function clickEventWrapper(d) { clickEvent(d) })

    var text = elemEnter.append('text')
      .attr("dx", function(d){return -20})
      .text(function(d){ return d.name })
      .style("text-anchor", "middle")
      .call(force.drag)
      .style("cursor", "pointer")
      .on("click", function clickEventWrapper(d) { clickEvent(d) })

    circle.transition()
      .duration(750)
      .delay(function(d, i) { return i * 5; })
      .attrTween("r", function(d) {
        var i = d3.interpolate(0, d.radius);
        return function(t) { return radius = i(t); };

        success()

  });

  function tick(e) {

  circle
      .each(collide(.2))
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y-1; })


  text
      .each(collide(.2))
      .attr("dx", function(d) { return d.x; })
      .attr("dy", function(d) { return d.y; })

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
