// mocks/index.js
async function initMocks() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server')
    server.listen()
  } else {
    const { worker } = require('./browser')
    await worker.start()
  }
}

initMocks()
