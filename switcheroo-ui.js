angular.module('switcheroo', [])
  .controller('RulesController', ['$scope', function($scope) {
    $scope.rules = chrome.runtime.getBackgroundPage().rules;
 
    $scope.add = function() {
      $scope.rules.push({
		from: this.from,
		to: this.to,
		isActive: true
	  });
    };

    $scope.edit = function(index, rule) {
		$scope.rules[index] = rule;
	};

	$scope.remove = function(index) {
		$scope.rules.splice(index,1);
	};

	$scope.clear = function() {
		$scope.rules = [];
	};
 
  }]);

var SwitcherooUI = function(){
	var ruleManager;

	this.init = function() {
		ruleManager = new SwitcherooCore(chrome.runtime.getBackgroundPage().rules);
		rulesUl = $('#rules');
		newRuleDiv = $('#new-rule');

		$('#rules').delegate('.active', 'click', function() {
			toggleRule(parseInt($(this).parent().attr('data-rule-index')));
		});
		

		$('#rules').delegate('.editRuleButton', 'click', function() {

			var ruleParent = $(this).parent();
			var editIndex = parseInt(ruleParent.attr('data-rule-index'));
		});	

		$('#fromInput').focus();
	};

	var refreshRules = function() {
		rulesUl.empty();
		var rules = ruleManager.rules;
		if(rules.length){
			$('#no-rules').hide();
			$('#headings').show();
			for (var i = 0; i < rules.length; i++) {
				var rule = rules[i];
				var li = $('<li class="' + rule.isActive + '" data-rule-index="' + i + '"/>');
				var fromSpan = '<span class="from" title="' + rule.from + '">' + textMinifier(rule.from) + '</span>';
				var seperator = '<span class="seperator">&gt;</span>'
				var toSpan = '<span class="to" title="' + rule.to + '">' + textMinifier(rule.to) + '</span>';
				var checked = rule.isActive ? 'checked="checked"' : '';
				var active = '<input type="checkbox" class="active" name="active" ' + checked + '/>'
				var editLink = '<a href="#" class="editRuleButton">Edit</a>'
				var removeLink = '<a href="#" class="removeRuleButton">Remove</a>';		
				li.append(fromSpan + seperator + toSpan + active + editLink + removeLink);
				rulesUl.append(li);
			}
		}
		else
		{
			$('#no-rules').show();
			$('#headings').hide();
		}
	};

	var getNewRule = function(){
		var fromInput, toInput, typeDropDown;

		fromInput = newRuleDiv.children('#fromInput');
		toInput = newRuleDiv.children('#toInput');

		var newRule = {
			from : fromInput.val(),
			to : toInput.val(),
			isActive: true
		};

		refreshRules();

		fromInput.val('');
		toInput.val('');

		return newRule;
	};
}

function textMinifier(text){
		var maxLength = 25;
		if(text && text.length > maxLength){
			text = text.substring(0,maxLength) + "...";
		}

		return text;
	}

	function convertRuleToEditMode(ruleParent, editIndex, rule){
		ruleParent.empty();

		var editRuleDiv = $('<div class="edit-rule" />');

		var fromInput =	$('<input type="text" class="fromInput" name="fromInput" />').val(rule.from);
		var seperator = $('<span class="seperator">&gt;</span>');
		var toInput = $('<input type="text" class="toInput" name="toInput" />').val(rule.to);
		var updateRuleButton = $('<input type="button" value="Update" name="AddRule" />');

		editRuleDiv.append(fromInput).append(seperator).append(toInput).append(updateRuleButton);

		updateRuleButton.click(function(){
			var updatedRule = {
				from : fromInput.val(),
				to : toInput.val(),
				isActive: true
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