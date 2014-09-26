var LocalRulesService = function (){
		this.get = function(){
			var stroredRules = localStorage['rules'];

			if(!stroredRules){
				return [];
			}

			return JSON.parse(stroredRules);
		};
		this.set = function(rules){
			localStorage['rules'] = JSON.stringify(rules);
		};
};

var SyncedRulesService = function(){
	this.get = function(){
		var rules = [];
		chrome.storage.sync.get('rules', function(item){
			rules = item.rules;
		});

		return rules;
	};
	this.set = function(rules){
		chrome.storage.sync.set({'rules': rules});
	};
}

var RulesServiceFactory = {
	getRulesService: function(){
		return new LocalRulesService();
	}
};