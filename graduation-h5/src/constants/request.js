const dev = 'http://localhost:3001'
const prod = 'https://www.linyuchen.xyz'
const devWs = 'ws://localhost:3000'
const prodWs = 'wss://www.linyuchen.xyz'

const current = 'dev'
let targetUrl = ''
let targetWs = ''

switch (current) {
    case 'dev': {
        targetUrl = dev
        targetWs = devWs
    } break
    case 'prod': {
        targetUrl = prod 
        targetWs = prodWs
    } break
}
export { targetUrl, targetWs } 
