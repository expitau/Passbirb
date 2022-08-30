javascript:(async () => {
    let MASTER_PASSWORD = '';
    async function generatePassword(base, length=16) {return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(base)))).map(b => '0x' + b.toString(16).padStart(2,'0')))).substring(0,length-4).replaceAll('/','_').replaceAll('+','-') + '1aA='};
    if (!MASTER_PASSWORD) MASTER_PASSWORD = prompt("Enter the master password:");
    let salt = prompt("Enter a salt:", location.hostname.split('.').slice(-2,-1)[0]);
    if (!salt || !MASTER_PASSWORD) return;
    let pwd = await generatePassword(`${MASTER_PASSWORD}.${salt}`);
    navigator.clipboard.writeText(pwd);
    alert(pwd);
})()
