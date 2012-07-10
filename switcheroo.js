var rules = [];
var rulesUl, newRuleDiv;

function refreshRules() {
	rulesUl.empty();

	for (var i = 0; i < rules.length; i++) {
		var rule = rules[i];
		var li = $('<li />');
		li.append('<span class="from">' + rule.from + '</span> <span class="to">' + rule.to + '</span> <a href="#" data-rule_index="' + i + '" class="removeRuleButton">Remove</a>')
		rulesUl.append(li);
	}
}

function addRule() {
	var newRule = {
		from : newRuleDiv.children('#fromInput').val(),
		to : newRuleDiv.children('#toInput').val()
	};

	chrome.extension.sendMessage({
		rule : newRule
	}, function(response) {
		rules = response.rules;
		refreshRules();
	});
}

function removeAllRules() {
	
	chrome.extension.sendMessage({
		removeAllRules : true
	}, function(response) {
		rules = response.rules;
		refreshRules();
	});
}

function removeRule(index) {
	
	chrome.extension.sendMessage({
		removeIndex : index
	}, function(response) {
		rules = response.rules;
		refreshRules();
	});
}


$(document).ready(function() {
	rulesUl = $('#rules');
	newRuleDiv = $('#new-rule')
	
	chrome.extension.sendMessage({
		getRules : true
	}, function(response) {
		rules = response.rules;
		refreshRules();
	});

	$('#addRuleButton').click(function() {
		addRule();
	});
	
	$('#removeAllRulesButton').click(function() {
		removeAllRules();
	});
	
	$('#rules').delegate('.removeRuleButton', 'click', function() {
		console.log(this);
		removeRule(parseInt($(this).attr('data-rule_index')));
	});
});
