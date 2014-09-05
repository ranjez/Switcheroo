var 
	rules,
	lastRequestId;

if(localStorage['rules']){
	rules = JSON.parse(localStorage['rules']);
}
else{
	rules = [];
}

chrome.webRequest.onBeforeRequest.addListener(function(details) {
	return redirectToMatchingRule(details);
}, {
	urls : ["<all_urls>"]
}, ["blocking"]);

function redirectToMatchingRule(details) {
	var rule = _.find(rules, function(rule){ 
		return rule.isActive 
			&& details.url.indexOf(rule.from) > -1 
			&& details.requestId !== lastRequestId; 
	});

	if(rule){
		lastRequestId = details.requestId;
		return {
				redirectUrl : details.url.replace(rule.from, rule.to)
			};
	}
}

chrome.extension.onMessage.addListener(messageHandler);

function messageHandler(request, sender, sendResponse) {
	request.updateRules(rules);
	updateLocalStorage(rules);
	sendResponse({ rules : this.rules });
}

function messageHandler(request, sender, sendResponse) {


	if ( typeof request.rule !== 'undefined') {
		rules.push(request.rule);
		updateLocalStorage(rules);
		sendResponse({


			rules : this.rules
		});
	} else if ( typeof request.removeAllRules !== 'undefined') {
		rules = [];
		updateLocalStorage(rules)
		sendResponse({
			rules : this.rules
		});
	} else if ( typeof request.getRules !== 'undefined') {
		sendResponse({
			rules : this.rules
		});
	} else if ( typeof request.toggleIndex !== 'undefined') {
		rules[request.toggleIndex].isActive = !rules[request.toggleIndex].isActive;
		updateLocalStorage(rules);
		sendResponse({
			rules : this.rules
		});
	} else if ( typeof request.editIndex !== 'undefined') {
		rules[request.editIndex] = request.updatedRule;
		updateLocalStorage(rules);
		sendResponse({
			rules : this.rules
		});
	} else if ( typeof request.removeIndex !== 'undefined') {
		rules.splice(request.removeIndex, 1);
		updateLocalStorage(rules);
		sendResponse({
			rules : this.rules
		});
	} else if ( typeof request.getIndex !== 'undefined') {
		sendResponse({
			rule : rules[request.getIndex]
		});
	}
}

function updateLocalStorage(rules){
	localStorage['rules'] = JSON.stringify(rules);
}