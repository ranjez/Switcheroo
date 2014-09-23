var LocalRulesService = function (){
		this.get = function(){
			return JSON.parse(localStorage['rules']);
		};
		this.set = function(data){
			localStorage['rules'] = JSON.stringify(data);
		};
};

var RulesServiceFactory = {
	getRulesService: function(){
		return new LocalRulesService();
	}
};