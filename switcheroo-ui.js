angular.module('switcheroo', [])
  	.controller('RulesController', ['$scope', function($scope) {
	    $scope.rules = chrome.runtime.getBackgroundPage().rules;
	 
	    $scope.add = function() {
	      $scope.rules.push({
			from: $scope.from,
			to: $scope.to,
			isActive: true
		  });
	    };

		$scope.remove = function(index) {
			$scope.rules.splice(index,1);
		};

		$scope.clear = function() {
			$scope.rules = [];
		};
 }]);

function textMinifier(text){
		var maxLength = 25;
		if(text && text.length > maxLength){
			text = text.substring(0,maxLength) + "...";
		}

		return text;
	}