/*
 * Shared behaviour for every page.
 *
 * Loaded with `defer`, so the DOM is parsed before this runs. Each block guards
 * for its own elements — the contact form exists only on the home page.
 */

(function () {
    'use strict';

    /* Mobile navigation toggle. */
    var toggle = document.querySelector('.menu-toggle');
    var navList = document.getElementById('nav-list');

    if (toggle && navList) {
        toggle.addEventListener('click', function () {
            var isOpen = navList.classList.toggle('nav-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    /* The build stamps a fallback year; this keeps it current between builds. */
    var year = document.getElementById('year');
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    /*
     * Contact form. Submitting over fetch keeps the visitor on the page until
     * we redirect. The plain form POST (with Formspree's `_next` field) remains
     * the fallback when JavaScript is unavailable.
     */
    var form = document.querySelector('.contact-form form');
    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var button = form.querySelector('button[type="submit"]');
        if (button) button.disabled = true;

        fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: { Accept: 'application/json' }
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Formspree responded with ' + response.status);
                }
                window.location.href = 'thank-you.html';
            })
            .catch(function () {
                // Without this the visitor was left staring at an unchanged form.
                if (button) button.disabled = false;
                window.alert(
                    'Sorry — your request could not be sent. Please call or text ' +
                    '604-283-3804, or email eagle.eye.backflow@gmail.com.'
                );
            });
    });
})();
