/**
 * Generates a password
 * @param {String} master The master key
 * @param {String} data The domain, version, username, and other associated data to generate the password for
 * @returns {String} A hardened password for the site
 */
async function generatePassword(master, data) {
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

    // The encoded Argon2 string, as Base64 with metadata
    let encoded = (await argon2.hash({
        pass: master, // The master password to hash
        salt: b64digest(await sha256x2(data)), // Base64 encoding of sha256(sha256(data))
        time: 20, // Apply 20 iterations
        mem: 1024, // Use 1024kB memory
        hashLen: 15, // Output 15 bytes of hash (15 * 8 / 6 = 20 Base64 characters)
        parallelism: 4, // Use 4 threads
        type: argon2.ArgonType.Argon2id // Harden against both side-channel and GPU cracking
    })).encoded

    // The base64 hash of the master password without metadata
    let hash = encoded.split("$").pop()

    // Replace '+' with '-' and '/' with '_' to be more password-friendly
    let password = hash.replaceAll(/\+/gi, '-').replaceAll(/\//gi, '_')

    // Set string[index] = char
    function replaceAt(index, string, char) {
        return string.substring(0, index) + char + string.substring(index + 1)
    }

    // Add numbers, special characters and uppercase/lowercase if password does not already have it
    if (!password.match(/.{4}[0-9]/g)) password = replaceAt(0, password, '1')
    if (!password.match(/.{4}[a-z]/g)) password = replaceAt(1, password, 'a')
    if (!password.match(/.{4}[A-Z]/g)) password = replaceAt(2, password, 'A')
    if (!password.match(/.{4}[\-\_]/g)) password = replaceAt(3, password, '-')

    return password
}
