global.whoops = function(type) {
	throw new Meteor.Error(type)
}