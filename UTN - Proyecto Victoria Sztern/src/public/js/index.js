const FormContact = document.querySelector("#FormContact");

const PostToServer = async (url, data) => {
	if (!url) throw new Error("Url to POST is empty");
	if (!data) throw new Error("There is no data to POST");

	const response = await fetch(url, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(data)
	});
	return response.json();
}

const SendMessage = async ({
	name,
	email,
	message
}) => {
	if (!name) throw new Error("At sending the message, the Name is empty");
	if (!email) throw new Error("At sending the message, the Email is empty");
	if (!message) throw new Error("At sending the message, the Message is empty");

	return await PostToServer("/contact", {
		name,
		email,
		message
	});
}

FormContact.addEventListener("submit", e => {
	e.preventDefault();
	SendMessage({
		name: e.target.name.value,
		email: e.target.mail.value,
		message: e.target.msg.value
	});
})

$(document).ready(function () {

	$('ul.tabs li a:first').addClass('active');
	$('.secciones article').hide();
	$('.secciones article:first').show();

	$('ul.tabs li a').click(function () {
		$('ul.tabs li a').removeClass('active');
		$(this).addClass('active');
		$('.secciones article').hide();



		var activeTab = $(this).attr('href');
		$(activeTab).show();
		return false;
	});
});

