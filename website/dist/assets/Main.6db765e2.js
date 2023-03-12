import {
    c as n,
    a as t,
    t as h,
    n as c,
    w as p,
    v as y,
    b as k,
    d as _,
    F as f,
    r as b,
    e as m,
    f as l,
    g as x,
    o as a,
} from './runtime-dom.esm-bundler.7bb00c9c.js';
/* empty css                       */ const g = '0.4.1';
let d;
window.Worker && (d = new Worker('background.js'));
function M(s) {
    localStorage.setItem('state', JSON.stringify({ ...s, version: g }));
}
function C() {
    let s = JSON.parse(localStorage.getItem('state'));
    return s?.version == g ? s : (localStorage.clear(), null);
}
function S(s) {
    let e = document.getElementById('messageToast');
    (e.innerHTML = s),
        e.classList.remove('fade-in-out'),
        window.requestAnimationFrame(() => {
            e.classList.add('fade-in-out');
        });
}
const H = {
        data() {
            return {
                masterPassword: '',
                passwordVisible: !1,
                saltHistoryVisible: !1,
                saltHistory: [],
                salt: '',
                hashedPassword: '',
                darkMode: window.matchMedia('(prefers-color-scheme: dark)')
                    .matches,
                ...C(),
            };
        },
        methods: {
            generate() {
                if (this.masterPassword.length == 0 || this.salt.length == 0) {
                    this.hashedPassword = '';
                    return;
                }
                d
                    ? ((d.onmessage ??= (s) => {
                          this.hashedPassword = s.data;
                      }),
                      d.postMessage([this.masterPassword, this.salt]))
                    : window
                          .generatePassword(this.masterPassword, this.salt)
                          .then((s) => (this.hashedPassword = s));
            },
            saveSalt() {
                this.saltHistory.unshift(this.salt),
                    (this.saltHistory = this.saltHistory.filter(
                        (s, e) => this.saltHistory.indexOf(s) == e && s != ''
                    )),
                    this.saveAppState();
            },
            copyText(s) {
                navigator.clipboard.writeText(s), S('Copied to clipboard!');
            },
            getAppState() {
                return { saltHistory: this.saltHistory };
            },
            onDropdownUnfocused(s) {
                this.saveSalt(),
                    !(
                        s?.relatedTarget &&
                        Array.from(
                            document.getElementsByClassName('dropdown')
                        ).some((e) => e.contains(s.relatedTarget))
                    ) && (this.saltHistoryVisible = !1);
            },
            saveAppState(s = void 0) {
                return M(s || this.getAppState());
            },
        },
        computed: {
            passwordEntropy() {
                return window.zxcvbn(this.masterPassword).guesses_log10;
            },
            historySearchResults() {
                return this.saltHistory
                    .map((s, e) => ({ value: s, idx: e }))
                    .filter((s) =>
                        s.value.toLowerCase().includes(this.salt.toLowerCase())
                    )
                    .sort((s, e) =>
                        s.value.toLowerCase().indexOf(this.salt.toLowerCase()) >
                        e.value.toLowerCase().indexOf(this.salt.toLowerCase())
                            ? 1
                            : s.value
                                  .toLowerCase()
                                  .indexOf(this.salt.toLowerCase()) <
                              e.value
                                  .toLowerCase()
                                  .indexOf(this.salt.toLowerCase())
                            ? -1
                            : 0
                    );
            },
        },
    },
    P = (s, e) => {
        const u = s.__vccOpts || s;
        for (const [w, o] of e) u[w] = o;
        return u;
    },
    V = t('div', { id: 'messageToast' }, null, -1),
    L = {
        key: 0,
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        'stroke-width': '1.5',
        stroke: 'currentColor',
    },
    E = t(
        'path',
        {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            d: 'M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z',
        },
        null,
        -1
    ),
    T = [E],
    A = {
        key: 1,
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        'stroke-width': '1.5',
        stroke: 'currentColor',
        class: 'w-6 h-6',
    },
    B = t(
        'path',
        {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            d: 'M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z',
        },
        null,
        -1
    ),
    j = [B],
    I = { class: 'card' },
    N = t('h1', null, 'PassBirb Generator', -1),
    Y = {
        style: {
            display: 'flex',
            'flex-direction': 'row',
            'justify-content': 'space-between',
        },
    },
    O = t('h3', null, 'Master Password', -1),
    D = { class: 'indicator' },
    z = ['type'],
    R = {
        key: 0,
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        'stroke-width': '1.5',
        stroke: 'currentColor',
    },
    U = t(
        'path',
        {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            d: 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z',
        },
        null,
        -1
    ),
    F = t(
        'path',
        {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z',
        },
        null,
        -1
    ),
    W = [U, F],
    q = {
        key: 1,
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        'stroke-width': '1.5',
        stroke: 'currentColor',
    },
    G = t(
        'path',
        {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            d: 'M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88',
        },
        null,
        -1
    ),
    K = [G],
    J = t('h3', null, 'Key', -1),
    Q = { class: 'dropdown' },
    X = { class: 'textbox' },
    Z = {
        key: 0,
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        'stroke-width': '1.5',
        stroke: 'currentColor',
    },
    $ = t(
        'path',
        {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            d: 'M15.75 19.5L8.25 12l7.5-7.5',
        },
        null,
        -1
    ),
    ee = [$],
    se = {
        key: 1,
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        'stroke-width': '1.5',
        stroke: 'currentColor',
    },
    te = t(
        'path',
        {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            d: 'M19.5 8.25l-7.5 7.5-7.5-7.5',
        },
        null,
        -1
    ),
    oe = [te],
    re = { key: 0, class: 'dropdown-content' },
    ie = { class: 'dropdown-list' },
    ne = ['onClick'],
    ae = ['onClick'],
    le = t(
        'svg',
        {
            xmlns: 'http://www.w3.org/2000/svg',
            fill: 'none',
            viewBox: '0 0 24 24',
            'stroke-width': '1.5',
            stroke: 'currentColor',
        },
        [
            t('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                d: 'M6 18L18 6M6 6l12 12',
            }),
        ],
        -1
    ),
    de = [le],
    ue = { key: 1, style: { padding: '0.5rem' } },
    he = { key: 2, style: { padding: '0.5rem' } },
    we = { key: 0, class: 'result' },
    ce = t(
        'svg',
        {
            xmlns: 'http://www.w3.org/2000/svg',
            fill: 'none',
            viewBox: '0 0 24 24',
            'stroke-width': '1.5',
            stroke: 'currentColor',
            class: 'w-6 h-6',
        },
        [
            l(`
                            `),
            t('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                d: 'M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75',
            }),
            l(`
                        `),
        ],
        -1
    ),
    pe = x(
        '<div class="card"><h1>About</h1><h2>What is this?</h2><p>This is a stateless password manager, a utility for managing website passwords without storing them in a database or file. Unlike traditional password alternatives that keep your passwords on your computer (or worse, in the cloud), Passbirb will regenerate the same unique password anytime you want to login on a new device.</p><h2>Who is this for?</h2><p>You should use Passbirb if: <ul><li>You want your password for every website to be entirely unique, without memorizing a complicated </li> scheme. <li>You&#39;re concerned that bad developers like storing your passwords in plaintext.</li><li>You want *some* protection against phishing attacks.</li><li>You want the ability to log in to services on guest computers without installing software.</li><li>You have trust issues.</li></ul></p><p> You should <strong>NOT</strong> use Passbirb if: <ul><li><strong>You can&#39;t remember your master password</strong>, or will have trouble keeping it secret.</li><li>You don&#39;t trust my code, and you haven&#39;t read through it and/or built it yourself (or you can trust me, I promise it&#39;s good).</li><li>You aren&#39;t sure if I will keep my website up indefinitely, and you haven&#39;t made a local copy. </li><li>You don&#39;t want to change your password on every website you use.</li></ul></p><h2>How does it work?</h2><p>The source code is available on GitHub, for more information consult the <a href="https://github.com/expitau-dev/PasswordGenerator/blob/main/README.md">README</a></p><h2>I have trust issues</h2><p>This website loads several libraries and extra code to make it function smoothly. If this bothers you, or you want a usage example for scripting purposes, see <a href="minimal.html">the minimal version</a></p></div>',
        1
    );
