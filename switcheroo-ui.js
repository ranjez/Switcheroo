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

	    $scope.edit = function(index) {
			var rule = $scope.rules[index];
			rule.from = $scope.editFrom;
			rule.to = $scope.editTo;
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