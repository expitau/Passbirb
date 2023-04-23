// import { argon2 } from 'argon2-browser/lib/argon2.js'

// console.log(argon2)
import generatePassword from './password.js'

let window = globalThis

let queued = null;
let ready = true;
onmessage = (e) => {
    queued = e.data;
    update();
};

setInterval(update, 2000);

function update() {
    if (ready && queued) {
        ready = false;
        generatePassword(queued[0], queued[1])
            .then(postMessage)
            .finally(() => {
                ready = true;
            });
        queued = null;
    }
}
