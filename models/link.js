"use strict";

class Link {
	constructor(url, title){
		this._url = url;
		this._title = title;
	}

	get url() {
		return this._url;
	}

	get title() {
		return this._title;
	}
}

module.exports = Link;
