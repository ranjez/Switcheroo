var RuleMatcher = function(rules){
    var lastRequestId;

    this.rules = rules;

    this.redirectOnMatch = function(request){
        var rule = _.find(rules, function(rule){
            // Don't match user/pat/query parts of URL
            var url = new URL(request.url);
            url.username='';
            url.password='';
            url.pathname='';
            url.search='';
            return rule.isActive
            && url.toString().indexOf(rule.from) > -1
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