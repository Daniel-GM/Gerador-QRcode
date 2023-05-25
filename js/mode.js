function lightMode() {
  let darkMode = document.getElementById('dark-mode')
  let lightMode = document.getElementById('light-mode')
  let link = document.querySelector('#img-link')
  let qrcode = document.querySelector('#img-qrcode')

  link.src = "arquivos/icon/link_black.png"
  qrcode.src = "arquivos/icon/qr_code_black.png"

  document.documentElement.style.setProperty('--cor-primaria', '#aaa')
  document.documentElement.style.setProperty('--cor-secundaria', '#1b1b1b')
  document.documentElement.style.setProperty('--placeholder', '#aaa')

  lightMode.style.display = 'none'
  darkMode.style.display = 'block' 
}

function darkMode() {
  let darkMode = document.getElementById('dark-mode')
  let lightMode = document.getElementById('light-mode')
  let link = document.querySelector('#img-link')
  let qrcode = document.querySelector('#img-qrcode')

  link.src = "arquivos/icon/link_white.svg"
  qrcode.src = "arquivos/icon/qr_code_white.svg"

  document.documentElement.style.setProperty('--cor-primaria', '#1b1b1b')
  document.documentElement.style.setProperty('--cor-secundaria', '#fff')
  document.documentElement.style.setProperty('--placeholder', '#1b1b1b')

  lightMode.style.display = 'block'
  darkMode.style.display = 'none'
}

var inputTextFields = document.getElementsByClassName('input-text');
for (var i = 0; i < inputTextFields.length; i++) {
  inputTextFields[i].addEventListener('focus', function() {
    this.style.color = document.documentElement.style.getProperty('--cor-secundaria');
  });

  inputTextFields[i].addEventListener('blur', function() {
    this.style.color = 'var(--cor-primaria)';
  });
}