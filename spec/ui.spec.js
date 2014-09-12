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
			expect(scope.rules).toEqual([{from: 'abc', to:'def', isActive:true }]);
		});

		it('should remove all rules when we click remove all button', function(){
			givenRuleAdded('abc', 'def');
			givenRuleAdded('uvw', 'xyz');
			expect(scope.rules).toEqual([
				{from: 'abc', to:'def', isActive:true },
				{from: 'uvw', to:'xyz', isActive:true },
			]);
			scope.clear();
			expect(scope.rules).toEqual([]);
		});

		it('should be able to edit rules', function(){
			givenRuleAdded('abc', 'def');
			givenRuleAdded('uvw', 'xyz');
			
			scope.editFrom = "yyy";
			scope.editTo = "zzz";

			scope.edit(1);

			expect(scope.rules).toEqual([
				{from: 'abc', to:'def', isActive:true },
				{from: 'yyy', to:'zzz', isActive:true },
			]);
		});

		function givenRuleAdded(from, to){
			scope.from = from;
			scope.to = to;
			scope.add();
		}
	});
});