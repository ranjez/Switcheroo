var RuleMatcher = function(rules){
    var lastRequestId;

    this.rules = rules;

    this.redirectOnMatch = function(request){
        var rule = _.find(rules, function(rule){
            var match = new RegExp(rule.from);
            return rule.isActive && match.test(request.url)  &&
                request.requestId !== lastRequestId;
        });

        if(rule){
            lastRequestId = request.requestId;
            var match = new RegExp(rule.from);
            return {
                redirectUrl : request.url.replace(match, rule.to)
            };
        }
    };
};
