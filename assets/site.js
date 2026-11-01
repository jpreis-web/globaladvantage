/* GAP website v1 — no external dependencies, trackers or cookies */
(() => {
  const toggle = document.querySelector('[data-mobile-toggle]');
  const mobile = document.querySelector('[data-mobile-nav]');
  function closeNav() { if (!mobile) return; mobile.classList.remove('open'); toggle?.setAttribute('aria-expanded', 'false'); }
  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      mobile.classList.toggle('open', !expanded);
    });
    mobile.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeNav(); });
    window.matchMedia('(min-width: 951px)').addEventListener('change', evt => { if (evt.matches) closeNav(); });
  }
  // A static GitHub Pages site cannot receive form submissions. Prepare an email in the visitor's mail client.
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const subject = `[GAP Website] ${String(data.get('topic') || 'Consulting enquiry')}`;
      const body = [
        `Name: ${String(data.get('name') || '')}`,
        `Company: ${String(data.get('company') || '')}`,
        `Email: ${String(data.get('email') || '')}`,
        `Service: ${String(data.get('topic') || '')}`,
        '',
        String(data.get('message') || '')
      ].join('\n');
      window.location.href = `mailto:info@globaladvantageptp.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const status = document.querySelector('#form-status');
      if (status) status.textContent = 'Your email application should open with the prepared message. Please send it from there. If it does not open, use the email address shown on this page.';
    });
  }
  // Introduction teaser: prepared to receive the upcoming two-minute video.
  const intro = document.getElementById('gap-intro-dialog');
  const openIntro = document.querySelector('[data-intro-open]');
  const closeIntro = document.querySelector('[data-intro-close]');
  if (intro && openIntro && typeof intro.showModal === 'function') {
    openIntro.addEventListener('click', () => intro.showModal());
    closeIntro?.addEventListener('click', () => intro.close());
    intro.addEventListener('click', event => { if (event.target === intro) intro.close(); });
  }
  // Close any open desktop dropdown when clicking outside it.
  document.addEventListener('click', e => {
    document.querySelectorAll('.desktop-nav details[open]').forEach(d => { if (!d.contains(e.target)) d.removeAttribute('open'); });
  });
})();
