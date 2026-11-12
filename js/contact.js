/* ============================================================
   contact.js
   ------------------------------------------------------------
   Validates the contact form in the browser and shows friendly,
   per-field error messages. Only loaded on contact.html.

   Sending: GitHub Pages is static (no server), so the form needs a
   small form service to actually deliver messages. Put its URL in
   the form's data-endpoint attribute (see README "Contact form").
   Until then the form validates and explains that it is not
   connected to an inbox yet.
   ============================================================ */

// #region Setup
const contactForm = document.querySelector('#contactForm');
const formStatus = document.querySelector('#formStatus');
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// #endregion

// #region Validation
/**
 * Shows (or clears) the error text under one field and marks the
 * field visually. Returns true when the field is valid.
 */
function setFieldError(fieldId, message) {
  const input = document.querySelector('#' + fieldId);
  const errorLine = document.querySelector('#' + fieldId + 'Error');
  const wrapper = input.closest('.field');

  errorLine.textContent = message;
  wrapper.classList.toggle('hasError', message !== '');
  input.setAttribute('aria-invalid', message !== '' ? 'true' : 'false');
  return message === '';
} // setFieldError()

/**
 * Checks every field and returns true only if all are valid.
 * Every field is checked (no early exit) so all problems show at once.
 */
function validateForm() {
  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const message = document.querySelector('#message').value.trim();

  const nameOk = setFieldError('name', name.length < 2 ? 'Please enter your name.' : '');
  const emailOk = setFieldError('email', !EMAIL_PATTERN.test(email) ? 'Please enter a valid email address.' : '');
  const messageOk = setFieldError('message', message.length < 10 ? 'Your message should be at least 10 characters.' : '');

  return nameOk && emailOk && messageOk;
} // validateForm()
// #endregion

// #region Submit
/**
 * Writes a status line under the form (role="status" is announced
 * by screen readers).
 */
function showStatus(text, kind) {
  formStatus.textContent = text;
  formStatus.className = kind;
} // showStatus()

/**
 * Handles the submit event: validate, then send to the configured
 * form service (or explain that none is configured yet).
 */
async function handleSubmit(event) {
  event.preventDefault();
  showStatus('', '');

  if (!validateForm()) {
    showStatus('Please fix the highlighted fields.', 'fail');
    return;
  }

  const endpoint = contactForm.dataset.endpoint;
  if (!endpoint) {
    showStatus('Thanks! Your message looks good, but this form is not connected to an inbox yet.', 'ok');
    return;
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
      throw new Error('Request failed: ' + response.status);
    }
    contactForm.reset();
    showStatus('Thank you! Your message was sent.', 'ok');
  } catch (error) {
    showStatus('Sorry, something went wrong sending your message. Please try again later.', 'fail');
  }
} // handleSubmit()

if (contactForm) {
  contactForm.addEventListener('submit', handleSubmit);
}
// #endregion
