   var multipliers=[0.2,0.64,0.8,1,1.25,1.56]




function endPointCenterX(ordinal){

  if(ordinal>3)
  {
    ordinal=ordinal-3;
  }
  return 220 + (ordinal -1) * 150;
}
function endPointCenterY(ordinal){
 if(ordinal>3)
  {
    return 345;
  }else{
    return 95;
  }

}

function endPointHeight(ordinal,data){
  var height = 50;
  return height*multipliers[data.endpoint];
  
}

function endPointWidth(ordinal,data){

  var width = 81;
  return width*multipliers[data.endpoint];
  
}

function endPointX(ordinal,data){
  return endPointCenterX(ordinal) - endPointWidth(ordinal,data)/2;
  
}

function endPointY(ordinal,data){
 
  return endPointCenterY(ordinal) - endPointHeight(ordinal,data)/2;
}

function addEndpoint(endpoints,ordinal){
  endpoints.append("rect")
  .attr("x",function(d){
    return endPointX(ordinal,d);
  })
  .attr("y",function(d){
    return endPointY(ordinal,d);
  })
  .attr("width",function(d){
    return endPointWidth(ordinal,d);
  })
  .attr("height",function(d){
    return endPointHeight(ordinal,d);
  })
  .attr("stroke-width","3")
  .attr("fill","#00B2EF")
  .attr("stroke","#000000");

  endpoints.append("line")
  .attr("stroke-width","3")
  .attr("stroke","#000000")
  .attr("x1",function(d){
    return endPointCenterX(ordinal);
  })
  .attr("x2",function(d){
    return endPointCenterX(ordinal);
  })
  .attr("y1",function(d){
    if(ordinal>3)
    {
      return endPointCenterY(ordinal) - endPointHeight(ordinal,d)/2;
  
    }else{

      return endPointCenterY(ordinal) + endPointHeight(ordinal,d)/2;
    }
    
  })
  .attr("y2",function(d){
    if(ordinal>3)
    {
      return busCenterY + busHeight(d)/2;
  
    }else{

      return busCenterY - busHeight(d)/2;
    }
    
  });

}
var busCenterX = 375; 
var busCenterY = 220;
function busX(d){
  return busCenterX - busWidth(d)/2;
}

function busY(d){

  return busCenterY - busHeight(d)/2;
}

function busWidth(d){
  return 450;// * multipliers[d.bus];
}

function busHeight(d){

  return 40 * multipliers[d.bus];
}

function addBus(bus){
  bus.append("rect")
   .attr("x",busX)
  .attr("y",busY)
  .attr("width",busWidth)
  .attr("height",busHeight)
  .attr("stroke-width","3")
  .attr("fill","#003F69")
  .attr("stroke","#000000");
}


var endpoints = d3.select("#svg").selectAll(".endpoint").data(data).enter()
.append("g")
.classed("endpoint", true);
addEndpoint(endpoints,1);
addEndpoint(endpoints,2);
addEndpoint(endpoints,3);
addEndpoint(endpoints,4);
addEndpoint(endpoints,5);
addEndpoint(endpoints,6);

var bus = d3.select("#svg").selectAll(".bus").data(data).enter()
.append("g")
.classed("bus", true);
addBus(bus);


var recycleGroup = d3.select("#svg").selectAll(".recycle").data(data).enter()
                   .append("g").classed("recycle",true)
                            .attr("transform", function(d,i){
                                var center = {x:150,y:240};                                
                                return "translate(" + center.x +"," + center.y + ")";
                            });

recycleGroup.append("use").attr("xlink:href", "#recycle").attr("transform",function(d){
  return "scale(" + 0.1*multipliers[d.reuse] + ")";
});

var tabletGroup = d3.select("#svg").selectAll(".tablet").data(data).enter()
                   .append("g").classed("tablet",true)
                            .attr("transform", function(d,i){
                                var center = {x:550,y:200};                                
                                return "translate(" + center.x +"," + center.y + ")";
                            });

tabletGroup.append("use").attr("xlink:href", "#tablet").attr("transform",function(d){
  return "scale(" + multipliers[d.admin] + ")";
});


