import { app } from './app'
import { zodEnv } from './env'

app
  .listen({
    host: '0.0.0.0',
    port: zodEnv.PORT,
  })
  .then(() => {
    console.log('🚀 HTTP Server Running!')
  })
