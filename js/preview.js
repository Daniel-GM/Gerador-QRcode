let linkChanged = false
let photoChanged = false
let saveLogo = "../arquivos/qrcodes/menu-white.png"
let savePhoto
let saveId = 1

document.getElementById('form-logo').addEventListener('change', onBodyLoad)
document.getElementById('form-photo').addEventListener('change', onBodyLoad)
document.getElementById('input-init').addEventListener('input', onBodyLoad)
document.getElementById('input-quantidade').addEventListener('input', preview)
document.getElementById('input-link').addEventListener('input', onBodyLoad)
document.getElementById('cor').addEventListener('input', preview)
document.getElementById('cor-site').addEventListener('input', preview)
document.getElementById('largura').addEventListener('change', preview)
document.getElementById('altura').addEventListener('change', preview)
// document.getElementById('cardapio').addEventListener('change', preview)

function onBodyLoad() {
    linkChanged = true
    photoChanged = true
    preview()
}

function preview() {
    const previewDiv = document.getElementById("preview")
    previewDiv.innerHTML = ''

    let formLogo = document.getElementById('form-logo')
    let dominio = document.getElementById('input-link').value
    let cor = document.getElementById('cor').value
    let corSite = document.getElementById('cor-site').value
    let qrcodeNone = document.getElementById('qr-preview-none')
    let quantidadeInit = document.getElementById('input-init').value
    let fileImgLogo = document.getElementById('file-img-logo')

    if (quantidadeInit != '') {
        saveId = quantidadeInit
    }

    //Criação comanda
    let comanda = document.createElement('div')
    comanda.classList.add('comanda')
    comanda.style.height = "509px"
    comanda.style.width = "263px"
    comanda.style.backgroundColor = cor
    previewDiv.appendChild(comanda)

    //Criação logo
    let divLogo = document.createElement('div')
    divLogo.style.height = "100px"
    divLogo.style.width = "249.56px"
    divLogo.style.display = "flex"
    divLogo.style.alignItems = "flex-start"
    divLogo.style.justifyContent = "center"
    comanda.appendChild(divLogo)

    let logo = document.createElement('img')
    if (formLogo.files.length > 0 && photoChanged) {
        logo.src = URL.createObjectURL(formLogo.files[0])
        saveLogo = logo.src
        photoChanged = false
    } else if (formLogo.files.length == 0 && photoChanged) {
        saveLogo = "../arquivos/qrcodes/menu-white.png"
        logo.src = saveLogo
    } else {
        logo.src = saveLogo
    }
    fileImgLogo.style.height = window.config.height;
    fileImgLogo.style.width = window.config.width;

    logo.style.height = window.config.height;
    logo.style.width = window.config.width;
    divLogo.appendChild(logo)

    //Criação QRCode
    if (linkChanged) {
        const link = `https://${dominio}.sigedelivery.com.br/consulta/#/?table=${dominio}${saveId}&domain=${dominio}`
        new QRCode(qrcodeNone, link)
        const photo = qrcodeNone.querySelector('img')
        photo.classList.add('preview-qrcode')
        photo.style.padding = "10px 10px"
        photo.style.background = "#fff"
        photo.style.width = "229.565px"
        comanda.appendChild(photo)
        savePhoto = photo
        linkChanged = false
        logoQrcode(comanda)
    } else {
        savePhoto.classList.add('preview-qrcode')
        savePhoto.style.padding = "10px 10px"
        savePhoto.style.background = "#fff"
        savePhoto.style.width = "229.565px"
        comanda.appendChild(savePhoto)
        logoQrcode(comanda)
    }

    //Criação valor inicial das comandas
    let id = document.createElement("h2")
    id.style.fontSize = "72px"
    id.style.color = "#000"
    id.style.margin = "0px"
    id.style.width = "249.6px"
    id.style.textAlign = "center"
    id.style.background = "#fff"
    id.style.marginTop = "-0.5px"
    id.textContent = saveId
    comanda.appendChild(id)

    //Criação link sigesis
    let site = document.createElement("h2")
    site.innerHTML = 'www.sigesis.com.br'
    site.style.fontFamily = 'poppins, sans-serif'
    site.style.fontWeight = '400'
    site.style.margin = '10px 0px 10px'
    site.style.letterSpacing = '2px'
    site.style.color = corSite
    comanda.appendChild(site)

    //Adicionando a comanda ao preview
    previewDiv.appendChild(comanda)
}

function logoQrcode(comanda) {
    let sigesis = document.createElement('img')
    sigesis.src = "arquivos/icon/logo-qrcode.jpg"
    sigesis.style.position = "absolute"
    sigesis.style.transform = "translate(0%, 450%)"
    comanda.appendChild(sigesis)
}