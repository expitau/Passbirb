# Passbirb

## What is this?

This is a stateless password manager, a utility for managing website passwords without storing them in a database or file. Unlike traditional password alternatives that keep your passwords on your computer (or worse, in the cloud), Passbirb
will regenerate the same unique password anytime you want to login on a new device.

## Who is this for?

You should use Passbirb if:

-   You want your password for every website to be entirely unique, without memorizing a complicated scheme.
-   You're concerned that bad developers like storing your passwords in plaintext.
-   You want _some_ protection against phishing attacks.
-   You want the ability to log in to services on guest computers without installing software.
-   You have trust issues.

You should **NOT** use Passbirb if:

-   **You can't remember your master password**, or will have trouble keeping it secret.
-   You don't trust my code, and you haven't read through it and/or built it yourself (or you can trust me - I promise it's good).
-   You aren't sure if I will keep my website up indefinitely, and you haven't made a local copy.
-   You don't want to change your password on every website you use.

## How does it work?

This password manager uses [Argon2](https://en.wikipedia.org/wiki/Argon2) to derive passwords from a master key. A SHA256 hash of the website salt is used to provide a salt to Argon2 indistinguisable from randomness. The algorithm is as
follows (in pseudocode, see [password.js](function/password.js) for implementation).

```py
# User-provided inputs
Master_Key = "Top_Secret_Master_Password_123"
Salt = "wikipedia:1" # Website top-level domain + counter recommended, but not required.

Salt_Hash = Base64Encode(SHA256(Salt)) # Encoded as Base64 to preserve entropy in Argon2 node bindings

# Additional options:
#   parallelism    -  4 threads
#   tagLength      -  15 bytes
#   memorySizeKb   -  1024kB
#   iterations     -  20 iterations
#   version        -  0x13 (current version)
#   key            -  None
#   associatedData -  None
#   hashType       -  Argon2id version
Hash_Key = Argon2(password=Master_Key, salt=Salt_Hash)
Password = FormatPassword(key=Hash_Key)

# Non-cryptographic formatting of password
def FormatPassword(key):
    # Get base64 encoding of the key
    key = Base64Encode(key) # 15 bytes -> 20 base64 characters

    # Some websites don't allow characters like '/', use Base64URL instead.
    key = Replace_Characters(key, '+', '-')
    key = Replace_Characters(key, '/', '_')

    # Satisfy password requirements in first 4 characters if not already met in last 16 characters
    if NUMBER_CHAR not in key[4..]:
        key[0] = '1'
    if LOWERCASE_CHAR not in key[4..]:
        key[1] = 'a'
    if UPPERCASE_CHAR not in key[4..]:
        key[2] = 'A'
    if SPECIAL_CHAR not in key[4..]:
        key[3] = '-'

    return key
```
