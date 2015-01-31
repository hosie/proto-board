   svg.selectAll("circle")
   
       .data(data)
       .enter()
       .append("circle")
       .attr("r","50")
       .attr("cx",function(d,i){return 50 + 100*i;})
       .attr("cy",50);