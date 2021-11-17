const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
]

let playerInfo = {
    name: 'Player',
    position_x: 0,
    position_y: 9
}

//==============================================
//           Start Screen
//==============================================

function createStartScreen() {
    let container = document.getElementById('container')
    let divForStartScreen = document.createElement('div')
    divForStartScreen.setAttribute('id', 'startScreenContainer')
    divForStartScreen.classList.add('startScreen')

    let titleGame = document.createElement('h1')
    titleGame.classList.add('startTitle')
    titleGame.innerText = 'Labirinto'

    let nameBox = document.createElement('input')
    nameBox.placeholder = 'Seu nome'
    nameBox.classList.add('nameInput')

    let startButton = document.createElement('button')
    startButton.classList.add('startButton')
    startButton.innerText = 'Clique para Começar'
    startButton.addEventListener('click', () => {
        if (nameBox.value !== '') {
            playerInfo.name = nameBox.value
        }
        createMap()
    })

    divForStartScreen.appendChild(titleGame)
    divForStartScreen.appendChild(nameBox)
    divForStartScreen.appendChild(startButton)
    container.appendChild(divForStartScreen)
}

createStartScreen()

//==============================================
//           Mapa
//==============================================

function createMap() {
    let startContainer = document.getElementById('startScreenContainer')
    startContainer.remove()

    for (let i = 0; i < map.length; i++) {
        let container = document.getElementById('container')
        let line = document.createElement('div')

        line.setAttribute('id', `Line${i+1}`)
        line.classList.add('line')
        container.classList.add('appear')
        setTimeout(() => container.classList.remove('appear'), 800)
        container.appendChild(line)

        for (let j = 0; j < map[i].length; j++) {
            let cell = document.createElement('div')
            if (map[i][j] === 'W') {
                cell.setAttribute('id', `Cell${i+1}_${j+1}`)
                cell.classList.add('cell', 'wall')
                line.appendChild(cell)
            }
            if (map[i][j] === ' ') {
                cell.setAttribute('id', `Cell${i+1}_${j+1}`)
                cell.classList.add('cell', 'path')
                line.appendChild(cell)

            }
            if (map[i][j] === 'S') {
                cell.setAttribute('id', `Cell${i+1}_${j+1}`)
                cell.classList.add('cell', 'start')
                line.appendChild(cell)
            }
            if (map[i][j] === 'F') {
                cell.setAttribute('id', `Cell${i+1}_${j+1}`)
                cell.classList.add('cell', 'finish')
                line.appendChild(cell)
            }
        }
    }
    createPlayer()
}

//==============================================
//           Criar Jogador
//==============================================

function createPlayer() {
    let startPosition = document.querySelector('.start')
    let positionData = startPosition.getBoundingClientRect()

    let container = document.getElementById('container')
    let playerBlock = document.createElement('div')
    playerBlock.setAttribute('id', 'Player')
    playerInfo.id = () => document.getElementById('Player')
    playerBlock.classList.add('cell', 'player')
    playerBlock.style.top = `${positionData.y}px`
    playerBlock.style.left = `${positionData.x}px`
    container.appendChild(playerBlock)
}

//==============================================
//           Movimentação
//==============================================

document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if (keyName === 'ArrowDown' || keyName === 's') {
        if (map[playerInfo.position_y + 1][playerInfo.position_x] === ' ') {
            let playerPositionData = playerInfo.id().getBoundingClientRect()
            playerInfo.id().style.top = `${playerPositionData.y + 30}px`
            playerInfo.position_y += 1
        }
    }
    if (keyName === 'ArrowUp' || keyName === 'w') {
        if (map[playerInfo.position_y - 1][playerInfo.position_x] === ' ') {
            let playerPositionData = playerInfo.id().getBoundingClientRect()
            playerInfo.id().style.top = `${playerPositionData.y - 30}px`
            playerInfo.position_y -= 1
        }
    }
    if (keyName === 'ArrowLeft' || keyName === 'a') {
        if (map[playerInfo.position_y][playerInfo.position_x - 1] === ' ') {
            let playerPositionData = playerInfo.id().getBoundingClientRect()
            playerInfo.id().style.left = `${playerPositionData.x - 30}px`
            playerInfo.position_x -= 1
        }
    }
    if (keyName === 'ArrowRight' || keyName === 'd') {
        if (map[playerInfo.position_y][playerInfo.position_x + 1] === ' ' || map[playerInfo.position_y][playerInfo.position_x + 1] === 'F') {
            let playerPositionData = playerInfo.id().getBoundingClientRect()
            playerInfo.id().style.left = `${playerPositionData.x + 30}px`
            playerInfo.position_x += 1
            checkVictory()
        }
    }

})

//==============================================
//           Adaptação a tamanho de tela
//==============================================

window.addEventListener('resize', () => {
    let currentCell = document.getElementById(`Cell${playerInfo.position_y+1}_${playerInfo.position_x+1}`)
    let positionData = currentCell.getBoundingClientRect()

    playerInfo.id().style.top = `${positionData.top}px`
    playerInfo.id().style.left = `${positionData.left}px`
})

//==============================================
//           Condição de Vitória
//==============================================

function checkVictory() {
    let endPoint = document.querySelector('.finish')
    if (`Cell${playerInfo.position_y+1}_${playerInfo.position_x+1}` === endPoint.getAttribute('id')) {
        let container = document.getElementById('container')
        container.classList.add('disappear')
        setTimeout(() => {
            container.innerHTML = ''
            container.classList.remove('disappear')
            let endGame = document.createElement('div')

            let victoryMessage = document.createElement('span')
            if (playerInfo.name !== 'Player') {
                victoryMessage.innerHTML = `<h2>Parabéns!</h2><br />${playerInfo.name}, você passou por uma jornada longa e dura, as vezes sentiu que bateu de cara com uma parede mas chegou ao fim desta etapa. Os obstáculos não terminaram, mas a recompensa vai ser grande. Não estamos mais falando do labirinto agora. Sua vida segue a partir deste ponto e acredito em você. ${playerInfo.name}, você terá amigos e colegas a sua volta e nunca duvide de quão longe pode chegar.`
            } else {
                victoryMessage.innerHTML = `<h2>Parabéns!</h2><br />Cada etapa de nossa jornada deve ser feita um passo de cada vez. A pressa pode atrapalhar o seu crescimento e gerar um dano psicologico maior que você espera. Siga com calma e tenha seus intervalos. Estarei aqui quando você quiser me dizer seu nome.`
            }
            endGame.classList.add('endGameScreen')

            victoryMessage.classList.add('appear', 'victoryMessage')
            container.appendChild(endGame)
            endGame.appendChild(victoryMessage)


        }, 800)


    }
}