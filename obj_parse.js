
function parse_obj_text(obj_file_text) {

  var obj_file_lines = obj_file_text.split("\n");
  
  var vertices = [];
  obj_file_lines.forEach(function(line){
    if (line.startsWith("v ")) {
      var vs = line.split(/[ ]+/);
      vertices.push({x: +vs[1], y: +vs[2], z: +vs[3]});
    }
  });

  var faces = [];
  obj_file_lines.forEach(function(line){
    if (line.startsWith("f ")) {
      var vs = line.split(/[ ]+/);
      var o = vs.shift();
      var f = [];
      vs.forEach(function(v){ 
        f.push(+v.split('/')[0]);
      });
      faces.push(f);
    }
  });
  
  var surfaces = [];
  var vertices_used = [];
  faces.forEach(function(f){
    var surface = [];
    f.forEach(function(v){
      surface.push(vertices[v - 1]);
      vertices_used.push(vertices[v - 1]);
    });
    surfaces.push(surface);
  });

  var vx = vertices_used.map(function(v){ return v.x; }),
      vy = vertices_used.map(function(v){ return v.y; }),
      vz = vertices_used.map(function(v){ return v.z; });

  var min = {x: d3.min(vx), y: d3.min(vy), z: d3.min(vz)};
  var max = {x: d3.max(vx), y: d3.max(vy), z: d3.max(vz)};
  
  var extents = [d3.min([min.x, min.y, min.z]), d3.max([max.x, max.y, max.z])];
  var center = {x: (min.x + max.x)/2, y: (min.y + max.y)/2, z: (min.z + max.z)/2}

  return {vertices: vertices, faces: faces, surfaces: surfaces, 
          extents: extents, center: center};
}
