const contactForm = document.querySelector('.contact__form');
const submitButton = document.querySelector('.contact__form__submit-container__button');
const contactFormLastname = document.querySelector('.contact__form #lastname');
const contactFormFirstname = document.querySelector('.contact__form #firstname');
const contactFormEmail = document.querySelector('.contact__form #email');
const contactFormRecipient = document.querySelector('.contact__form #recipient');
const contactFormMessage = document.querySelector('.contact__form #message');
const CONTACT_FORM_FIELDS = ['lastname', 'firstname', 'email', 'recipient', 'message'];

const handleSubmitForm = () => {
  const contactFormData = getContactFormData();
  const hasFormError = verifyContactFormData(contactFormData);

  if (hasFormError === false) {
    axios.post('http://localhost/subskill/mail.php', JSON.stringify({
      contactFormData: contactFormData,
    }))
    .then(function (response) {
      if (response.data == 'success') {
        console.log('%cEmail envoyé! 💌', 'font-size:14px;font-weight:regular;color:#222;background:#b5dec2;padding:5px 15px;border-radius:9999px;');
      }
      else if (response.data == 'empty-fields') {
        console.log('%cVeuillez remplir tous les champs 🚫', 'font-size:14px;font-weight:regular;color:#fff;background:#eb3d4e;padding:5px 15px;border-radius:9999px;');
      }
      else {
        console.log(response.data);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  else if (hasFormError === true) {
    console.log('%cVeuillez remplir tous les champs 🚫', 'font-size:14px;font-weight:regular;color:#fff;background:#eb3d4e;padding:5px 15px;border-radius:9999px;');
  }
}

const getContactFormData = () => {
  const contactFormData = {
    'lastname': contactFormLastname.value,
    'firstname': contactFormFirstname.value,
    'email': contactFormEmail.value,
    'recipient': contactFormRecipient.value,
    'message': contactFormMessage.value
  }

  return contactFormData;
}

const verifyContactFormData = (form) => {
  let hasFormError = false;

  for (const [field, value] of Object.entries(form)) {
    if (value == '') {
      hasFormError = true;
    }
  }

  return hasFormError;
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
})

submitButton.addEventListener('click', () => {
  handleSubmitForm();
});
