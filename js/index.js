let option = document.getElementsByName('option')
option.forEach(function(radio) {
  radio.addEventListener('click', function() {
    if (option[0].checked) {
      document.getElementById('div-qrcode').style.display = 'none'
      document.getElementById('div-link').style.display = 'flex'
      document.getElementById('result').innerHTML = ''
      document.getElementById("result-qrcode").textContent = ''
      document.getElementById('download-form').style.display = 'none'
      document.getElementsByClassName('div-cardapio')[0].style.display = 'flex'
    } else {
      document.getElementById('div-link').style.display = 'none'
      document.getElementById('div-qrcode').style.display = 'flex'
      document.getElementById('result').innerHTML = ''
      document.getElementById("result-qrcode").textContent = ''
      document.getElementById('download-form').style.display = 'none'
      document.getElementsByClassName('div-cardapio')[0].style.display = 'none'
    }
  })
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function gerarComanda() {
  let loading = document.getElementById('loading')
  let formLogo = document.getElementById('form-logo')
  let formPhoto = document.getElementById('form-photo').files
  let quantidadeInit = document.getElementById('input-init').value
  let quantidadeQrcode = document.getElementById('input-quantidade').value
  let dominio = document.getElementById('input-link').value
  let result = document.getElementById('result')
  let cor = document.getElementById('cor')
  let corSite = document.getElementById('cor-site')
  let download = document.getElementById('download-form')
  let resultQrcode = document.getElementById("result-qrcode")
  let botao = document.querySelector('.btn-form')
  let cardapioChecked = document.querySelector('#cardapio')
  botao.disabled = true
  download.style.display = 'none'
  resultQrcode.textContent = ''
  result.textContent = ''
  let maxPorcentagem = quantidadeQrcode - quantidadeInit

  if(option[0].checked){
    for (let index = (quantidadeInit-1); index <= quantidadeQrcode; index++) {
      let link
      if (index != quantidadeQrcode){
        link = `https://${dominio}.sigedelivery.com.br/consulta/#/?table=${dominio}${index+1}&domain=${dominio}`
      } else if (index == quantidadeQrcode) {
        link = `https://${dominio}.sigedelivery.com.br/cardapio-digital/`
      }
      new QRCode(resultQrcode, link)
    }
  } else {
    let link
    link = `https://${dominio}.sigedelivery.com.br/cardapio-digital/`
    new QRCode(resultQrcode, link)
    quantidadeQrcode = formPhoto.length
    maxPorcentagem = quantidadeQrcode
    quantidadeInit = 1
  }
  loading.style.display = 'none'

  await sleep(1000)

  if(!(cardapioChecked.checked)) {
    quantidadeQrcode--
    maxPorcentagem--
  }

  for (let index = (quantidadeInit-1), seletor = 0; index <= quantidadeQrcode; index++, seletor++) {
    let photo
    
    if(option[0].checked){
      loadingBar(index, quantidadeQrcode, seletor, maxPorcentagem)
      photo = document.querySelectorAll('#result-qrcode img')[seletor].src
    } else if (index != quantidadeQrcode) {
      loadingBar(index, quantidadeQrcode, seletor, maxPorcentagem-1)
      photo = formPhoto[seletor]
    }

    /* criando a logo */
    let logo = document.createElement('img')
    logo.src = URL.createObjectURL(formLogo.files[0])
    logo.style.height = "200px"
    logo.style.width = "280px"

    /* colocando o QRcode */
    let img = document.createElement('img')
    let id = document.createElement("h2")
    let sigesis = document.createElement('img')

    if(option[0].checked){
      img.src = photo
      img.style.padding = "10px 10px"
      img.style.background = "#fff"

      id.style.fontSize = "72px"
      id.style.color = "#000"
      id.style.margin = "0px"
      id.style.width = "276px"
      id.style.textAlign = "center"
      id.style.background = "#fff"
      id.textContent = index+1

      sigesis.src = "arquivos/icon/logo-qrcode.jpg"
      sigesis.style.position = "absolute"
      sigesis.style.transform = "translate(0%, 700%)"
    } else if (index != quantidadeQrcode) {
      img.src = URL.createObjectURL(photo)
      img.style.height = "357px"
      img.style.width = "280px"
    }

    /* criando comanda */
    let comanda = document.createElement('div')
    comanda.classList.add('comanda')
    comanda.style.height = "1854"
    comanda.style.width = "991"
    comanda.style.backgroundColor = cor.value

    /* site na comanda */
    let site = document.createElement("h2")
    site.innerHTML = 'www.sigesis.com.br'
    site.style.fontFamily = 'poppins, sans-serif'
    site.style.fontWeight = '400'
    site.style.margin = '20px 0px 10px'
    site.style.letterSpacing = '2px'
    site.style.color = corSite.value

    /* criando cardapio */
    if (index == quantidadeQrcode && cardapioChecked.checked) {
      let getSrc
      if(option[0].checked) {
        getSrc = document.querySelectorAll('#result-qrcode img')[seletor]
        sigesis.style.transform = "translate(0%, 850%)"
      } else {
        getSrc = document.querySelectorAll('#result-qrcode img')[0]
        comanda.style.width = '280px'
        sigesis.src = 'arquivos/icon/logo-qrcode.jpg'
        id.style.margin = '0px'
        sigesis.style.position = "absolute"
        sigesis.style.transform = "translate(0%, 850%)"
      }
      console.log(getSrc.src)
      
      id.textContent = 'Acesse o nosso Cardápio Digital'
      id.style.color = corSite.value
      id.style.backgroundColor = cor.value
      id.style.fontSize = '32px'
      id.style.fontWeight = '400'
      id.style.marginBottom = '10px'
      id.style.lineHeight = '1'
      id.style.textAlign = 'center'
      
      img.src = getSrc.src      

      site.innerHTML = 'Desenvolvido por'
      site.style.marginBottom = '0px'

      let logoSigesis = document.createElement('img')
      logoSigesis.src = URL.createObjectURL(document.querySelector("#form-logo-sigesis").files[0])
      logoSigesis.style.width = '260px'
      logoSigesis.style.height = '69px'

      comanda.appendChild(logo)
      comanda.appendChild(id)
      comanda.appendChild(img)
      comanda.appendChild(sigesis)
      comanda.appendChild(site)
      comanda.appendChild(logoSigesis)
      result.appendChild(comanda)
    } else {
      comanda.appendChild(logo)
      comanda.appendChild(img)
      comanda.appendChild(id)
      comanda.appendChild(sigesis)
      comanda.appendChild(site)
      result.appendChild(comanda)
    }

    let canvas = await html2canvas(comanda, { 
      logging: false, 
      willReadFrequently: true
    });
    comanda.style.display = 'none'
    result.appendChild(canvas)
  }
  botao.disabled = false
  loading.style.display = 'none'
  resultQrcode.style.display = 'none'
  download.style.display = 'block'
}

function loadingBar(index, indexMax, init, max) {
  let porcentagem = ((init+1)/(max+2))*100
  let textLoading = document.getElementById('text-loading')
  textLoading.innerText = `${index+1}/${++indexMax}`
  loading.style.display = 'block'
  loading.style.background = `linear-gradient(to right, #63c384 0%, #63c384 ${(porcentagem).toFixed(2)}%, #161616 ${(porcentagem).toFixed(2)}%)`
}

document.getElementById('download-form').addEventListener("click", function() {
  var zip = new JSZip()
  var imagens = document.querySelectorAll("#result canvas")
  let quantidadeInit = document.getElementById('input-init').value
  let valorMax = document.getElementById('input-quantidade').value
  let valorMin = quantidadeInit
  for (var i = 0; i < imagens.length; i++) {
      var image = imagens[i]
      var imgData = image.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, "")
      if((i+1) != imagens.length){
        if(option[0].checked){
          zip.file(`comanda-${quantidadeInit}.png`, imgData, {base64: true})
          quantidadeInit++
        }
        else zip.file(`comanda-${i+1}.png`, imgData, {base64: true})  
      } else zip.file(`Cardápio.png`, imgData, {base64: true})
  }
  zip.generateAsync({type:"blob"})
  .then(function(content) {
      saveAs(content, `comandas ${valorMin}-${valorMax}.zip`)
  })
})

document.querySelector("#form-logo").addEventListener("change", function() {
  let texto = document.querySelector("#file-count-logo")
  if(this.files.length > 0) {
    texto.textContent = "Com logo"
    texto.style.color = "green"
  }
  else if(this.files.length == 0) {
    texto.textContent = "Sem logo"
    texto.style.color = "red"
  }
})

document.querySelector("#form-logo-sigesis").addEventListener("change", function() {
  let texto = document.querySelector("#file-count-logo-sigesis")
  if(this.files.length > 0) {
    texto.textContent = "Com logo"
    texto.style.color = "green"
  }
  else if(this.files.length == 0) {
    texto.textContent = "Sem logo"
    texto.style.color = "red"
  }
})

document.querySelector("#form-photo").addEventListener("change", function() {
  var fileCount = this.files.length;
  document.querySelector("#file-count-qrcode").textContent = fileCount;
  if(fileCount == 0)
    document.querySelector(".text-qrcode").style.color = 'red'
  else if(fileCount > 0)
  document.querySelector(".text-qrcode").style.color = 'green'
});

/* Estilização da Label cor */

const corComanda = document.querySelector("#cor")
const corSite = document.querySelector("#cor-site")
initiColor()

function initiColor() {
  const initColorComanda = document.querySelector("#pseudo-color-input")
  const initColorText = document.querySelector("#pseudo-color-input-text")

  initColorComanda.style.backgroundColor = initColorComanda.control.value
  initColorText.style.backgroundColor = initColorText.control.value
}

corComanda.addEventListener('change', function() {
  const nextElement = this.nextElementSibling
  if (nextElement && nextElement.id === 'pseudo-color-input') {
    nextElement.style.backgroundColor = this.value
  }
})

corSite.addEventListener('change', function() {
  const nextElement = this.nextElementSibling
  if (nextElement && nextElement.id === 'pseudo-color-input-text') {
    nextElement.style.backgroundColor = this.value
  }
})