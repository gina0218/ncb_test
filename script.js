// 圖片輪播功能
const slides = document.querySelectorAll('.slide');
const controls = document.querySelectorAll('.slider-control');
let currentSlide = 0;
function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    controls.forEach(control => control.classList.remove('active'));
    slides[index].classList.add('active');
    controls[index].classList.add('active');
    currentSlide = index;
}
controls.forEach(control => {
    control.addEventListener('click', () => {
        const index = parseInt(control.getAttribute('data-index'));
        showSlide(index);
    });
});
setInterval(() => {
    const nextSlide = (currentSlide + 1) % slides.length;
    showSlide(nextSlide);
}, 5000);
// 驗證碼系統
const captchaImages = ['au_1.png', 'au_2.png', 'au_3.png', 'au_4.png'];
const captchaCodes = ['83de', '40d5', 'b38d', '773e'];
let currentCaptchaIndex = 0;
const captchaImage = document.getElementById('captchaImage');
const captchaImageWrapper = document.getElementById('captchaImageWrapper');
const captchaInput = document.getElementById('captcha-input');
const lengthError = document.getElementById('length-error');
const captchaError = document.getElementById('captcha-error');
const emptyError = document.getElementById('empty-error');
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
function selectRandomCaptcha() {
    currentCaptchaIndex = Math.floor(Math.random() * captchaImages.length);
    captchaImage.src = captchaImages[currentCaptchaIndex];
}
selectRandomCaptcha();
captchaImageWrapper.addEventListener('click', selectRandomCaptcha);
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    lengthError.style.display = 'none';
    captchaError.style.display = 'none';
    emptyError.style.display = 'none';
    if (!usernameInput.value || !passwordInput.value || !captchaInput.value) {
        emptyError.style.display = 'block';
        return;
    }
    const inputValue = captchaInput.value.trim();
    if (inputValue.length !== 4) {
        lengthError.style.display = 'block';
        return;
    }
    if (inputValue.toLowerCase() !== captchaCodes[currentCaptchaIndex].toLowerCase()) {
        captchaError.style.display = 'block';
        selectRandomCaptcha();
        return;
    }
    alert("此為釣魚網站，你已受騙");
});
usernameInput.addEventListener('input', hideEmptyError);
passwordInput.addEventListener('input', hideEmptyError);
captchaInput.addEventListener('input', hideAllErrors);
function hideEmptyError() {
    if (usernameInput.value && passwordInput.value && captchaInput.value) {
        emptyError.style.display = 'none';
    }
}
function hideAllErrors() {
    lengthError.style.display = 'none';
    captchaError.style.display = 'none';
    hideEmptyError();
}
// 下拉選單功能
const zoomButton = document.getElementById('zoomButton');
const zoomMenu = document.getElementById('zoomMenu');
const langButton = document.getElementById('langButton');
const langMenu = document.getElementById('langMenu');
function toggleMenu(menu, button) {
    const isShowing = menu.classList.contains('show');
    document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
    document.querySelectorAll('.top-button').forEach(b => b.classList.remove('active'));
    if (!isShowing) {
        menu.classList.add('show');
        button.classList.add('active');
    }
}
zoomButton.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu(zoomMenu, zoomButton);
});
langButton.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu(langMenu, langButton);
});
document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
    document.querySelectorAll('.top-button').forEach(b => b.classList.remove('active'));
});
zoomMenu.addEventListener('click', (e) => e.stopPropagation());
langMenu.addEventListener('click', (e) => e.stopPropagation());
zoomMenu.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        const scale = parseFloat(this.getAttribute('data-scale'));
        document.body.style.transform = `scale(${scale})`;
        document.body.style.transformOrigin = 'top center';
        zoomMenu.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        zoomMenu.classList.remove('show');
        zoomButton.classList.remove('active');
    });
});
langMenu.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        const langText = this.textContent;
        const langIcon = this.querySelector('img').src.split('/').pop();
        langButton.innerHTML = `\n                    <img src="${langIcon}" alt="語言">\n                    ${langText} <span class="arrow-down"></span>\n                `;
        langMenu.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        langMenu.classList.remove('show');
        langButton.classList.remove('active');
    });
});
// 底部廣告輪播
const adSlider = document.getElementById('adSlider');
let currentAd = 0;
const adSlides = document.querySelectorAll('.ad-slide');
const totalAds = adSlides.length;
adSlides.forEach(slide => {
    slide.addEventListener('click', function() {
        const pdfFile = this.getAttribute('data-pdf');
        window.open(pdfFile, '_blank');
    });
});
function showAd(index) {
    adSlider.style.transform = `translateY(-${index * 70}px)`;
}
setInterval(() => {
    currentAd = (currentAd + 1) % totalAds;
    showAd(currentAd);
}, 4000);

