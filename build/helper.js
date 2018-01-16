var Handlebars = require('handlebars');

Handlebars.registerHelper('isEnvironment', function(env, options) {
	if(process.env.NODE_ENV === env) {
    	return options.fn(this);
  	} else {
    	return options.inverse(this);
  	}
});