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

describe("switcheroo ui tests", function() {
	var sut = new SwitcherooUI();

	beforeEach(function(done){
		jasmine.getFixtures().createContainer_();
		$('#jasmine-fixtures').load('switcheroo.html #container', function(){
      		//sut.init();
      		
      		done();
     	});
    });

	it('should have empty new rules input', function(){
		expect($('#fromInput')).not.toHaveValue();
	});

	it('should add a new rule when add button is clicked', function(){
		angular.bootstrap(document, ['switcheroo']);
		givenRuleAdded('abc', 'def');
		expect($('#rules li').length).toBe(1);
	});

	it('should remove all rules when we click remove all button', function(){
		givenRuleAdded('abc', 'def');
		givenRuleAdded('uvw', 'xyz');
		expect($('#rules li').length).toBe(2);
		$('#removeAllRulesButton').click();
		expect($('#rules li').length).toBe(0);
	});

	it('should be able to edit rules', function(){
		givenRuleAdded('abc', 'def');
		givenRuleAdded('uvw', 'xyz');
		$('.editRuleButton:eq(0)').click();
		expect($('.edit-rule .fromInput')).toHaveValue('abc');
		expect($('.edit-rule .toInput')).toHaveValue('def');
	});

	function givenRuleAdded(from, to){
		$('#fromInput').val('abc');
		$('#toInput').val('def');
		$('#addRuleButton').click();
	}
});