// Zadanie 1
const firstAttempts = document.querySelectorAll('.first-attempt');
firstAttempts.forEach(el => el.classList.add('active'));

// Zadanie 2
const borderElements = document.querySelectorAll('[data-border]');
for (let el of borderElements) {
    el.dataset.elActive = '';
}

// Zadanie 3
const hackElements = document.querySelectorAll('.hack');
hackElements.forEach(el => el.title = 'hacking');

// Zadanie 4
const hijackElements = document.querySelectorAll('.hijack');
hijackElements.forEach(el => el.removeAttribute('title'));

// Zadanie 5
const st1St2Elements = document.querySelectorAll('.st1.st2');
st1St2Elements.forEach(el => {
    el.style.color = 'red';
    el.style.fontSize = '15px';
});

// Zadanie 6
const attribElements = document.querySelectorAll('.attrib');
attribElements.forEach(el => {
    el.setAttribute('data-hack-active', '');
    el.removeAttribute('data-hack-inactive');
});

// Zadanie 7
const lastAttemptElements = document.querySelectorAll('.last-attempt');
lastAttemptElements.forEach(el => {
    const span = el.querySelector('span');
    if (span) {
        span.style.display = 'none';
    }
});