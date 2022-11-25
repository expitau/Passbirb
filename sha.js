/**
 * Generates a SHA256 hash as an array of bytes
 * @param {String} message The message to hash
 * @returns {Array} An array of integers from 0-255
 */
async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);                    
    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray
}

/**
 * Generates a double hashed SHA256 hash as an array of bytes
 * @param {String} message The message to hash
 * @returns {Array} An array of integers from 0-255
 */
async function sha256x2(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);                    
    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', await crypto.subtle.digest('SHA-256', msgBuffer));
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray
}

/**
 * Returns a hex digest (hex representation) of a byte array
 * @param {Array} buffer An array of integers from 0-255
 * @returns A hexadecimal digest
 */
function hexdigest(buffer) {
    const hashHex = buffer.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

/**
 * Returns a base64 digest (base64 representation) of a byte array
 * @param {Array} buffer An array of integers from 0-255
 * @returns A base64 digest
 */
function b64digest(buffer) {
    return window.btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))
}
