function gerarComanda() {
  const formLogo = document.getElementById('form-logo')
  const formPhoto = document.getElementById('form-photo')
  const result = document.getElementById('result')
  const cor = document.getElementById('cor')
  result.textContent = ''
  
  for (let index = 0; index < formPhoto.files.length; index++) {
    const photo = formPhoto.files[index]
    console.log(formLogo.files[0])
    /* criando a logo */
    const logo = document.createElement('img')
    logo.src = URL.createObjectURL(formLogo.files[0])
    logo.style.height = "200px"
    logo.style.width = "280px"

    /* colocando o QRcode */
    const img = document.createElement('img')
    img.src = URL.createObjectURL(photo)
    img.style.height = "357px"
    img.style.width = "280px"

    /* criando comanda */
    const comanda = document.createElement('div')
    comanda.classList.add('comanda')
    comanda.style.height = "1854"
    comanda.style.width = "991"
    comanda.style.backgroundColor = cor.value

    comanda.appendChild(logo)
    comanda.appendChild(img)
    result.appendChild(comanda)
  }
}