// Elemen pada log in
const loginSubmit = $("#buttonLogin");
const loginEmail = $("#loginEmail");
const loginPassword = $("#loginPassword");

// Elemen pada register
const regisSubmit = $("#buttonRegister");
const regisName = $("#regisName");
const regisEmail = $("#regisEmail");
const regisPassword = $("#regisPassword");
const regisPasswordConfirm = $("#regisPasswordConfirm");

loginSubmit.click((event)=> { // log in click
	validateInputLogin(event);
});

regisSubmit.click((event) => { // register click
    validateInputRegister(event);
})

function validateInputLogin(event) { // validasi log in

	const loginEmailValue = loginEmail.val().trim();
	const loginPasswordValue = loginPassword.val().trim();

	if (!isEmail(loginEmailValue)) {
		setMessageFor("loginEmail", "Invalid E-mail Address");
		event.preventDefault();
	} else {
		setMessageFor("loginEmail", "");
	}

	if(loginPasswordValue.length < 8 || loginPasswordValue.length > 12 || !(isPassword(loginPasswordValue))){
		setMessageFor("loginPassword", "Invalid Password");
		event.preventDefault();
	} else {
		setMessageFor("loginPassword", "");
	}
	
}

function validateInputRegister(event) { // validasi register

        const regisNameValue = regisName.val().trim();
        const regisEmailValue = regisEmail.val().trim();
        const regisPasswordValue = regisPassword.val().trim();
        const regisPasswordConfirmValue = regisPasswordConfirm.val().trim();

    if(!isName(regisNameValue)){
		setMessageFor("regisName", "Invalid Name");
		event.preventDefault();
	} else {
		setMessageFor("regisName", "");
	}

	if (!isEmail(regisEmailValue)) {
		setMessageFor("regisEmail", "Invalid E-mail Address");
		event.preventDefault();
	} else {
		setMessageFor("regisEmail", "");
	}

	if(regisPasswordValue.length < 8 || regisPasswordValue.length > 12 || !(isPassword(regisPasswordValue))){
		setMessageFor("regisPassword", "Invalid Password");
		event.preventDefault();
	} else {
		setMessageFor("regisPassword", "");
	}

    if(regisPasswordConfirmValue.length < 8 || regisPasswordConfirmValue.length > 12 ||
		regisPasswordConfirmValue != regisPasswordValue || !(isPassword(regisPasswordConfirmValue))){
		setMessageFor("regisPasswordConfirm", "Invalid Password Confirmation");
		event.preventDefault();
	} else {
		setMessageFor("regisPasswordConfirm", "");
	}
	
}

function setMessageFor(input, message) { // memperbarui status masing-masing input

	var id = "#" + input + "Invalid";
	$(id).html(message);

};

function isPassword(password){
	return /^(?=.*[\d])(?=.*[A-Z])/.test(password);
}

function isName(name){ // regular expression nama
    return /^[A-Za-z\s]+$/.test(name);
}

function isEmail(email) { // regular expression e-mail
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};