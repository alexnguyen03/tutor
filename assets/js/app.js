var app = angular.module('testApp', ['ngRoute'])
const roorAPI = 'http://localhost:3000/customers/'
app.controller('indexCtrl', indexCtrl)
app.controller('listCustomerCtrl', listCustomerCtrl)
app.controller('editCtrl', editCtrl)
app.controller('addCtrl', addCtrl)
function indexCtrl($scope, $rootScope, $http) {
	$scope.customers = []
	$scope.customersDraf = []
	// $scope.getAll = function () {
	$http.get(roorAPI).then(function (response) {
		$scope.customers = response.data
		$rootScope.cust = $scope.customers
	})

	// }
	// $scope.getAll()
}
app.config(function ($routeProvider) {
	$routeProvider
		.when('/list', {
			templateUrl: '/views/listCustomer.html',
			controller: 'listCustomerCtrl',
		})
		.when('/add/:id', {
			templateUrl: '/views/actions.html',
			controller: 'editCtrl',
		})
		.when('/add', {
			templateUrl: '/views/actions.html',
			controller: 'addCtrl',
		})
})
function listCustomerCtrl($scope, $http, $rootScope) {
	$scope.edit = function (customer) {
		// console.log(customer)
		$rootScope.customer = customer
	}
	$scope.delete = function (idCustomer) {
		angular.forEach($scope.cust, function (cus) {
			if (cus.id === idCustomer) {
				// console.log(id)
				console.log($scope.cust.indexOf(cus))
				$scope.cust.splice($scope.cust.indexOf(cus), 1)
			}
		})
		// $http({
		// 	method: 'DELETE',
		// 	url: roorAPI + id,
		// }).then(
		// 	function mySuccess(response) {
		// 		// $scope.myWelcome = response.data
		// 	},
		// 	function myError(response) {
		// 		// $scope.myWelcome = response.statusText
		// 	}
		// )
	}
}
function addCtrl($scope, $rootScope, $http) {
	var api_add = roorAPI
	$scope.save = function (customer) {
		console.log(customer)
		$http({
			method: 'POST',
			url: api_add,
			data: customer,
		}).then(
			function mySuccess(response) {
				console.log(response.data)
			},
			function myError(response) {
				// $scope.myWelcome = response.statusText
			}
		)
	}
}
function editCtrl($scope, $rootScope, $http, $routeParams) {
	var api_update = roorAPI + $routeParams.id
	$scope.save = function (customer) {
		console.log(customer)
		$http({
			method: 'PUT',
			url: api_update,
			data: customer,
		}).then(
			function mySuccess(response) {
				// $scope.myWelcome = response.data
			},
			function myError(response) {
				// $scope.myWelcome = response.statusText
			}
		)
	}
}
