var ourApps = angular.module('ourApps', []);

ourApps.controller('IndexController', ['$scope', '$http', function ($scope, $http){
	console.log("IndexController loaded");

	$http({
		method: 'GET',
		url: '/customers'
	}).then(function (response){
		console.log('response object', response);
		$scope.customers = response.data;

		response[0]

		$scope.selection = "noOrders"
	});

	$scope.getOrders = function (id) {
		console.log('id', id);
		$http({
			method: 'GET',
			url: '/customers/' + id
		}).then(function (response){
			console.log('response object', response);
			$scope.order = response.data;
			
		})
	}
}]);
