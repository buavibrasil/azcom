/* ═══════════════════════════════════════════════════════════
   AZcom — Form Validation & Submit
   ═══════════════════════════════════════════════════════════ */

import emailjs from '@emailjs/browser';

// Credenciais do EmailJS informadas pelo usuário
const EMAILJS_PUBLIC_KEY = 'XHtxNEZkoibuQkHu8';
const EMAILJS_SERVICE_ID = 'service_m3ptuzb';
const EMAILJS_TEMPLATE_ID = 'template_7jq29gj'; 

export function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', handleSubmit);

  // Real-time validation on blur
  form.querySelectorAll('.form-input').forEach((input) => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.closest('.form-group--error')) {
        validateField(input);
      }
    });
  });
}

function validateField(input) {
  const group = input.closest('.form-group');
  const error = group?.querySelector('.form-error');
  let valid = true;
  let message = '';

  if (input.required && !input.value.trim()) {
    valid = false;
    message = 'Este campo é obrigatório';
  } else if (input.type === 'email' && input.value.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.value)) {
      valid = false;
      message = 'Insira um e-mail válido';
    }
  }

  if (!valid) {
    group?.classList.add('form-group--error');
    input.classList.add('form-input--error');
    if (error) {
      error.textContent = message;
      error.style.display = 'block';
    }
  } else {
    group?.classList.remove('form-group--error');
    input.classList.remove('form-input--error');
    if (error) {
      error.style.display = 'none';
    }
  }

  return valid;
}

async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const inputs = form.querySelectorAll('.form-input[required]');
  let allValid = true;

  inputs.forEach((input) => {
    if (!validateField(input)) {
      allValid = false;
    }
  });

  if (!allValid) return;

  const submitBtn = form.querySelector('[type="submit"]');
  const originalText = submitBtn.textContent;

  // Loading state
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';
  submitBtn.style.opacity = '0.7';

  try {
    // Send email using EmailJS
    await emailjs.sendForm(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      form,
      EMAILJS_PUBLIC_KEY
    );

    // Success state
    submitBtn.textContent = '✓ Mensagem enviada!';
    submitBtn.style.background = '#22c55e';
    submitBtn.style.borderColor = '#22c55e';
    submitBtn.style.opacity = '1';

    // Reset form
    form.reset();

  } catch (error) {
    console.error('FAILED...', error);
    submitBtn.textContent = '❌ Erro ao enviar';
    submitBtn.style.background = '#ef4444';
    submitBtn.style.borderColor = '#ef4444';
    submitBtn.style.opacity = '1';
    
    alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
  } finally {
    // Restore button after 4s
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.background = '';
      submitBtn.style.borderColor = '';
      submitBtn.disabled = false;
    }, 4000);
  }
}
