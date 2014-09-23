var ruleMatcher,
    rulesService,
    rules;

rulesService = RulesServiceFactory.getRulesService();
rules = rulesService.get();

ruleMatcher = new RuleMatcher(rules);

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        return ruleMatcher.redirectOnMatch(details);
    }, 
    {
        urls : ["<all_urls>"]
    }, 
    ["blocking"]
);