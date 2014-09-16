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

		it('should empty rule input when rule is added', function(){
			givenRuleAdded('abc', 'def');
			expect(scope.from).toEqual('');
			expect(scope.from).toEqual('');
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

		it('should be able to remove rules', function(){
			givenRuleAdded('abc', 'def');
			givenRuleAdded('uvw', 'xyz');

			scope.remove(1);

			expect(scope.rules).toEqual([
				{from: 'abc', to:'def', isActive:true }
			]);
		});

		it('should set edit mode to true when we enable edit', function(){
			scope.enableEditing();
			expect(scope.isEditing).toBeTruthy();
		})

		it('should set edit mode to false from beginning and when we disable edit', function(){
			expect(scope.isEditing).toBeFalsy();
			scope.enableEditing();
			expect(scope.isEditing).toBeTruthy();
			scope.disableEditing();
			expect(scope.isEditing).toBeFalsy();
		})

		it('should be able to shorten rules for display', function(){
			expect(scope.shortenText('123456789012345678901234567890')).toEqual('1234567890123456789012345...');
			expect(scope.shortenText('1234567890123456789012345')).toEqual('1234567890123456789012345');
		});

		it('should save rules to localStorage', function(){
			givenRuleAdded('abc', 'def');
			scope.$digest();
			expect(JSON.parse(localStorage['rules'])).toEqual([{from: 'abc', to:'def', isActive:true }]);
		});

		function givenRuleAdded(from, to){
			scope.from = from;
			scope.to = to;
			scope.add();
		}
	});
});