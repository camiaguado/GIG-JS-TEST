var addressApp = angular.module('addressApp', ['ngRoute'])

.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'templates/list.html',
			controller: 'listController',
			reloadOnSearch: false,
		})
		.when('/contact', {
			templateUrl: 'templates/contact.html',
			controller: 'contactController',
			reloadOnSearch: false,
		})
})

.controller('mainController', function($scope) {
	var datos = localStorage.getItem("addressApp_data");
	if(datos != null) {
		$scope.contacts = [];
		var rawContacts = JSON.parse(datos);
		_(rawContacts).forEach(function(value){
			$scope.contacts.push(new Contact(value));
		});
	}else{
		$scope.contacts= [
			new Contact({first_name: "Camila", last_name: "Aguado", email: "camiaguado@gmail.com", country: "AR"}),
			new Contact({first_name: "Manuel", last_name: "Perez", email: "manuperez@gmail.com", country: "BR"}),
			new Contact({first_name: "Jose", last_name: "Escudero", email: "jose_escudero@gmail.com", country: "BR"}),
			new Contact({first_name: "Luis", last_name: "Bolivar", email: "luis@gmail.com", country: "AR"}),
		];
	}
	console.log($scope.contacts);
})


// List:

.controller('listController', function($scope, $location){
	document.getElementsByTagName("html")[0].className = "listController";

	$scope.goForm = function(_id){
		$location.path("contact").search({id: _id});
	}
})

// Form:

.controller('contactController', function($scope, $routeParams, $location){
	document.getElementsByTagName("html")[0].className = "contactController";

	$scope.goList = function(){
		$location.path("/");
	}
	$scope.countries = window.countries;
	$scope.new = true;
	var id_param = Number($routeParams.id);	
	if(!_.isNaN(id_param)){
		$scope.savedContact = _.find($scope.contacts, function(obj){
			return obj.id == id_param;
		});
		$scope.contact = angular.copy($scope.savedContact);
		$scope.new = false;
	}
	$scope.add = function(){
		var new_contact = new Contact();
		_.forIn($scope.contact, function(value, key) {
			new_contact[key] = value;
		});
		$scope.contacts.push(new_contact);
		returnHome();
	}
	$scope.update = function(){
		_.forIn($scope.contact, function(value, key) {
			$scope.savedContact[key] = value;
		});
		returnHome();
	}
	$scope.delete = function(){
		var deleted = _.remove($scope.contacts, function(object){
			return object.id == $scope.contact.id;
		});
		returnHome();
	}
	var returnHome = function(){
		persistData();
		$scope.goList();
	}
	var persistData =  function() {
		localStorage.setItem("addressApp_data", JSON.stringify($scope.contacts));
	}
})