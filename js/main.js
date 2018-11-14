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

.controller('contactController', function($scope){
	document.getElementsByTagName("html")[0].className = "contactController";	
})