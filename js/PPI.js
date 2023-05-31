function getPPI() {
  const screenWidth = window.screen.width
  const windowWidth = window.innerWidth
  const ppi = screenWidth / (windowWidth / 96)

  return ppi
}

const ppi = getPPI()
console.log(`PPI da tela: ${ppi}`)