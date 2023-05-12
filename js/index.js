const option = document.getElementsByName('option')
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
  const loading = document.getElementById('loading')
  const formLogo = document.getElementById('form-logo')
  const formPhoto = document.getElementById('form-photo').files
  const quantidadeQrcode = document.getElementById('input-quantidade').value
  const dominio = document.getElementById('input-link').value
  const result = document.getElementById('result')
  const cor = document.getElementById('cor')
  const download = document.getElementById('download-form')
  const resultQrcode = document.getElementById("result-qrcode")
  download.style.display = 'none'
  resultQrcode.textContent = ''
  result.textContent = ''
  const qrcodes = []
  let indexMax

  if(option[0].checked){
    for (let index = 0, x=1; index < quantidadeQrcode; index++) {
      loadingBar(index, quantidadeQrcode)
      const link = `https://${dominio}.sigedelivery.com.br/consulta/#/?table=${dominio}${index+1}&domain=${dominio}`
      const qrcode = new QRCode(resultQrcode, link)
      qrcodes.push(qrcode)
    }
    indexMax = document.querySelectorAll('#result-qrcode img').length
  } else indexMax = formPhoto.length
  loading.style.display = 'none'

  await sleep(1000)

  for (let index = 0; index < indexMax; index++) {
    loadingBar(index, indexMax)

    let photo
    if(option[0].checked){
      photo = document.querySelectorAll('#result-qrcode img')[index].src

    } else {
      photo = formPhoto[index]
    }

    /* criando a logo */
    const logo = document.createElement('img')
    logo.src = URL.createObjectURL(formLogo.files[0])
    logo.style.height = "200px"
    logo.style.width = "280px"
    /* colocando o QRcode */
    const img = document.createElement('img')
    const id = document.createElement("h2")
    const sigesis = document.createElement('img')

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
    const comanda = document.createElement('div')
    comanda.classList.add('comanda')
    comanda.style.height = "1854"
    comanda.style.width = "991"
    comanda.style.backgroundColor = cor.value

    comanda.appendChild(logo)
    comanda.appendChild(img)
    comanda.appendChild(id)
    comanda.appendChild(sigesis)
    result.appendChild(comanda)

    const canvas = await html2canvas(comanda)
    comanda.style.display = 'none'
    result.appendChild(canvas)
  }
  
  loading.style.display = 'none'
  resultQrcode.style.display = 'none'
  download.style.display = 'inline'
}

function loadingBar(index, indexMax) {
  let porcentagem = ((index+1)/indexMax)*100
  const textLoading = document.getElementById('text-loading')
  textLoading.innerText = `${index+1}/${indexMax}`
  loading.style.display = 'block'
  loading.style.background = `linear-gradient(to right, #63c384 0%, #63c384 ${porcentagem.toFixed(2)}%, #161616 ${porcentagem.toFixed(2)}%)`
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
  const texto = document.querySelector("#file-count-logo")
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