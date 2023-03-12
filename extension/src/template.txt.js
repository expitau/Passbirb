(async () => {
    let MASTER_PASSWORD = 'thisisalongandsecuremasterpassword';
    if (!MASTER_PASSWORD)
        MASTER_PASSWORD = prompt('Enter the master password:');
    let salt = prompt(
        'Enter a salt:',
        location.hostname.split('.').slice(-2, -1)[0] + ':1'
    );

    // The following is automatically generated at buildtime
    /**{{BUNDLE}}**/

    if (!salt || !MASTER_PASSWORD) return;
    let pwd = await generatePassword(MASTER_PASSWORD, salt);
    navigator.clipboard.writeText(pwd);
    alert(pwd);
})();
