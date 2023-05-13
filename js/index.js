let option = document.getElementsByName('option')
option.forEach(function(radio) {
  radio.addEventListener('click', function() {
    if (option[0].checked) {
      document.getElementById('div-qrcode').style.display = 'none'
      document.getElementById('div-link').style.display = 'flex'
      document.getElementById('result').innerHTML = ''
      document.getElementById("result-qrcode").textContent = ''
      document.getElementById('download-form').style.display = 'none'
    } else {
      document.getElementById('div-link').style.display = 'none'
      document.getElementById('div-qrcode').style.display = 'flex'
      document.getElementById('result').innerHTML = ''
      document.getElementById("result-qrcode").textContent = ''
      document.getElementById('download-form').style.display = 'none'
    }
  })
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
  let download = document.getElementById('download-form')
  let resultQrcode = document.getElementById("result-qrcode")
  let botao = document.querySelector('.btn-form')
  botao.disabled = true
  download.style.display = 'none'
  resultQrcode.textContent = ''
  result.textContent = ''
  let qrcodes = []
  let maxPorcentagem = quantidadeQrcode - quantidadeInit
  let indexMax
  
  if(option[0].checked){
    for (let index = (quantidadeInit-1); index < quantidadeQrcode; index++) {
      let link = `https://${dominio}.sigedelivery.com.br/consulta/#/?table=${dominio}${index+1}&domain=${dominio}`
      let qrcode = new QRCode(resultQrcode, link)
      qrcodes.push(qrcode)
    }
  } else indexMax = formPhoto.length
  loading.style.display = 'none'

  await sleep(1000)

  for (let index = (quantidadeInit-1), seletor = 0; index < quantidadeQrcode; index++, seletor++) {
    let inicio = performance.now()
    loadingBar(index, quantidadeQrcode, seletor, maxPorcentagem)

    let photo
    if(option[0].checked){
      photo = document.querySelectorAll('#result-qrcode img')[seletor].src

    } else {
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
      id.style.width = "276px";
      id.style.textAlign = "center";
      id.style.background = "#fff";
      id.textContent = index+1

      sigesis.src = "arquivos/icon/logo-qrcode.jpg"
      sigesis.style.position = "absolute"
      sigesis.style.transform = "translate(0%, 700%)"
    } else {
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

    comanda.appendChild(logo)
    comanda.appendChild(img)
    comanda.appendChild(id)
    comanda.appendChild(sigesis)
    result.appendChild(comanda)

    let canvas = await html2canvas(comanda, { 
      logging: false, 
      willReadFrequently: true
    });
    comanda.style.display = 'none'
    
    comanda.remove()
    result.appendChild(canvas)
  }
  botao.disabled = false
  loading.style.display = 'none'
  resultQrcode.style.display = 'none'
  download.style.display = 'block'
}

function loadingBar(index, indexMax, init, max) {
  let porcentagem = ((init+1)/(max+1))*100
  let textLoading = document.getElementById('text-loading')
  textLoading.innerText = `${index+1}/${indexMax}`
  loading.style.display = 'block'
  loading.style.background = `linear-gradient(to right, #63c384 0%, #63c384 ${(porcentagem).toFixed(2)}%, #161616 ${(porcentagem).toFixed(2)}%)`
}

document.getElementById('download-form').addEventListener("click", function() {
  var zip = new JSZip()
  var imagens = document.querySelectorAll("#result canvas")
  for (var i = 0; i < imagens.length; i++) {
      var image = imagens[i]
      var imgData = image.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, "")
      zip.file(`comanda-${i+1}.png`, imgData, {base64: true})
  }
  zip.generateAsync({type:"blob"})
  .then(function(content) {
      saveAs(content, "comandas.zip")
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

document.querySelector("#form-photo").addEventListener("change", function() {
  var fileCount = this.files.length;
  document.querySelector("#file-count-qrcode").textContent = fileCount;
  if(fileCount == 0)
    document.querySelector(".text-qrcode").style.color = 'red'
  else if(fileCount > 0)
  document.querySelector(".text-qrcode").style.color = 'green'
});
