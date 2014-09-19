angular.module('switcheroo', []).
	factory('RulesService', ['LocalRulesService', function(rulesService){
		return rulesService;
	}]).
	service('LocalRulesService', [function() {
		this.get = function(){
			return JSON.parse(localStorage['rules']);
		};
		this.set = function(data){
			localStorage['rules'] = JSON.stringify(data);
		};
	}]);