function me(s, e, u, w, o, r) {
    return (
        a(),
        n(
            'div',
            {
                class: c({ darkMode: o.darkMode, lightMode: !o.darkMode }),
                id: 'main',
            },
            [
                V,
                t(
                    'button',
                    {
                        id: 'themeToggle',
                        onClick:
                            e[0] || (e[0] = (i) => (o.darkMode = !o.darkMode)),
                    },
                    [o.darkMode ? (a(), n('svg', A, j)) : (a(), n('svg', L, T))]
                ),
                t('div', I, [
                    N,
                    t('div', Y, [
                        O,
                        t(
                            'h3',
                            D,
                            h(Math.floor(r.passwordEntropy * 10) / 10) + '/24',
                            1
                        ),
                    ]),
                    t(
                        'div',
                        {
                            class: c([
                                'textbox',
                                {
                                    PasswordStrength0: r.passwordEntropy == 0,
                                    PasswordStrength1:
                                        r.passwordEntropy > 0 &&
                                        r.passwordEntropy < 12,
                                    PasswordStrength2:
                                        r.passwordEntropy >= 12 &&
                                        r.passwordEntropy < 18,
                                    PasswordStrength3:
                                        r.passwordEntropy >= 18 &&
                                        r.passwordEntropy < 24,
                                    PasswordStrength4: r.passwordEntropy >= 24,
                                },
                            ]),
                        },
                        [
                            p(
                                t(
                                    'input',
                                    {
                                        type: o.passwordVisible
                                            ? 'text'
                                            : 'password',
                                        onInput:
                                            e[1] ||
                                            (e[1] = (...i) =>
                                                r.generate && r.generate(...i)),
                                        'onUpdate:modelValue':
                                            e[2] ||
                                            (e[2] = (i) =>
                                                (o.masterPassword = i)),
                                        placeholder:
                                            'Enter the master password',
                                    },
                                    null,
                                    40,
                                    z
                                ),
                                [[y, o.masterPassword]]
                            ),
                            t(
                                'button',
                                {
                                    onClick:
                                        e[3] ||
                                        (e[3] = (i) =>
                                            (o.passwordVisible =
                                                !o.passwordVisible)),
                                },
                                [
                                    o.passwordVisible
                                        ? (a(), n('svg', q, K))
                                        : (a(), n('svg', R, W)),
                                ]
                            ),
                        ],
                        2
                    ),
                    J,
                    t('div', Q, [
                        t('div', X, [
                            p(
                                t(
                                    'input',
                                    {
                                        type: 'text',
                                        onKeyup:
                                            e[4] ||
                                            (e[4] = _(
                                                (i) => {
                                                    r.saveSalt(),
                                                        (o.saltHistoryVisible =
                                                            !1);
                                                },
                                                ['enter']
                                            )),
                                        onInput:
                                            e[5] ||
                                            (e[5] = (...i) =>
                                                r.generate && r.generate(...i)),
                                        'onUpdate:modelValue':
                                            e[6] ||
                                            (e[6] = (i) => (o.salt = i)),
                                        onFocus:
                                            e[7] ||
                                            (e[7] = (i) =>
                                                (o.saltHistoryVisible = !0)),
                                        onFocusout:
                                            e[8] ||
                                            (e[8] = (...i) =>
                                                r.onDropdownUnfocused &&
                                                r.onDropdownUnfocused(...i)),
                                        placeholder:
                                            'Enter a key (website name)',
                                    },
                                    null,
                                    544
                                ),
                                [[k, o.salt]]
                            ),
                            t(
                                'button',
                                {
                                    onClick:
                                        e[9] ||
                                        (e[9] = (i) =>
                                            (o.saltHistoryVisible =
                                                !o.saltHistoryVisible)),
                                },
                                [
                                    o.saltHistoryVisible
                                        ? (a(), n('svg', se, oe))
                                        : (a(), n('svg', Z, ee)),
                                ]
                            ),
                        ]),
                        o.saltHistoryVisible
                            ? (a(),
                              n('div', re, [
                                  r.historySearchResults.length > 0
                                      ? (a(!0),
                                        n(
                                            f,
                                            { key: 0 },
                                            b(
                                                r.historySearchResults,
                                                (i) => (
                                                    a(),
                                                    n('div', ie, [
                                                        t(
                                                            'button',
                                                            {
                                                                onClick: (
                                                                    v
                                                                ) => {
                                                                    (o.salt =
                                                                        i.value),
                                                                        (o.saltHistoryVisible =
                                                                            !1),
                                                                        r.generate(),
                                                                        r.saveSalt();
                                                                },
                                                            },
                                                            h(i.value),
                                                            9,
                                                            ne
                                                        ),
                                                        t(
                                                            'button',
                                                            {
                                                                onClick: (
                                                                    v
                                                                ) => {
                                                                    o.saltHistory.splice(
                                                                        i.idx,
                                                                        1
                                                                    ),
                                                                        r.saveAppState();
                                                                },
                                                            },
                                                            de,
                                                            8,
                                                            ae
                                                        ),
                                                    ])
                                                )
                                            ),
                                            256
                                        ))
                                      : o.saltHistory.length > 0
                                      ? (a(), n('div', ue, 'No results'))
                                      : (a(),
                                        n(
                                            'div',
                                            he,
                                            'No items to show in history'
                                        )),
                              ]))
                            : m('', !0),
                    ]),
                    o.masterPassword.length > 0 && o.salt.length > 0
                        ? (a(),
                          n('pre', we, [
                              l('                    '),
                              t('div', null, h(o.hashedPassword), 1),
                              l(` 
                    `),
                              t(
                                  'button',
                                  {
                                      onClick:
                                          e[10] ||
                                          (e[10] = (i) => {
                                              r.copyText(o.hashedPassword),
                                                  r.saveSalt();
                                          }),
                                  },
                                  [
                                      l(`
                        `),
                                      ce,
                                      l(`
                  `),
                                  ]
                              ),
                              l(`
                `),
                          ]))
                        : m('', !0),
                ]),
                pe,
            ],
            2
        )
    );
}
const ye = P(H, [['render', me]]);
export { ye as default };
