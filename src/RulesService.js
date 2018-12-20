var LocalRulesService = function (){
		this.get = function(){
			if (typeof localStorage['rules'] === 'undefined' || localStorage['rules'] === 'undefined'){
				localStorage['rules'] = JSON.stringify([]);
			}

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