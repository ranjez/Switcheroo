var RuleMatcher = function(rules){
    var lastRequestId;

    this.rules = rules;

    this.redirectOnMatch = function(request){
        var rule = _.find(rules, function(rule){ 
            return rule.isActive 
            && request.url.indexOf(rule.from) > -1 
            && request.requestId !== lastRequestId; 
        });

        if(rule){
            lastRequestId = request.requestId;
            return {
                redirectUrl : request.url.replace(rule.from, rule.to)
            };
        }
    };
};