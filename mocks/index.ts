// mocks/index.js
async function initMocks() {
  if (typeof window === 'undefined') {
    const { server } = require('./server')
    await server.listen()
  } else {
    const { worker } = require('./browser')
    await worker.start()
  }
}

initMocks()
