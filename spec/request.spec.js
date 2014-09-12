describe("switcheroo core tests", function() {

  var sut = null;

  beforeEach(function(){
    rulesManager = new RulesManager();
    // SwitcherooUI = {
    //   getNewRule: function(){}
    // },
    chrome = {
      runtime: {
        getBackgroundPage: function(){
          
        }
      },
      webRequest: {
        onBeforeRequest: {
          addListener: function(){

          }
        }
      }
    };
    spyOn(chrome.runtime, 'getBackgroundPage').and.returnValue({ 'rules': [] });
    sut = new SwitcherooCore();
  });


  it("should be able to add a rule", function() {
    sut.addRule({from: 'abc', to: 'def', isActive:true });

    expect(sut.rules).toEqual([{from: 'abc', to: 'def', isActive:true }]);
  });

  it("should be able to remove all rules", function() {
    sut.addRule({from: 'abc', to: 'def', isActive:true });
    sut.addRule({from: 'abc', to: 'def', isActive:true });

    sut.clearRules();

    expect(sut.rules).toEqual([]);
  });

  it("should be able to edit rules", function() {
    sut.addRule({from: 'abc', to: 'def', isActive:true });
    sut.addRule({from: 'abc', to: 'def', isActive:true });

    sut.editRule(0, {from: 'xyz', to: 'uuu', isActive: true});
    sut.editRule(1, {from: 'aaa', to: 'bbb', isActive: false});

    expect(sut.rules).toEqual([{from: 'xyz', to: 'uuu', isActive: true}, {from: 'aaa', to: 'bbb', isActive: false}]);
  });

  it("should be able to remove rule", function() {
    sut.addRule({from: 'abc', to: 'def', isActive:true });
    sut.addRule({from: 'ggg', to: 'hhh', isActive:true });

    sut.removeRule(1);

    expect(sut.rules).toEqual([{from: 'abc', to: 'def', isActive: true}]);
  });

  it("should be able to toggle rule", function() {
    sut.addRule({from: 'abc', to: 'def', isActive:true });
    sut.addRule({from: 'ggg', to: 'hhh', isActive:false });

    sut.toggleRule(0);
    sut.toggleRule(1);

    expect(sut.rules).toEqual([{from: 'abc', to: 'def', isActive: false}, {from: 'ggg', to: 'hhh', isActive: true}]);
  });
});
