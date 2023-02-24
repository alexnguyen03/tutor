var app = angular.module('testApp', [])

app.controller('indexCtrl', indexCtrl)
function indexCtrl($scope) {
	$scope.name = 'Nam'
}
