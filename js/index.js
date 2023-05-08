async function gerarComanda() {
  const formLogo = document.getElementById('form-logo')
  const formPhoto = document.getElementById('form-photo')
  const result = document.getElementById('result')
  const cor = document.getElementById('cor')
  result.textContent = ''
  
  
  for (let index = 0; index < formPhoto.files.length; index++) {
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
  const download = document.getElementById('download-form')
  download.style.display = 'inline'
}

document.getElementById('download-form').addEventListener("click", function() {
  var zip = new JSZip();
  var imagens = document.querySelectorAll("canvas")
  for (var i = 0; i < imagens.length; i++) {
      var image = imagens[i]
      var imgData = image.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, "");
      zip.file(`comanda-${i+1}.png`, imgData, {base64: true});
  }
  zip.generateAsync({type:"blob"})
  .then(function(content) {
      saveAs(content, "comandas.zip");
  });
})