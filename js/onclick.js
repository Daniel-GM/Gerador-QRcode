function inputName() {
  let cardapioChecked = document.querySelector('#cardapio')
  let option = document.getElementsByName('option')
  let dominio = document.getElementById('div-dominio')
  let logoSigesis = document.getElementById('div-sigesis')
  
  debugger
  if(cardapioChecked.checked) logoSigesis.style.display = 'flex'
  else logoSigesis.style.display = 'none'
  
  if(option[1].checked && cardapioChecked.checked) {
    dominio.style.display = 'flex'
  } else if (option[1].checked && !cardapioChecked.checked) {
    dominio.style.display = 'none'
  }
}