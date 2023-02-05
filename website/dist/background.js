importScripts('argon2-bundled.min.js')
importScripts('password.js')
window = globalThis;

queued = null
ready = true
onmessage = (e) => {
    queued = e.data
    update()
}

setInterval(update, 2000)

function update() {
    if (ready && queued) {
        ready = false
        generatePassword(queued[0], queued[1]).then(postMessage).finally(() => {
            ready = true
        })
        queued = null
    }
}
