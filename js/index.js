async function gerarComanda() {
  const loading = document.getElementById('loading')
  const formLogo = document.getElementById('form-logo')
  const formPhoto = document.getElementById('form-photo')
  const result = document.getElementById('result')
  const cor = document.getElementById('cor')
  const download = document.getElementById('download-form')
  download.style.display = 'none'
  result.textContent = ''
  
  for (let index = 0; index < formPhoto.files.length; index++) {
    let porcentagem = ((index+1)/formPhoto.files.length)*100
    const textLoading = document.getElementById('text-loading')
    textLoading.innerText = `${index+1}/${formPhoto.files.length}`
    loading.style.display = 'block'
    loading.style.background = `linear-gradient(to right, #63c384 0%, #63c384 ${porcentagem.toFixed(2)}%, #161616 ${porcentagem.toFixed(2)}%)`

    const photo = formPhoto.files[index]
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

    const canvas = await html2canvas(comanda)
    comanda.style.display = 'none'
    result.appendChild(canvas)
  }
  loading.style.display = 'none'
  download.style.display = 'inline'
}

document.getElementById('download-form').addEventListener("click", function() {
  var zip = new JSZip()
  var imagens = document.querySelectorAll("canvas")
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