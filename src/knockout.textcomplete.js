(function (factory) {
    // Module systems magic dance.

    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        // CommonJS or Node: hard-coded dependency on "knockout"
        factory(require("knockout"), require("jquery"));
    } else if (typeof define === "function" && define["amd"]) {
        // AMD anonymous module with hard-coded dependency on "knockout"
        define(["knockout"], ["jquery"], factory);
    } else {
        // <script> tag: use the global `ko` object, attaching a `mapping` property
        factory(ko, $);
    }
}
(function (ko, jquery) {
    ko.textComplete = {
        createStrategy: function(match, search, replace, index, template, cache, context, idProperty) {
            var strategy = {
                match: match,
                search: search,
                replace: replace
            };

            if(index) { strategy.index = index; }
            if(template) { strategy.template = template; }
            if(cache) { strategy.cache = cache; }
            if(context) { strategy.context = context; }
            if(idProperty) { strategy.idProperty = idProperty; }

            return strategy;
        },
        getDefaultReplace: function(token) { return function(value) { return "$1" + token + value + " "; } },
        getDefaultMatch: function(token) { return new RegExp("(^|\\s)" + token + "(\\w*)$"); },
        getDefaultTemplate: function() { return function(value) { return value; }}
    };

	ko.bindingHandlers.textComplete = {
		init: function(element, valueAccessor, allBindingsAccessor) {
			var allBindings = allBindingsAccessor();
			var textCompleteBinding = allBindings.textComplete;

            var strategies = ko.unwrap(textCompleteBinding.strategies);
            var options = ko.unwrap(textCompleteBinding.options);

            jquery(element).textcomplete(strategies, options);
		}
	};

    ko.bindingHandlers.tokenComplete = {
        init: function(element, valueAccessor, allBindingsAccessor) {
            var allBindings = allBindingsAccessor();
            var tokenCompleteBinding = allBindings.tokenComplete;
            var token = ko.unwrap(tokenCompleteBinding.token);
            var search = ko.unwrap(tokenCompleteBinding.search);
            var replace = ko.unwrap(tokenCompleteBinding.replace) || ko.textComplete.getDefaultReplace(token);
            var template = ko.unwrap(tokenCompleteBinding.template) || ko.textComplete.getDefaultTemplate();
            var options = ko.unwrap(tokenCompleteBinding.options);

            var matchRegex = ko.textComplete.getDefaultMatch(token);
            var strategy = ko.textComplete.createStrategy(matchRegex, search, replace, 2, template);

            jquery(element).textcomplete([strategy], options);
        }
    }
}));