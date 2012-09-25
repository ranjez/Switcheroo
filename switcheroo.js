var rules = [];
var rulesUl, newRuleDiv;

function refreshRules() {
	rulesUl.empty();

	for (var i = 0; i < rules.length; i++) {
		var rule = rules[i];
		var li = $('<li class="' + rule.isActive + '" data-rule_index="' + i + '"/>');
		var fromSpan = '<span class="from">' + rule.from + '</span>';
		var seperator = '<span class="seperator">&gt;</span>'
		var toSpan = '<span class="to">' + rule.to + '</span>';
		var checked = rule.isActive ? 'checked="checked"' : '';
		var active = '<input type="checkbox" class="active" name="active" ' + checked + '/>'
		var editLink = '<a href="#" class="editRuleButton">Edit</a>'
		var removeLink = '<a href="#" class="removeRuleButton">Remove</a>';		
		li.append(fromSpan + seperator + toSpan + active + editLink + removeLink);
		rulesUl.append(li);
	}
}

function addRule() {
	var fromInput, toInput, typeDropDown;

	fromInput = newRuleDiv.children('#fromInput');
	toInput = newRuleDiv.children('#toInput');

	var newRule = {
		from : fromInput.val(),
		to : toInput.val(),
		isActive: true
	};

	chrome.extension.sendMessage({
		rule : newRule
	}, function(response) {
		rules = response.rules;
		refreshRules();
	});

	fromInput.val('');
	toInput.val('');
}

function removeAllRules() {
	
	chrome.extension.sendMessage({
		removeAllRules : true
	}, function(response) {
		rules = response.rules;
		refreshRules();
	});
}

function toggleRule(index){
	chrome.extension.sendMessage({
		toggleIndex : index
	}, function(response) {
		rules = response.rules;
		refreshRules();
	});
}

function editRule(index, rule) {
	
	chrome.extension.sendMessage({
		editIndex : index,
		updatedRule : rule
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

function convertRuleToEditMode(ruleParent, editIndex){
	var currentRule = getRuleFromListItem(ruleParent);

	ruleParent.empty();

	var editRuleDiv = $('<div class="edit-rule" />');

	var fromInput =	$('<input type="text" class="fromInput" name="fromInput" />').val(currentRule.from);
	var toInput = $('<input type="text" class="toInput" name="toInput" />').val(currentRule.to);
	var updateRuleButton = $('<input type="button" value="Update" name="AddRule" />');

	editRuleDiv.append(fromInput).append(toInput).append(updateRuleButton);

	updateRuleButton.click(function(){
		var updatedRule = {
			from : fromInput.val(),
			to : toInput.val(),
		};

		editRule(editIndex, updatedRule);
	});

	ruleParent.append(editRuleDiv);
}

function getRuleFromListItem(listItem){
	var from = listItem.children('.from').text();
	var to = listItem.children('.to').text();

	return {
		from:from,
		to:to,
	};
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

	$('#rules').delegate('.active', 'click', function() {
		toggleRule(parseInt($(this).parent().attr('data-rule_index')));
	});
	
	$('#rules').delegate('.removeRuleButton', 'click', function() {
		removeRule(parseInt($(this).parent().attr('data-rule_index')));
	});

	$('#rules').delegate('.editRuleButton', 'click', function() {
		var ruleParent = $(this).parent();
		var editIndex = parseInt(ruleParent.attr('data-rule_index'));

		convertRuleToEditMode(ruleParent, editIndex);
	});	

	$('#fromInput').focus();
});