var Backbone = require('backbone');
var BaseModel = require('./base_model');

module.exports = (function () {
	var SvgModel = BaseModel.extend({
		urlRoot: "stubapi/iconsvg.json",
		parse: function(response) {	
				// console.log(response);
				// response.iconSvgList.listIcon['icon1'] = 'abc';
				
			return response.iconSvgList;
		},
		setType: function(type) {
			this.set("type", type);
		},
		getType: function() {
			return this.get("type");
		},
		getIconSvg: function(icon_name) {
			return this.get(icon_name);
		},
		getSvgApp: function() {
			return this.get("appcol");
		},
		getSvgApp3Col: function() {
			return this.get("app3col");
		},
		getSvgApp4Col: function() {
			return this.get("app4col");
		},
		getSvgApp5Col: function() {
			return this.get("app5col");
		},
		getSvgApp6Col: function() {
			return this.get("app6col");
		},
		getSvgApp8Col: function() {
			return this.get("app8col");
		},
		getSvgApp9Col: function() {
			return this.get("app9col");
		},
		getSvgApp10Col: function() {
			return this.get("app10col");
		},
		getFooter5Icon: function() {
			return this.get("footer5icon");
		},
		getFooter4Icon: function() {
			return this.get("footer4icon");
		},
		getFooter3Icon: function() {
			return this.get("footer3icon");
		},
		getBoxTitle: function() {
			return this.get("boxTitle");
		},
		getBg3Row: function() {
			return this.get("bg3row");
		},
		getBg1Row: function() {
			return this.get("bg1row");
		},
		getBoxTitleChangeLayout1: function() {
			return this.get("boxTitleChangeLayout1");
		},
		getBoxTitleChangeLayout2: function() {
			return this.get("boxTitleChangeLayout2");
		},
		getBoxPointChangeLayout1: function() {
			return this.get("boxPointChangeLayout1");
		},
		getBoxPointChangeLayout2: function() {
			return this.get("boxPointChangeLayout2");
		}
	});

	return SvgModel;

})();
