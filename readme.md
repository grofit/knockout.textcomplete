# Knockout.TextComplete

A binding for knockout 2.3+ to allow you to do contextual auto/text completion via the great library [jquery-textcomplete](https://github.com/yuku-t/jquery-textcomplete/).

## Installing

Add knockout-2.3.js (or newer versions) to your project, then jquery and finally knockout.textcomplete.js to your project..

## Example

A simple example of using a token to drive text completion, this will specify a token and then a search method:
```
<textarea id="some-text-area" data-bind="tokenComplete: { token: '@', search: getMentions }"></textarea>
<script>
	var getMentions = function(term, callback) {
		// Do some ajax call, or query local data and pass results to the callback
	}
</script>
```

A more complicated example with two custom strategies:
```
<textarea id="some-text-area" data-bind="textComplete: { strategies: [ someMentionStrategy, someTagStrategy ], options: { debounce: 400 } }" />
```

The above examples make it look a bit easier than it actually would be in real world situations as often you will have
complex data and will need to do complex ajax searches and put custom templates out there with styling. However these 2 bindings
at least go part of the way to streamline things as much as possible.

There are 2 bindings available, one is geared for premade strategies and one is for easier view setup

### textComplete binding

The available options for this binding are:

* **strategies** - An array taking 1-N strategies which define how the text complete behaves, you can read more below.
* **options** - The options to use for the text completion, based upon the options object in the jquery-textcomplete documentation.

### tokenComplete binding

The available options for this binding are:

* **token** - The token to use for text completion (i.e '@' or '#'), it can be anything you want really.
* **search** - The search method to use for querying the given term against a data set, this needs to accept a term and callback which should consume the results of elements matching the term.
* **replace** - An optional method to be used for replacing content in the textarea, this is used within the underlying framework so it passes the value into the method and expects a resulting string containing the $1 result of its regex and the value selected from the options returned from the search
* **template** - An optional method to return a template for display within the results from the search, this will be added to the DOM and is passed the value from the search step.
* **options** - The options to use for the text completion, based upon the options object in the jquery-textcomplete documentation.

### Helper methods

As strategies are key to using this system there are some helpers to assist with making them as well as providing defaults for replacing and templating etc.

These are all available under the `ko.textComplete` namespace.

* **createStrategy** - `function(match, search, replace, index, template, cache, context, idProperty)`

This should be used to create a strategy for use within the `textComplete` binding, you can make your own based upon the jquery-textcomplete documentation if you want.
The only mandatory fields above are the `match`, `search`, `replace`. More information on what each one of these does can be found in the jqueyr-textcomplete documentation.

* **getDefaultReplace** - `function(token)`

If you provide this method a token (see token variable in tokenComplete binding) it will provide you a default replace method to be used within the `tokenComplete` binding, you can override this if you wish.

* **getDefaultMatch** - `function(token)`

If you provide this method with a token it will provide you with a default regex matcher for that token, much like above it can be overridden if you wish.

* **getDefaultTemplate** - `function()`

This provides a default template resolver, which will just spit out whatever result has been retrieved from the search.

### More Examples with Source Code

Here is an example of what it does and how to use it.
[View Example](https://rawgithub.com/grofit/knockout.textcomplete/master/example.html)