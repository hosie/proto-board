/*
Copyright 2014 
Author John Hosie 
 
  All rights reserved. This program and the accompanying materials
  are made available under the terms of the Eclipse Public License v1.0
  which accompanies this distribution, and is available at
  http://www.eclipse.org/legal/epl-v10.html
 
  Contributors:
      John Hosie - initial implementation 
*/

function initProtoboard(){

    //Set up event handler for data entry
    $("#reloadButton").click(function(){
 
      console.log("posting");
        var codeText = $("#codeInput").val();
        console.log("code input = " + codeText);
        codeText = editor.getValue();
        console.log("code input = " + codeText);
        $.ajax({
			    	type: 'POST',
			    	data: codeText,
			           contentType: 'application/text',
                       url: '/code',						
                       success: function(data) {
                           console.log('success');
                           console.log(JSON.stringify(data));
                           var dataText = $("#dataInput").val();

                           $.ajax({
                             type: 'POST',
                             data: dataText,
                             contentType: 'application/text',
                             url: '/data',						
                             success: function(data) {
                               console.log('success');
                               console.log(JSON.stringify(data));

                               var defs = $("#defsInput").val();
                               $.ajax({
                                 type: 'POST',
                                 data: defs,
                                 contentType: 'application/text',
                                 url: '/defs',						
                                 success: function(data) {
                                   console.log('success');
                                   console.log(JSON.stringify(data));
                                   $('#centerContainer')[0].contentWindow.location.reload(true);

                                 }
                               });                               
                             }
                           });
                       }
               });
        

        

        //var result = eval(evalString);*/
        //add some events to the input data
        //TODO - these events should come from the publications pane?
        /*inputData.on=function(eventName,callback){
            console.log("subscribing to " + eventName);
            console.log("TODO do something about mocking pubsub");
            setInterval(
                function(){
                    callback({topic:eventName});
                },
                5000);
        };*/
        
        //TODO need to create an integration bus object - or whatever object ( e.g. integration node/ integration server etc...) this is...
        //loadWidget(inputData);

    });
}

/*var apiv1Stub = APIv1Stub();
    getData();
}*/

function loadWidget(data){

    //todo make more dymanic
    var currentWidget = {
         name:"Broker circle pack",            
        scalable:true,
        scrollable:false,
        height:400,
        width:400,
        draw:function(div,svg,data){
                var codeText = $("#codeInput").val();
                var result = eval(codeText);
        }
      };
    var widgetContainerDiv= $("#centerContainer");
    var widgetDiv = widgetContainerDiv.append("<div></div>").children(":last");
    var svg = d3.select(widgetDiv.get(0)).append("svg").append("g")
            .attr("width", currentWidget.width)
            .attr("height", currentWidget.height);

    var widgetContainer = {
        //create our drawing canvas
      svg: svg,
      jq : widgetDiv,
      dom : widgetDiv.get(0),
      widget : currentWidget,
      resize: function(rectangle){

                   var scaleFactor;
                   if(this.widget.scrollable == true) {
                       //scale up to file the area, scrolling is allowed so ok to go off canvas in one dimension
                       scaleFactor = Math.max(rectangle.height/this.widget.height,rectangle.width/this.widget.width);
                   }else{
                       scaleFactor = Math.min(rectangle.height/this.widget.height,rectangle.width/this.widget.width);
                   }
                   svg.attr("transform","scale("+scaleFactor+")");
      }
    };

    widgetContainer.jq.addClass("ui-widget-content");
    widgetContainer.jq.draggable();
    widgetContainer.jq.resizable({
        resize: function( event, ui ) {
            widgetContainer.height=ui.size.height;
            widgetContainer.width=ui.size.width;
            widgetContainer.resize(ui.size);
        }
    });
    widgetContainer.jq.css("width",widgetContainer.widget.width);
    widgetContainer.jq.css("height",widgetContainer.widget.height);

    //steal anything that gets dropped in the vicinity of this widget.    
    widgetContainer.jq.droppable({ greedy: true,
        drop: function( event, ui ) {        
              //no-op

        }
    });
    widgetContainer.widget.draw(widgetContainer.dom,widgetContainer.svg,data);
    var svg = d3.select("svg")
     .attr("width", 1000)
     .attr("height", 1000);
}

