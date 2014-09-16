angular.module('switcheroo', [])
.controller('RulesController', ['$scope', function($scope) {
	$scope.rules = chrome.extension.getBackgroundPage().ruleMatcher.rules;
	$scope.isEditing = false;

	$scope.add = function() {
		$scope.rules.push({
			from: $scope.from,
			to: $scope.to,
			isActive: true
		});

		$scope.from = '';
		$scope.to = '';
	};

	$scope.remove = function(index) {
		$scope.rules.splice(index,1);
	};

	$scope.clear = function() {
		$scope.rules = [];
	};

	$scope.enableEditing = function() {
		$scope.isEditing = true;
	};

	$scope.disableEditing = function() {
		$scope.isEditing = false;
	};

	$scope.shortenText = function (text){
		var maxLength = 25;
		if(text && text.length > maxLength){
			text = text.substring(0,maxLength) + "...";
		}

		return text;
	};

	$scope.$watch('rules', function(oldValue, newValue){
		localStorage['rules'] = JSON.stringify(newValue);
	}, true);
}]);