const FORM_SELECTOR = '.contact-form__form, .callback-form';

function syncSubmitState(form) {
  const agree = form.querySelector('input[name="privacy_agree"]');
  const submit = form.querySelector('button[type="submit"]');

  if (!agree || !submit) return;

  const enabled = agree.checked;
  submit.disabled = !enabled;
  submit.setAttribute('aria-disabled', enabled ? 'false' : 'true');
}

export function initFormPrivacy() {
  document.querySelectorAll(FORM_SELECTOR).forEach((form) => {
    const agree = form.querySelector('input[name="privacy_agree"]');
    if (!agree) return;

    agree.addEventListener('change', () => syncSubmitState(form));
    form.addEventListener('reset', () => {
      setTimeout(() => syncSubmitState(form), 0);
    });
    syncSubmitState(form);
  });
}
