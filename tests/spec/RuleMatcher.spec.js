describe("RuleMatcher", function() {

  var sut = null;

  it('given no rules then do not return a redirect url', function(){
    sut = new RuleMatcher([]);

    var request = givenRequest(1, 'http://test.com');

    expect(sut.redirectOnMatch(request)).toBeUndefined();
  });

  it('given request url should redirect to matching rule', function(){
    sut = new RuleMatcher([
      givenRule('aaa', 'bbb', true)
    ]);

    var request = givenRequest(1, 'http://aaa.com');

    expect(sut.redirectOnMatch(request)).toEqual({ redirectUrl: 'http://bbb.com' });
  });


  it('given request url should redirect to first matching rule', function(){
    sut = new RuleMatcher([
      givenRule('foo', 'bar', true),
      givenRule('food', 'bbb', true)
    ]);

    var request = givenRequest(1, 'http://food.com');

    expect(sut.redirectOnMatch(request)).toEqual({ redirectUrl: 'http://bard.com' });
  });

  it('given request url should redirect to rule with regexp matching', function(){
    sut = new RuleMatcher([
      givenRule('fo+', 'bar', true),
    ]);

    var request = givenRequest(1, 'http://food.com');

    expect(sut.redirectOnMatch(request)).toEqual({ redirectUrl: 'http://bard.com' });
  });

  it('given request url should redirect to first matching active rule', function(){
    sut = new RuleMatcher([
      givenRule('foo', 'bar', false),
      givenRule('food', 'bbb', true)
    ]);

    var request = givenRequest(1, 'http://food.com');

    expect(sut.redirectOnMatch(request)).toEqual({ redirectUrl: 'http://bbb.com' });
  });

  it('given request url should redirect to matching rule but not if the request ids match', function(){
    sut = new RuleMatcher([
      givenRule('a', 'aa', true)
    ]);

    var request = givenRequest(1, 'http://a.com');
    var response = sut.redirectOnMatch(request);

    request = givenRequest(1, response.redirectUrl);

    expect(sut.redirectOnMatch(request)).toBeUndefined();
  });

  function givenRequest(id, url){
    return {
      requestId: id,
      url: url
    };
  }

  function givenRule(from, to, isActive){
    return {
      from: from,
      to: to,
      isActive: isActive
    };
  }
});
