'use strict';

/**
 * @ngdoc directive
 * @name weatherApp.directive:d3Bars
 * @description
 * # d3Bars
 */
angular.module('weatherApp')
  .directive('d3Bars',['cities','d3','$window','$filter','colors','$rootScope',function (cities,d3,$window,$filter,colors,$rootScope) {
    return {
      templateUrl: 'views/d3_bars.html',
      restrict: 'E',
      link: function postLink(scope, element,attrs) {
         scope.cityHistory = cities.cityHistory;
         scope.colors = {};
         var svgContainer =  element.children()[1];
         var margin = parseInt(attrs.margin) || 20;
             
         var svg = d3.select(svgContainer)
                     .append('svg')
                     .style('width', '100%');
                     
         
         window.onresize = function() {
           scope.$apply();
         };
         
         scope.activeGraph = 'temp';
         scope.setActiveGraph = function(val){ //Used to toggle between temp, humidity, and pressure views
           scope.activeGraph = val;
           render();
         };
         
         var graphSet = false;
         // Watch for resize event
         scope.$watch(function() {
           return document.querySelector('.main-container').clientWidth;
         }, function() {
           if(!window._.isEmpty(cities.cities) && graphSet)
           {
              render(); //re-render on window resize
           }
         });

         
         scope.$on('graph-set',function(){
           render();
           graphSet = true;
         });
         
         
         var render = function() {
           //make local copy of the data from the service for brevity;
           var allCities = cities.cities;
           svg.selectAll('*').remove();
           // setup variables
        //   var firstData = _.values(scope.cityHistory)[0];
           var width = d3.select(svgContainer).node().offsetWidth - margin,
               // calculate the height
               height = d3.select(svgContainer).node().offsetHeight - margin,
               // Use the category20() scale function for multicolor support
               color = d3.scale.category10(),
               // our xScale
              
               yScale = d3.scale.linear()
                 .domain([d3.max(allCities, function(city) {
                   return d3.max(city.history, function(d) { return d.main[scope.activeGraph]; });
                 }), d3.min(allCities, function(city) {
                   return d3.min(city.history, function(d) { return d.main[scope.activeGraph]; });
                 })])
                 .range([10, height]),
               // our xScale
              
               xMin = d3.min(allCities, function(city) {
                 return d3.min(city.history, function(d) { return d.dt; });
               }),
               xMax =d3.max(allCities, function(city) {
                 return d3.max(city.history, function(d) { return d.dt; });
               }), 
               xScale = d3.scale.linear()
                 .domain([xMin,xMax ])
                 .range([0, width]);
               
               
              
           // set the height based on the calculations above
           svg.attr('height', height + 40);
           
           // set the axis 
           var xAxis = d3.svg.axis()
               .scale(xScale)
               .orient('bottom')
            //   .tickValues(d3.range(xMin, xMax, 40000)) //40000 is used for 5 day history data
               .tickValues(d3.range(xMin, xMax, 8000)) //40000 is used for 5 day history data
               .tickFormat('');
           var yAxis = d3.svg.axis()
               .scale(yScale)
               .orient('right')
               .tickFormat(function(d) { return $filter(scope.activeGraph)(d); });

           
           //set up the line for the path
           var line = d3.svg.line()
               .interpolate('basis')
               .x(function(d) { return xScale(d.dt); })
               .y(function(d) { return yScale(d.main[scope.activeGraph]); });
           //set the flat line for the transform
           var flatLine = d3.svg.line()
               .interpolate('basis')
               .x(function(d) { return xScale(d.dt); })
               .y(function() { return height; });
           
           //create groups for each city
           var city = svg.selectAll('.city')
                 .data(allCities)
               .enter().append('g')
                 .attr('class', 'city');
           
           
           
           //create paths for the city group     
           city.append('path')
                   .attr('d', function(d){return flatLine(d.history);}) 
                   .attr('stroke', function(d){ colors.colorList[d.id]= color(d.id); return color(d.id);})
                   .attr('stroke-width', 3)
                   .attr('fill', 'none')
                   .transition()  
                   .duration(1500)
                   .delay(function(d, i) { return (i / allCities.length) * 1000; })
                   .attr('d', function(d){return line(d.history);});
            $rootScope.$broadcast('color-set');
            
            svg.append('g')
               .attr('class', 'axis')
            		.attr('transform', 'translate(0,' + height + ')')
            		.call(xAxis)
            		.selectAll('text')
            		.selectAll('tspan')
            		.data(function (d) {return [d3.time.format('%m/%d')(new Date(d*1000)),d3.time.format('%H:%M')(new Date(d*1000))];  })
            		.enter()
            		.append('tspan')
            		.attr('x', 0)
            //		.attr('dx', '-1em')
            		.attr('dy', function (d, i) { return (i===0?'.6em':'1em'); })
            		.text(String);
            		
            		
            svg.append('g')
                .attr('class', 'axis')
                .call(yAxis);
                     
         };
       
      }
    };
  }]);
