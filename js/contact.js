$('#btn-contact-submit').click(function(e) {
  var contactData = {
    username: $('.contact-form').find('input[name="username"]').val(),
    email: $('.contact-form').find('input[name="email"]').val(),
    type: $('.contact-form').find('select[name="type"]').val(),
    message: $('.contact-form').find('textarea[name="message"]').val()
  }
  $('input, textarea, select').removeClass('has-error');
  if (contactData.username === "") {
    $('input[name="username"]').addClass('has-error');
  } else if (contactData.email === "") {
    $('input[name="email"]').addClass('has-error');
  } else if (contactData.type === "") {
    $('select[name="type"]').addClass('has-error');
  } else if (contactData.message === "") {
    $('textarea[name="message"]').addClass('has-error');
  } else {
    console.log(contactData);
  }
});