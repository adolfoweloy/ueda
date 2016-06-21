"use strict";

class Link {
	constructor(id, url, title){
		this._id = id;
		this._url = url;
		this._title = title;
	}

	get id() {
		return this._id;
	}

	get url() {
		return this._url;
	}

	get title() {
		return this._title;
	}
}

module.exports = Link;
