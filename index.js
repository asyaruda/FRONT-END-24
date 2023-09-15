const ws = new WebSocket('ws://localhost:4000/chat')
const form = document.querySelector('#chatForm')
const container = document.querySelector('.chatContainer')

console.log(ws)

form.addEventListener('submit', onFormSubmit)

function onFormSubmit(event) {
  event.preventDefault()

  const username = document.querySelector('#username').value
  const message = document.querySelector('#message').value

  if (username.trim() !== '' && message.trim() !== '') {
    const chatMessage = `${username}: ${message}`
    ws.send(JSON.stringify({ username, message }))

    document.querySelector('#message').value = '';
  }
}

ws.onclose = function (event) {
  console.log('onclose', event)
}

ws.onerror = function (event) {
  console.log('onerror', event)
}

ws.onmessage = function (event) {
  console.log('onmessage', event)
  const data = JSON.parse(event.data)

  container.insertAdjacentHTML('beforeend', `<p>${data.username}: ${data.message}</p>`)
}

ws.onopen = function (event) {
  console.log('onopen', event)

  ws.send('New user connected')
}