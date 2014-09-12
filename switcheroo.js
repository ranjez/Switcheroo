var SwitcherooCore = function(rules){
	this.rules = rules;
	var rulesUl, 
		newRuleDiv;

	this.addRule = function(rule) {
		this.rules.push(rule);
	};

	this.editRule = function(index, rule) {
		this.rules[index] = rule;
	}

	this.removeRule = function(index) {
		this.rules.splice(index,1);
	}

	this.clearRules = function() {
		this.rules = [];
	}

	this.toggleRule = function(index){
		this.rules[index].isActive = !this.rules[index].isActive;
	}

	function updateStorage(rule, update){
		chrome.extension.sendMessage({
			updateRules: update
		}, function(response) {
			rules = response.rules;
		});
	}
};