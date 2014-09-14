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