(function(){
    var ruleMatcher,
        rules;

    if(localStorage['rules']){
        rules = JSON.parse(localStorage['rules']);
    }
    else{
        rules = [];
    }

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
})();