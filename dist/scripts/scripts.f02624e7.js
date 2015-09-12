"use strict";angular.module("envConfig",[]).constant("ENV",{name:"Production",apiEndpoint:"https://gh-web-services.herokuapp.com/inveo-api/"}),angular.module("ghAngularApp",["ngResource","ngSanitize","ngTouch","envConfig","ui.router","esri.map"]),angular.module("ghAngularApp").config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/"),a.state("home",{url:"/",templateUrl:"views/home.html",controller:"HomeCtrl as ctrl"})}]),angular.module("ghAngularApp").controller("HomeCtrl",["$scope","esriRegistry",function(a,b){function c(a,b){var c=new esri.tasks.Query;console.log(c);var d=a.extent.getWidth()/a.width*5,e=b.mapPoint.x,f=b.mapPoint.y,g=new esri.geometry.Extent(e-d,f-d,e+d,f+d,b.mapPoint.spatialReference);c.geometry=g;var h=a.getLayer(a.graphicsLayerIds[0]);h.queryFeatures(c,function(a){a.features.forEach(function(a){console.log(a.attributes.MUNICIPALITY)})})}var d=this;d.map={options:{basemap:"streets",center:[-90.381801,38.668909],zoom:10,sliderStyle:"small"}},b.get("stlMap").then(function(b){b.on("click",function(d){a.$apply(c.bind(null,b,d))})})}]),angular.module("ghAngularApp").factory("API",["$http","ENV",function(a,b){function c(c){return a.get(b.apiEndpoint+c)}function d(c){return a.post(b.apiEndpoint+c)}function e(c){return a.put(b.apiEndpoint+c)}function f(c){return a["delete"](b.apiEndpoint+c)}var g={get:c,post:d,put:e,del:f};return g}]),angular.module("ghAngularApp").factory("Citations",["API",function(a){var b={};return b}]),angular.module("ghAngularApp").run(["$templateCache",function(a){a.put("views/header.html",'<nav class="navbar navbar-default navbar-fixed-top"> <div class="container"> <div class="navbar-header"> <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="#">Team Inveo</a> </div> <div id="navbar" class="collapse navbar-collapse"> <ul class="nav navbar-nav"> <li class="active"><a href="#">Home</a></li> </ul> </div><!--/.nav-collapse --> </div> </nav>'),a.put("views/home.html",'<esri-map id="map" map-options="ctrl.map.options" register-as="stlMap"> <esri-feature-layer url="http://maps.stlouisco.com/arcgis/rest/services/OpenData/OpenData/FeatureServer/5"></esri-feature-layer> </esri-map>')}]);