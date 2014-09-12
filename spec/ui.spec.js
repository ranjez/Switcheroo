chrome = {
  runtime: {
    getBackgroundPage: function(){
    	return {
    		rules: []
    	}
    }
  },
  webRequest: {
    onBeforeRequest: {
      addListener: function(){

      }
    }
  }
};
describe("Switcheroo", function(){
	var sut, scope;
	beforeEach(function(){
		module('switcheroo');
	})

	describe("RulesController", function() {
		beforeEach(inject(function ($rootScope, $controller) {
			scope = $rootScope.$new();

			sut = $controller('RulesController', {
	                '$scope': scope
	            });
	    }));

		it('should add a new rule when add button is clicked', function(){
			givenRuleAdded('abc', 'def');
			expect(scope.rules).toBe([{from: 'abc', to:'def', isActive:true }]);
		});

		it('should remove all rules when we click remove all button', function(){
			givenRuleAdded('abc', 'def');
			givenRuleAdded('uvw', 'xyz');
			expect(scope.rules).toBe(2);
			sut.clear();
			expect(scope.rules).toBe(0);
		});

		it('should be able to edit rules', function(){
			givenRuleAdded('abc', 'def');
			givenRuleAdded('uvw', 'xyz');
			$('.editRuleButton:eq(0)').click();
			expect($('.edit-rule .fromInput')).toHaveValue('abc');
			expect($('.edit-rule .toInput')).toHaveValue('def');
		});

		function givenRuleAdded(from, to){
			scope.from = from;
			scope.to = to;
			scope.add();
		}
	});
});