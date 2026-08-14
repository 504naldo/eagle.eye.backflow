/*
 * Shared behaviour for every page.
 *
 * Loaded with `defer`, so the DOM is parsed before this runs. No libraries and
 * no build step — each block guards for its own elements, because the booking
 * form appears on some pages and not others.
 */

(function () {
    'use strict';

    /* ---------------------------------------------------------------------- */
    /* Conversion tracking                                                     */
    /* ---------------------------------------------------------------------- */

    /*
     * There is no analytics property installed on this site yet, and none is
     * added here — adding one is a decision with privacy implications that the
     * owner should make deliberately.
     *
     * What exists is the plumbing. Any element carrying `data-track` reports an
     * event through whichever of gtag / dataLayer is present, and stays silent
     * when neither is. To start collecting: add your Google Analytics (or other)
     * snippet to _partials/head.html and these events begin flowing with no
     * further change here.
     *
     * Events already wired up across the site:
     *   phone-click   — every tel: link (header, footer, hero, mobile bar, form)
     *   email-click   — every mailto: link
     *   cta-click     — booking and quote buttons, tagged with their location
     *   form-submit   — booking form submitted and accepted
     *   file-upload   — a file was attached to a booking request
     */
    function track(action, detail) {
        var payload = Object.assign({ event: action }, detail || {});

        if (typeof window.gtag === 'function') {
            window.gtag('event', action, payload);
        }
        if (Array.isArray(window.dataLayer)) {
            window.dataLayer.push(payload);
        }
    }

    document.addEventListener('click', function (event) {
        var el = event.target.closest('[data-track]');
        if (!el) return;
        track(el.getAttribute('data-track'), {
            location: el.getAttribute('data-track-location') || 'unknown',
            label: (el.textContent || '').trim().slice(0, 80)
        });
    });

    /* ---------------------------------------------------------------------- */
    /* Navigation                                                              */
    /* ---------------------------------------------------------------------- */

    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-nav');

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            var open = nav.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(open));
        });

        // Escape closes the menu and returns focus to the button.
        document.addEventListener('keydown', function (event) {
            if (event.key !== 'Escape' || !nav.classList.contains('is-open')) return;
            nav.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.focus();
        });
    }

    /* The build stamps a fallback year; this keeps it current between builds. */
    var year = document.getElementById('year');
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    /* ---------------------------------------------------------------------- */
    /* Booking form                                                            */
    /* ---------------------------------------------------------------------- */

    var form = document.querySelector('.booking-form');
    if (!form) return;

    var status = form.querySelector('.booking-form__status');
    var submitBtn = form.querySelector('button[type="submit"]');

    var MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
    var ALLOWED_UPLOAD = ['image/jpeg', 'image/png', 'application/pdf'];

    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
    var PHONE_RE = /^[+()\-.\s\d]{7,25}$/;

    /*
     * A link such as contact.html?service=multi arrives from the property
     * manager CTAs. Pre-selecting the matching option saves the visitor a step
     * and keeps the lead correctly categorised.
     */
    (function prefillFromQuery() {
        var params = new URLSearchParams(window.location.search);
        var wanted = params.get('service');
        if (!wanted) return;

        var select = form.querySelector('#bf-service');
        if (!select) return;

        var match = wanted === 'multi' ? /multi-property/i : new RegExp(wanted, 'i');
        Array.prototype.forEach.call(select.options, function (option) {
            if (option.value && match.test(option.value)) select.value = option.value;
        });
    })();

    function fieldOf(input) {
        return input.closest('.field');
    }

    function setError(input, message) {
        var field = fieldOf(input);
        var error = field && field.querySelector('.field__error');

        if (message) {
            input.setAttribute('aria-invalid', 'true');
            if (field) field.classList.add('field--invalid');
            if (error) {
                error.textContent = message;
                error.hidden = false;
                input.setAttribute('aria-describedby', error.id);
            }
        } else {
            input.removeAttribute('aria-invalid');
            if (field) field.classList.remove('field--invalid');
            if (error) {
                error.textContent = '';
                error.hidden = true;
                input.removeAttribute('aria-describedby');
            }
        }
    }

    function setStatus(message, kind) {
        if (!status) return;
        status.innerHTML = '';
        if (!message) return;

        var p = document.createElement('p');
        p.className = kind ? 'status--' + kind : '';
        p.textContent = message;
        status.appendChild(p);
    }

    /** Returns the list of invalid inputs, marking each as it goes. */
    function validate() {
        var invalid = [];

        function check(selector, test, message) {
            var input = form.querySelector(selector);
            if (!input) return;
            var problem = test(input.value.trim(), input);
            setError(input, problem ? message : '');
            if (problem) invalid.push(input);
        }

        check('#bf-name', function (v) { return !v; }, 'Enter your name.');
        check('#bf-phone', function (v) {
            return !v || !PHONE_RE.test(v);
        }, 'Enter a phone number we can reach you on.');
        check('#bf-email', function (v) {
            return !v || !EMAIL_RE.test(v);
        }, 'Enter a valid email address.');
        check('#bf-address', function (v) {
            return !v;
        }, 'Enter the address of the property to be tested.');
        check('#bf-municipality', function (v) {
            return !v;
        }, 'Choose the municipality.');

        var upload = form.querySelector('#bf-upload');
        if (upload && upload.files && upload.files.length) {
            var file = upload.files[0];
            var badType = ALLOWED_UPLOAD.indexOf(file.type) === -1;
            var badSize = file.size > MAX_UPLOAD_BYTES;

            if (badType) {
                setError(upload, 'Attach a JPG, PNG, or PDF.');
                invalid.push(upload);
            } else if (badSize) {
                setError(upload, 'That file is over 10 MB. Attach a smaller one, or email it to us instead.');
                invalid.push(upload);
            } else {
                setError(upload, '');
            }
        }

        return invalid;
    }

    // Clear a field's error as soon as the visitor starts correcting it.
    form.addEventListener('input', function (event) {
        if (event.target.getAttribute('aria-invalid') === 'true') {
            setError(event.target, '');
        }
    });

    /** FormData minus empty file inputs, which some endpoints reject. */
    function payload() {
        var data = new FormData();
        var hasFile = false;

        Array.prototype.forEach.call(form.elements, function (el) {
            if (!el.name || el.disabled) return;

            if (el.type === 'file') {
                if (el.files && el.files.length) {
                    data.append(el.name, el.files[0]);
                    hasFile = true;
                }
                return;
            }
            if ((el.type === 'checkbox' || el.type === 'radio') && !el.checked) return;

            data.append(el.name, el.value);
        });

        return { data: data, hasFile: hasFile };
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var invalid = validate();
        if (invalid.length) {
            setStatus('Please check the highlighted fields and try again.', 'error');
            invalid[0].focus();
            invalid[0].scrollIntoView({ block: 'center', behavior: 'smooth' });
            return;
        }

        var built = payload();

        if (submitBtn) submitBtn.disabled = true;
        setStatus('Sending your request…', 'busy');

        fetch(form.action, {
            method: form.method,
            body: built.data,
            headers: { Accept: 'application/json' }
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Form endpoint responded with ' + response.status);
                }
                track('form-submit', { location: 'booking-form' });
                if (built.hasFile) track('file-upload', { location: 'booking-form' });
                window.location.href = form.dataset.success || 'thank-you.html';
            })
            .catch(function () {
                /*
                 * Without this the visitor was left looking at an unchanged form
                 * with no idea the request had failed. Give them the phone
                 * number rather than asking them to try again blindly.
                 */
                if (submitBtn) submitBtn.disabled = false;
                setStatus(
                    'Your request could not be sent just now. Please call or text ' +
                    '604-283-3804, or email eagle.eye.backflow@gmail.com and we will pick it up.',
                    'error'
                );
                if (status) status.focus();
            });
    });
})();
