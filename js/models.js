//main contact class

var Contact = function Contact(raw){
	this.id = _.uniqueId();
	if(raw != undefined){
		this.first_name = raw.first_name;
		this.last_name = raw.last_name;
		this.email = raw.email;
		this.country = raw.country;
	}
};