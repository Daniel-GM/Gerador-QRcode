function toggleTheme() {
  const link = document.querySelector('#img-link')
  const qrcode = document.querySelector('#img-qrcode')
  const currentTheme = document.body.getAttribute('theme')
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  const themeIcon = document.getElementById('theme-icon')
  document.body.setAttribute('theme', newTheme)

  if (newTheme === 'dark') {
    document.documentElement.style.setProperty('--cor-primaria', '#212529')
    document.documentElement.style.setProperty('--cor-secundaria', '#fff')
    document.documentElement.style.setProperty('--cor-borda', '#fff')

    themeIcon.src = 'arquivos/icon/light_mode.png'
    themeIcon.alt = 'dark_mode'
    link.src = "arquivos/icon/link_white.svg"
    qrcode.src = "arquivos/icon/qr_code_white.svg"
  } else {
    document.documentElement.style.setProperty('--cor-primaria', '#fff')
    document.documentElement.style.setProperty('--cor-secundaria', '#212529')
    document.documentElement.style.setProperty('--cor-borda', '#000')

    themeIcon.src = 'arquivos/icon/dark_mode.png'
    themeIcon.alt = 'light_mode'
    link.src = "arquivos/icon/link_black.png"
    qrcode.src = "arquivos/icon/qr_code_black.png"
  }
}