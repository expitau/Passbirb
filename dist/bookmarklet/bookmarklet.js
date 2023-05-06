function ze(t) {
  if (t.__esModule)
    return t;
  var a = t.default;
  if (typeof a == "function") {
    var r = function C() {
      if (this instanceof C) {
        var h = [null];
        h.push.apply(h, arguments);
        var A = Function.bind.apply(a, h);
        return new A();
      }
      return a.apply(this, arguments);
    };
    r.prototype = a.prototype;
  } else
    r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(t).forEach(function(C) {
    var h = Object.getOwnPropertyDescriptor(t, C);
    Object.defineProperty(r, C, h.get ? h : {
      enumerable: !0,
      get: function() {
        return t[C];
      }
    });
  }), r;
}
function $e(t) {
  throw new Error('Could not dynamically require "' + t + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var SA = {}, AB = {
  get exports() {
    return SA;
  },
  set exports(t) {
    SA = t;
  }
};
const eB = {}, BB = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: eB
}, Symbol.toStringTag, { value: "Module" })), PA = /* @__PURE__ */ ze(BB);
(function(t, a) {
  var r = function() {
    var C = typeof document < "u" && document.currentScript ? document.currentScript.src : void 0;
    return function(A) {
      A = A || {};
      var A = typeof A < "u" ? A : {}, Q = {}, F;
      for (F in A)
        A.hasOwnProperty(F) && (Q[F] = A[F]);
      A.arguments = [], A.thisProgram = "./this.program", A.quit = function(e, B) {
        throw B;
      }, A.preRun = [], A.postRun = [];
      var c = !1, T = !1, b = !1, AA = !1;
      if (c = typeof window == "object", T = typeof importScripts == "function", b = typeof process == "object" && typeof $e == "function" && !c && !T, AA = !c && !b && !T, A.ENVIRONMENT)
        throw new Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)");
      i(typeof A.memoryInitializerPrefixURL > "u", "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead"), i(typeof A.pthreadMainPrefixURL > "u", "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead"), i(typeof A.cdInitializerPrefixURL > "u", "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead"), i(typeof A.filePackagePrefixURL > "u", "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
      var S = "";
      function eA(e) {
        return A.locateFile ? A.locateFile(e, S) : S + e;
      }
      if (b) {
        S = __dirname + "/";
        var L, P;
        A.read = function(B, I) {
          var E;
          return L || (L = PA), P || (P = PA), B = P.normalize(B), E = L.readFileSync(B), I ? E : E.toString();
        }, A.readBinary = function(B) {
          var I = A.read(B, !0);
          return I.buffer || (I = new Uint8Array(I)), i(I.buffer), I;
        }, process.argv.length > 1 && (A.thisProgram = process.argv[1].replace(/\\/g, "/")), A.arguments = process.argv.slice(2), process.on("uncaughtException", function(e) {
          if (!(e instanceof lA))
            throw e;
        }), process.on("unhandledRejection", function(e, B) {
          u("node.js exiting due to unhandled promise rejection"), process.exit(1);
        }), A.quit = function(e) {
          process.exit(e);
        }, A.inspect = function() {
          return "[Emscripten Module object]";
        };
      } else if (AA)
        typeof read < "u" && (A.read = function(B) {
          return read(B);
        }), A.readBinary = function(B) {
          var I;
          return typeof readbuffer == "function" ? new Uint8Array(readbuffer(B)) : (I = read(B, "binary"), i(typeof I == "object"), I);
        }, typeof scriptArgs < "u" ? A.arguments = scriptArgs : typeof arguments < "u" && (A.arguments = arguments), typeof quit == "function" && (A.quit = function(e) {
          quit(e);
        });
      else if (c || T)
        c ? document.currentScript && (S = document.currentScript.src) : S = self.location.href, C && (S = C), S.indexOf("blob:") !== 0 ? S = S.substr(0, S.lastIndexOf("/") + 1) : S = "", A.read = function(B) {
          var I = new XMLHttpRequest();
          return I.open("GET", B, !1), I.send(null), I.responseText;
        }, T && (A.readBinary = function(B) {
          var I = new XMLHttpRequest();
          return I.open("GET", B, !1), I.responseType = "arraybuffer", I.send(null), new Uint8Array(I.response);
        }), A.readAsync = function(B, I, E) {
          var o = new XMLHttpRequest();
          o.open("GET", B, !0), o.responseType = "arraybuffer", o.onload = function() {
            if (o.status == 200 || o.status == 0 && o.response) {
              I(o.response);
              return;
            }
            E();
          }, o.onerror = E, o.send(null);
        }, A.setWindowTitle = function(e) {
          document.title = e;
        };
      else
        throw new Error("environment detection error");
      var V = A.print || (typeof console < "u" ? console.log.bind(console) : typeof print < "u" ? print : null), u = A.printErr || (typeof printErr < "u" ? printErr : typeof console < "u" && console.warn.bind(console) || V);
      for (F in Q)
        Q.hasOwnProperty(F) && (A[F] = Q[F]);
      Q = void 0;
      var nA = 16;
      xA = JA = function() {
        g("cannot use the stack before compiled code is ready to run, and has provided stack access");
      };
      function q(e) {
        i(!RA);
        var B = J;
        return J = J + e + 15 & -16, i(J < p, "not enough memory for static allocation - increase TOTAL_MEMORY"), B;
      }
      function aA(e) {
        i(K);
        var B = G[K >> 2], I = B + e + 15 & -16;
        if (G[K >> 2] = I, I >= p) {
          var E = YA();
          if (!E)
            return G[K >> 2] = B, 0;
        }
        return B;
      }
      function oA(e, B) {
        B || (B = nA);
        var I = e = Math.ceil(e / B) * B;
        return I;
      }
      function BA(e) {
        switch (e) {
          case "i1":
          case "i8":
            return 1;
          case "i16":
            return 2;
          case "i32":
            return 4;
          case "i64":
            return 8;
          case "float":
            return 4;
          case "double":
            return 8;
          default: {
            if (e[e.length - 1] === "*")
              return 4;
            if (e[0] === "i") {
              var B = parseInt(e.substr(1));
              return i(B % 8 === 0), B / 8;
            } else
              return 0;
          }
        }
      }
      function IA(e) {
        IA.shown || (IA.shown = {}), IA.shown[e] || (IA.shown[e] = 1, u(e));
      }
      var zA = { "f64-rem": function(e, B) {
        return e % B;
      }, debugger: function() {
        debugger;
      } };
      new Array(0);
      var $A = 1024, yA = !1;
      function i(e, B) {
        e || g("Assertion failed: " + B);
      }
      function Ae(e, B, I, E) {
        switch (I = I || "i8", I.charAt(I.length - 1) === "*" && (I = "i32"), I) {
          case "i1":
            QA[e >> 0] = B;
            break;
          case "i8":
            QA[e >> 0] = B;
            break;
          case "i16":
            uA[e >> 1] = B;
            break;
          case "i32":
            G[e >> 2] = B;
            break;
          case "i64":
            tempI64 = [B >>> 0, (tempDouble = B, +Te(tempDouble) >= 1 ? tempDouble > 0 ? (me(+Ne(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+pe((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], G[e >> 2] = tempI64[0], G[e + 4 >> 2] = tempI64[1];
            break;
          case "float":
            GA[e >> 2] = B;
            break;
          case "double":
            _A[e >> 3] = B;
            break;
          default:
            g("invalid type for setValue: " + I);
        }
      }
      var ee = 0, Be = 2, Ie = 4;
      function ge(e, B, I, E) {
        var o, s;
        typeof e == "number" ? (o = !0, s = e) : (o = !1, s = e.length);
        var D = typeof B == "string" ? B : null, n;
        if (I == Ie ? n = E : n = [typeof OA == "function" ? OA : q, JA, q, aA][I === void 0 ? Be : I](Math.max(s, D ? 1 : B.length)), o) {
          var H;
          for (E = n, i((n & 3) == 0), H = n + (s & -4); E < H; E += 4)
            G[E >> 2] = 0;
          for (H = n + s; E < H; )
            QA[E++ >> 0] = 0;
          return n;
        }
        if (D === "i8")
          return e.subarray || e.slice ? v.set(e, n) : v.set(new Uint8Array(e), n), n;
        for (var N = 0, m, hA, wA; N < s; ) {
          var NA = e[N];
          if (m = D || B[N], m === 0) {
            N++;
            continue;
          }
          i(m, "Must know what type to store in allocate!"), m == "i64" && (m = "i32"), Ae(n + N, NA, m), wA !== m && (hA = BA(m), wA = m), N += hA;
        }
        return n;
      }
      function te(e, B) {
        if (B === 0 || !e)
          return "";
        for (var I = 0, E, o = 0; i(e + o < p), E = v[e + o >> 0], I |= E, !(E == 0 && !B || (o++, B && o == B)); )
          ;
        B || (B = o);
        var s = "";
        if (I < 128) {
          for (var D = 1024, n; B > 0; )
            n = String.fromCharCode.apply(String, v.subarray(e, e + Math.min(B, D))), s = s ? s + n : n, e += D, B -= D;
          return s;
        }
        return Ee(e);
      }
      var UA = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0;
      function ie(e, B) {
        for (var I = B; e[I]; )
          ++I;
        if (I - B > 16 && e.subarray && UA)
          return UA.decode(e.subarray(B, I));
        for (var E, o, s, D, n, H, N = ""; ; ) {
          if (E = e[B++], !E)
            return N;
          if (!(E & 128)) {
            N += String.fromCharCode(E);
            continue;
          }
          if (o = e[B++] & 63, (E & 224) == 192) {
            N += String.fromCharCode((E & 31) << 6 | o);
            continue;
          }
          if (s = e[B++] & 63, (E & 240) == 224 ? E = (E & 15) << 12 | o << 6 | s : (D = e[B++] & 63, (E & 248) == 240 ? E = (E & 7) << 18 | o << 12 | s << 6 | D : (n = e[B++] & 63, (E & 252) == 248 ? E = (E & 3) << 24 | o << 18 | s << 12 | D << 6 | n : (H = e[B++] & 63, E = (E & 1) << 30 | o << 24 | s << 18 | D << 12 | n << 6 | H))), E < 65536)
            N += String.fromCharCode(E);
          else {
            var m = E - 65536;
            N += String.fromCharCode(55296 | m >> 10, 56320 | m & 1023);
          }
        }
      }
      function Ee(e) {
        return ie(v, e);
      }
      function ne(e, B, I, E) {
        if (!(E > 0))
          return 0;
        for (var o = I, s = I + E - 1, D = 0; D < e.length; ++D) {
          var n = e.charCodeAt(D);
          if (n >= 55296 && n <= 57343) {
            var H = e.charCodeAt(++D);
            n = 65536 + ((n & 1023) << 10) | H & 1023;
          }
          if (n <= 127) {
            if (I >= s)
              break;
            B[I++] = n;
          } else if (n <= 2047) {
            if (I + 1 >= s)
              break;
            B[I++] = 192 | n >> 6, B[I++] = 128 | n & 63;
          } else if (n <= 65535) {
            if (I + 2 >= s)
              break;
            B[I++] = 224 | n >> 12, B[I++] = 128 | n >> 6 & 63, B[I++] = 128 | n & 63;
          } else if (n <= 2097151) {
            if (I + 3 >= s)
              break;
            B[I++] = 240 | n >> 18, B[I++] = 128 | n >> 12 & 63, B[I++] = 128 | n >> 6 & 63, B[I++] = 128 | n & 63;
          } else if (n <= 67108863) {
            if (I + 4 >= s)
              break;
            B[I++] = 248 | n >> 24, B[I++] = 128 | n >> 18 & 63, B[I++] = 128 | n >> 12 & 63, B[I++] = 128 | n >> 6 & 63, B[I++] = 128 | n & 63;
          } else {
            if (I + 5 >= s)
              break;
            B[I++] = 252 | n >> 30, B[I++] = 128 | n >> 24 & 63, B[I++] = 128 | n >> 18 & 63, B[I++] = 128 | n >> 12 & 63, B[I++] = 128 | n >> 6 & 63, B[I++] = 128 | n & 63;
          }
        }
        return B[I] = 0, I - o;
      }
      function ae(e) {
        for (var B = 0, I = 0; I < e.length; ++I) {
          var E = e.charCodeAt(I);
          E >= 55296 && E <= 57343 && (E = 65536 + ((E & 1023) << 10) | e.charCodeAt(++I) & 1023), E <= 127 ? ++B : E <= 2047 ? B += 2 : E <= 65535 ? B += 3 : E <= 2097151 ? B += 4 : E <= 67108863 ? B += 5 : B += 6;
        }
        return B;
      }
      typeof TextDecoder < "u" && new TextDecoder("utf-16le");
      function oe(e) {
        return IA("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling"), e;
      }
      function re(e) {
        var B = /__Z[\w\d_]+/g;
        return e.replace(B, function(I) {
          var E = oe(I);
          return I === E ? I : I + " [" + E + "]";
        });
      }
      function Qe() {
        var e = new Error();
        if (!e.stack) {
          try {
            throw new Error(0);
          } catch (B) {
            e = B;
          }
          if (!e.stack)
            return "(no stack trace available)";
        }
        return e.stack.toString();
      }
      function Ce() {
        var e = Qe();
        return A.extraStackTrace && (e += `
` + A.extraStackTrace()), re(e);
      }
      var rA = 65536, se = 16777216;
      function ce(e, B) {
        return e % B > 0 && (e += B - e % B), e;
      }
      var M, QA, v, uA, G, W, GA, _A;
      function fe(e) {
        A.buffer = M = e;
      }
      function kA() {
        A.HEAP8 = QA = new Int8Array(M), A.HEAP16 = uA = new Int16Array(M), A.HEAP32 = G = new Int32Array(M), A.HEAPU8 = v = new Uint8Array(M), A.HEAPU16 = new Uint16Array(M), A.HEAPU32 = W = new Uint32Array(M), A.HEAPF32 = GA = new Float32Array(M), A.HEAPF64 = _A = new Float64Array(M);
      }
      var CA, J, RA, DA, MA, _, sA, K;
      CA = J = DA = MA = _ = sA = K = 0, RA = !1;
      function de() {
        i((_ & 3) == 0), W[(_ >> 2) - 1] = 34821223, W[(_ >> 2) - 2] = 2310721022;
      }
      function cA() {
        if ((W[(_ >> 2) - 1] != 34821223 || W[(_ >> 2) - 2] != 2310721022) && g("Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x02135467, but received 0x" + W[(_ >> 2) - 2].toString(16) + " " + W[(_ >> 2) - 1].toString(16)), G[0] !== 1668509029)
          throw "Runtime error: The application has corrupted its heap memory area (address zero)!";
      }
      function le(e) {
        g("Stack overflow! Attempted to allocate " + e + " bytes on the stack, but stack has only " + (_ - xA() + e) + " bytes available!");
      }
      function HA() {
        g("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + p + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ");
      }
      function YA() {
        HA();
      }
      var TA = A.TOTAL_STACK || 5242880, p = A.TOTAL_MEMORY || 545259520;
      p < TA && u("TOTAL_MEMORY should be larger than TOTAL_STACK, was " + p + "! (TOTAL_STACK=" + TA + ")"), i(typeof Int32Array < "u" && typeof Float64Array < "u" && Int32Array.prototype.subarray !== void 0 && Int32Array.prototype.set !== void 0, "JS engine does not provide full typed array support"), A.buffer ? (M = A.buffer, i(M.byteLength === p, "provided buffer should be " + p + " bytes, but it is " + M.byteLength)) : (typeof WebAssembly == "object" && typeof WebAssembly.Memory == "function" ? (i(p % rA === 0), A.wasmMemory = new WebAssembly.Memory({ initial: p / rA, maximum: p / rA }), M = A.wasmMemory.buffer) : M = new ArrayBuffer(p), i(M.byteLength === p), A.buffer = M), kA();
      function he() {
        return p;
      }
      if (G[0] = 1668509029, uA[1] = 25459, v[2] !== 115 || v[3] !== 99)
        throw "Runtime error: expected the system to be little-endian!";
      function fA(e) {
        for (; e.length > 0; ) {
          var B = e.shift();
          if (typeof B == "function") {
            B();
            continue;
          }
          var I = B.func;
          typeof I == "number" ? B.arg === void 0 ? A.dynCall_v(I) : A.dynCall_vi(I, B.arg) : I(B.arg === void 0 ? null : B.arg);
        }
      }
      var bA = [], LA = [], we = [], vA = [], f = !1, l = !1;
      function Fe() {
        if (A.preRun)
          for (typeof A.preRun == "function" && (A.preRun = [A.preRun]); A.preRun.length; )
            De(A.preRun.shift());
        fA(bA);
      }
      function ye() {
        cA(), !f && (f = !0, fA(LA));
      }
      function ue() {
        cA(), fA(we);
      }
      function Re() {
        if (cA(), A.postRun)
          for (typeof A.postRun == "function" && (A.postRun = [A.postRun]); A.postRun.length; )
            Me(A.postRun.shift());
        fA(vA);
      }
      function De(e) {
        bA.unshift(e);
      }
      function Me(e) {
        vA.unshift(e);
      }
      i(Math.imul && Math.fround && Math.clz32 && Math.trunc, "this is a legacy browser, build with LEGACY_VM_SUPPORT");
      var Te = Math.abs, pe = Math.ceil, Ne = Math.floor, me = Math.min, Z = 0, j = null, gA = null, tA = {};
      function Se(e) {
        Z++, A.monitorRunDependencies && A.monitorRunDependencies(Z), e ? (i(!tA[e]), tA[e] = 1, j === null && typeof setInterval < "u" && (j = setInterval(function() {
          if (yA) {
            clearInterval(j), j = null;
            return;
          }
          var B = !1;
          for (var I in tA)
            B || (B = !0, u("still waiting on run dependencies:")), u("dependency: " + I);
          B && u("(end of list)");
        }, 1e4))) : u("warning: run dependency added without ID");
      }
      function Ue(e) {
        if (Z--, A.monitorRunDependencies && A.monitorRunDependencies(Z), e ? (i(tA[e]), delete tA[e]) : u("warning: run dependency removed without ID"), Z == 0 && (j !== null && (clearInterval(j), j = null), gA)) {
          var B = gA;
          gA = null, B();
        }
      }
      A.preloadedImages = {}, A.preloadedAudios = {};
      var k = { error: function() {
        g("Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with  -s FORCE_FILESYSTEM=1");
      }, init: function() {
        k.error();
      }, createDataFile: function() {
        k.error();
      }, createPreloadedFile: function() {
        k.error();
      }, createLazyFile: function() {
        k.error();
      }, open: function() {
        k.error();
      }, mkdev: function() {
        k.error();
      }, registerDevice: function() {
        k.error();
      }, analyzePath: function() {
        k.error();
      }, loadFilesFromDB: function() {
        k.error();
      }, ErrnoError: function() {
        k.error();
      } };
      A.FS_createDataFile = k.createDataFile, A.FS_createPreloadedFile = k.createPreloadedFile;
      var XA = "data:application/octet-stream;base64,";
      function dA(e) {
        return String.prototype.startsWith ? e.startsWith(XA) : e.indexOf(XA) === 0;
      }
      function Ge() {
        var e = "argon2.wast", B = "argon2.wasm", I = "argon2.temp.asm.js";
        dA(e) || (e = eA(e)), dA(B) || (B = eA(B)), dA(I) || (I = eA(I));
        var E = 64 * 1024, o = { global: null, env: null, asm2wasm: zA, parent: A }, s = null;
        function D(w) {
          var y = A.buffer;
          w.byteLength < y.byteLength && u("the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here");
          var iA = new Int8Array(y), U = new Int8Array(w);
          U.set(iA), fe(w), kA();
        }
        function n(w) {
          return w;
        }
        function H() {
          try {
            if (A.wasmBinary)
              return new Uint8Array(A.wasmBinary);
            if (A.readBinary)
              return A.readBinary(B);
            throw "both async and sync fetching of the wasm failed";
          } catch (w) {
            g(w);
          }
        }
        function N() {
          return !A.wasmBinary && (c || T) && typeof fetch == "function" ? fetch(B, { credentials: "same-origin" }).then(function(w) {
            if (!w.ok)
              throw "failed to load wasm binary file at '" + B + "'";
            return w.arrayBuffer();
          }).catch(function() {
            return H();
          }) : new Promise(function(w, y) {
            w(H());
          });
        }
        function m(w, y, iA) {
          if (typeof WebAssembly != "object")
            return g("No WebAssembly support found. Build with -s WASM=0 to target JavaScript instead."), u("no native wasm support detected"), !1;
          if (!(A.wasmMemory instanceof WebAssembly.Memory))
            return u("no native wasm Memory in use"), !1;
          y.memory = A.wasmMemory, o.global = { NaN: NaN, Infinity: 1 / 0 }, o["global.Math"] = Math, o.env = y;
          function U(X, EA) {
            s = X.exports, s.memory && D(s.memory), A.asm = s, A.usingWasm = !0, Ue("wasm-instantiate");
          }
          if (Se("wasm-instantiate"), A.instantiateWasm)
            try {
              return A.instantiateWasm(o, U);
            } catch (X) {
              return u("Module.instantiateWasm callback failed with error: " + X), !1;
            }
          var z = A;
          function x(X) {
            i(A === z, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?"), z = null, U(X.instance, X.module);
          }
          function KA(X) {
            N().then(function(EA) {
              return WebAssembly.instantiate(EA, o);
            }).then(X).catch(function(EA) {
              u("failed to asynchronously prepare wasm: " + EA), g(EA);
            });
          }
          return !A.wasmBinary && typeof WebAssembly.instantiateStreaming == "function" && !dA(B) && typeof fetch == "function" ? WebAssembly.instantiateStreaming(fetch(B, { credentials: "same-origin" }), o).then(x).catch(function(X) {
            u("wasm streaming compile failed: " + X), u("falling back to ArrayBuffer instantiation"), KA(x);
          }) : KA(x), {};
        }
        A.asmPreload = A.asm;
        var hA = A.reallocBuffer, wA = function(w) {
          var y = A.usingWasm ? rA : se;
          w = ce(w, y);
          var iA = A.buffer, U = iA.byteLength;
          if (A.usingWasm)
            try {
              var z = A.wasmMemory.grow((w - U) / E);
              return z !== -1 ? A.buffer = A.wasmMemory.buffer : null;
            } catch (x) {
              return console.error("Module.reallocBuffer: Attempted to grow from " + U + " bytes to " + w + " bytes, but got error: " + x), null;
            }
        };
        A.reallocBuffer = function(w) {
          return NA === "asmjs" ? hA(w) : wA(w);
        };
        var NA = "";
        A.asm = function(w, y, iA) {
          if (y = y, !y.table) {
            var U = A.wasmTableSize;
            U === void 0 && (U = 1024);
            var z = A.wasmMaxTableSize;
            typeof WebAssembly == "object" && typeof WebAssembly.Table == "function" ? z !== void 0 ? y.table = new WebAssembly.Table({ initial: U, maximum: z, element: "anyfunc" }) : y.table = new WebAssembly.Table({ initial: U, element: "anyfunc" }) : y.table = new Array(U), A.wasmTable = y.table;
          }
          y.memoryBase || (y.memoryBase = A.STATIC_BASE), y.tableBase || (y.tableBase = 0);
          var x;
          return x = m(w, y), i(x, "no binaryen method succeeded. consider enabling more options, like interpreting, if you want that: http://kripken.github.io/emscripten-site/docs/compiling/WebAssembly.html#binaryen-methods"), x;
        };
      }
      Ge(), CA = $A, J = CA + 3424, LA.push();
      var _e = 3424;
      A.STATIC_BASE = CA, A.STATIC_BUMP = _e;
      var ke = J;
      J += 16, i(ke % 8 == 0);
      function He(e, B, I) {
        return v.set(v.subarray(B, B + I), e), e;
      }
      function Ye() {
      }
      function be(e) {
        return A.___errno_location ? G[A.___errno_location() >> 2] = e : u("failed to set errno from JS"), e;
      }
      K = q(4), DA = MA = oA(J), _ = DA + TA, sA = oA(_), G[K >> 2] = sA, RA = !0, i(sA < p, "TOTAL_MEMORY not big enough for stack");
      function Le(e, B, I) {
        var E = I > 0 ? I : ae(e) + 1, o = new Array(E), s = ne(e, o, 0, o.length);
        return B && (o.length = s), o;
      }
      A.wasmTableSize = 0, A.wasmMaxTableSize = 0, A.asmGlobalArg = {}, A.asmLibraryArg = { enlargeMemory: YA, getTotalMemory: he, abortOnCannotGrowMemory: HA, abortStackOverflow: le, ___setErrNo: be, _emscripten_memcpy_big: He, _pthread_join: Ye, DYNAMICTOP_PTR: K, STACKTOP: MA, STACK_MAX: _ };
      var d = A.asm(A.asmGlobalArg, A.asmLibraryArg, M), ve = d._argon2_error_message;
      d._argon2_error_message = function() {
        return i(f, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), i(!l, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), ve.apply(null, arguments);
      };
      var Xe = d._argon2_hash;
      d._argon2_hash = function() {
        return i(f, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), i(!l, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Xe.apply(null, arguments);
      };
      var Oe = d._free;
      d._free = function() {
        return i(f, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), i(!l, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Oe.apply(null, arguments);
      };
      var Je = d._malloc;
      d._malloc = function() {
        return i(f, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), i(!l, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Je.apply(null, arguments);
      };
      var xe = d._sbrk;
      d._sbrk = function() {
        return i(f, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), i(!l, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), xe.apply(null, arguments);
      };
      var qe = d.establishStackSpace;
      d.establishStackSpace = function() {
        return i(f, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), i(!l, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), qe.apply(null, arguments);
      };
      var Ke = d.getTempRet0;
      d.getTempRet0 = function() {
        return i(f, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), i(!l, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Ke.apply(null, arguments);
      };
      var Pe = d.setTempRet0;
      d.setTempRet0 = function() {
        return i(f, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), i(!l, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Pe.apply(null, arguments);
      };
      var Ve = d.setThrew;
      d.setThrew = function() {
        return i(f, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), i(!l, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Ve.apply(null, arguments);
      };
      var We = d.stackAlloc;
      d.stackAlloc = function() {
        return i(f, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), i(!l, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), We.apply(null, arguments);
      };
      var Ze = d.stackRestore;
      d.stackRestore = function() {
        return i(f, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), i(!l, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Ze.apply(null, arguments);
      };
      var je = d.stackSave;
      d.stackSave = function() {
        return i(f, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), i(!l, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), je.apply(null, arguments);
      }, A.asm = d, A._argon2_error_message = function() {
        return i(f, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), i(!l, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), A.asm._argon2_error_message.apply(null, arguments);
      }, A._argon2_hash = function() {
        return i(f, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), i(!l, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), A.asm._argon2_hash.apply(null, arguments);
      }, A._free = function() {
        return i(f, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), i(!l, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), A.asm._free.apply(null, arguments);
      };
      var OA = A._malloc = function() {
        return i(f, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), i(!l, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), A.asm._malloc.apply(null, arguments);
      };
      A._sbrk = function() {
        return i(f, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), i(!l, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), A.asm._sbrk.apply(null, arguments);
      }, A.establishStackSpace = function() {
        return i(f, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), i(!l, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), A.asm.establishStackSpace.apply(null, arguments);
      }, A.getTempRet0 = function() {
        return i(f, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), i(!l, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), A.asm.getTempRet0.apply(null, arguments);
      }, A.setTempRet0 = function() {
        return i(f, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), i(!l, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), A.asm.setTempRet0.apply(null, arguments);
      }, A.setThrew = function() {
        return i(f, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), i(!l, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), A.asm.setThrew.apply(null, arguments);
      };
      var JA = A.stackAlloc = function() {
        return i(f, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), i(!l, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), A.asm.stackAlloc.apply(null, arguments);
      };
      A.stackRestore = function() {
        return i(f, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), i(!l, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), A.asm.stackRestore.apply(null, arguments);
      };
      var xA = A.stackSave = function() {
        return i(f, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), i(!l, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), A.asm.stackSave.apply(null, arguments);
      };
      A.asm = d, A.intArrayFromString = Le, A.intArrayToString || (A.intArrayToString = function() {
        g("'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.ccall || (A.ccall = function() {
        g("'ccall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.cwrap || (A.cwrap = function() {
        g("'cwrap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.setValue || (A.setValue = function() {
        g("'setValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.getValue || (A.getValue = function() {
        g("'getValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.allocate = ge, A.getMemory || (A.getMemory = function() {
        g("'getMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
      }), A.Pointer_stringify = te, A.AsciiToString || (A.AsciiToString = function() {
        g("'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.stringToAscii || (A.stringToAscii = function() {
        g("'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.UTF8ArrayToString || (A.UTF8ArrayToString = function() {
        g("'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.UTF8ToString || (A.UTF8ToString = function() {
        g("'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.stringToUTF8Array || (A.stringToUTF8Array = function() {
        g("'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.stringToUTF8 || (A.stringToUTF8 = function() {
        g("'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.lengthBytesUTF8 || (A.lengthBytesUTF8 = function() {
        g("'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.UTF16ToString || (A.UTF16ToString = function() {
        g("'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.stringToUTF16 || (A.stringToUTF16 = function() {
        g("'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.lengthBytesUTF16 || (A.lengthBytesUTF16 = function() {
        g("'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.UTF32ToString || (A.UTF32ToString = function() {
        g("'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.stringToUTF32 || (A.stringToUTF32 = function() {
        g("'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.lengthBytesUTF32 || (A.lengthBytesUTF32 = function() {
        g("'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.allocateUTF8 || (A.allocateUTF8 = function() {
        g("'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.stackTrace || (A.stackTrace = function() {
        g("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.addOnPreRun || (A.addOnPreRun = function() {
        g("'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.addOnInit || (A.addOnInit = function() {
        g("'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.addOnPreMain || (A.addOnPreMain = function() {
        g("'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.addOnExit || (A.addOnExit = function() {
        g("'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.addOnPostRun || (A.addOnPostRun = function() {
        g("'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.writeStringToMemory || (A.writeStringToMemory = function() {
        g("'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.writeArrayToMemory || (A.writeArrayToMemory = function() {
        g("'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.writeAsciiToMemory || (A.writeAsciiToMemory = function() {
        g("'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.addRunDependency || (A.addRunDependency = function() {
        g("'addRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
      }), A.removeRunDependency || (A.removeRunDependency = function() {
        g("'removeRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
      }), A.ENV || (A.ENV = function() {
        g("'ENV' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.FS || (A.FS = function() {
        g("'FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.FS_createFolder || (A.FS_createFolder = function() {
        g("'FS_createFolder' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
      }), A.FS_createPath || (A.FS_createPath = function() {
        g("'FS_createPath' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
      }), A.FS_createDataFile || (A.FS_createDataFile = function() {
        g("'FS_createDataFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
      }), A.FS_createPreloadedFile || (A.FS_createPreloadedFile = function() {
        g("'FS_createPreloadedFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
      }), A.FS_createLazyFile || (A.FS_createLazyFile = function() {
        g("'FS_createLazyFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
      }), A.FS_createLink || (A.FS_createLink = function() {
        g("'FS_createLink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
      }), A.FS_createDevice || (A.FS_createDevice = function() {
        g("'FS_createDevice' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
      }), A.FS_unlink || (A.FS_unlink = function() {
        g("'FS_unlink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
      }), A.GL || (A.GL = function() {
        g("'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.staticAlloc || (A.staticAlloc = function() {
        g("'staticAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.dynamicAlloc || (A.dynamicAlloc = function() {
        g("'dynamicAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.warnOnce || (A.warnOnce = function() {
        g("'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.loadDynamicLibrary || (A.loadDynamicLibrary = function() {
        g("'loadDynamicLibrary' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.loadWebAssemblyModule || (A.loadWebAssemblyModule = function() {
        g("'loadWebAssemblyModule' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.getLEB || (A.getLEB = function() {
        g("'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.getFunctionTables || (A.getFunctionTables = function() {
        g("'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.alignFunctionTables || (A.alignFunctionTables = function() {
        g("'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.registerFunctions || (A.registerFunctions = function() {
        g("'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.addFunction || (A.addFunction = function() {
        g("'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.removeFunction || (A.removeFunction = function() {
        g("'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.getFuncWrapper || (A.getFuncWrapper = function() {
        g("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.prettyPrint || (A.prettyPrint = function() {
        g("'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.makeBigInt || (A.makeBigInt = function() {
        g("'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.dynCall || (A.dynCall = function() {
        g("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.getCompilerSetting || (A.getCompilerSetting = function() {
        g("'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.stackSave || (A.stackSave = function() {
        g("'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.stackRestore || (A.stackRestore = function() {
        g("'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.stackAlloc || (A.stackAlloc = function() {
        g("'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.establishStackSpace || (A.establishStackSpace = function() {
        g("'establishStackSpace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.print || (A.print = function() {
        g("'print' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.printErr || (A.printErr = function() {
        g("'printErr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      }), A.ALLOC_NORMAL = ee, A.ALLOC_STACK || Object.defineProperty(A, "ALLOC_STACK", { get: function() {
        g("'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      } }), A.ALLOC_STATIC || Object.defineProperty(A, "ALLOC_STATIC", { get: function() {
        g("'ALLOC_STATIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      } }), A.ALLOC_DYNAMIC || Object.defineProperty(A, "ALLOC_DYNAMIC", { get: function() {
        g("'ALLOC_DYNAMIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      } }), A.ALLOC_NONE || Object.defineProperty(A, "ALLOC_NONE", { get: function() {
        g("'ALLOC_NONE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      } }), A.then = function(e) {
        if (A.calledRun)
          e(A);
        else {
          var B = A.onRuntimeInitialized;
          A.onRuntimeInitialized = function() {
            B && B(), e(A);
          };
        }
        return A;
      };
      function lA(e) {
        this.name = "ExitStatus", this.message = "Program terminated with exit(" + e + ")", this.status = e;
      }
      lA.prototype = new Error(), lA.prototype.constructor = lA, gA = function e() {
        A.calledRun || pA(), A.calledRun || (gA = e);
      };
      function pA(e) {
        if (e = e || A.arguments, Z > 0 || (de(), Fe(), Z > 0) || A.calledRun)
          return;
        function B() {
          A.calledRun || (A.calledRun = !0, !yA && (ye(), ue(), A.onRuntimeInitialized && A.onRuntimeInitialized(), i(!A._main, 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]'), Re()));
        }
        A.setStatus ? (A.setStatus("Running..."), setTimeout(function() {
          setTimeout(function() {
            A.setStatus("");
          }, 1), B();
        }, 1)) : B(), cA();
      }
      A.run = pA;
      var qA = [];
      function g(e) {
        A.onAbort && A.onAbort(e), e !== void 0 ? (V(e), u(e), e = JSON.stringify(e)) : e = "", yA = !0;
        var B = "", I = "abort(" + e + ") at " + Ce() + B;
        throw qA && qA.forEach(function(E) {
          I = E(I, e);
        }), I;
      }
      if (A.abort = g, A.preInit)
        for (typeof A.preInit == "function" && (A.preInit = [A.preInit]); A.preInit.length > 0; )
          A.preInit.pop()();
      return A.noExitRuntime = !0, pA(), A;
    };
  }();
  t.exports = r;
})(AB);
var FA = {};
FA.byteLength = tB;
FA.toByteArray = EB;
FA.fromByteArray = oB;
var O = [], Y = [], IB = typeof Uint8Array < "u" ? Uint8Array : Array, mA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var $ = 0, gB = mA.length; $ < gB; ++$)
  O[$] = mA[$], Y[mA.charCodeAt($)] = $;
Y["-".charCodeAt(0)] = 62;
Y["_".charCodeAt(0)] = 63;
function jA(t) {
  var a = t.length;
  if (a % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var r = t.indexOf("=");
  r === -1 && (r = a);
  var C = r === a ? 0 : 4 - r % 4;
  return [r, C];
}
function tB(t) {
  var a = jA(t), r = a[0], C = a[1];
  return (r + C) * 3 / 4 - C;
}
function iB(t, a, r) {
  return (a + r) * 3 / 4 - r;
}
function EB(t) {
  for (var a, r = jA(t), C = r[0], h = r[1], A = new IB(iB(t, C, h)), Q = 0, F = h > 0 ? C - 4 : C, c = 0; c < F; c += 4)
    a = Y[t.charCodeAt(c)] << 18 | Y[t.charCodeAt(c + 1)] << 12 | Y[t.charCodeAt(c + 2)] << 6 | Y[t.charCodeAt(c + 3)], A[Q++] = a >> 16 & 255, A[Q++] = a >> 8 & 255, A[Q++] = a & 255;
  return h === 2 && (a = Y[t.charCodeAt(c)] << 2 | Y[t.charCodeAt(c + 1)] >> 4, A[Q++] = a & 255), h === 1 && (a = Y[t.charCodeAt(c)] << 10 | Y[t.charCodeAt(c + 1)] << 4 | Y[t.charCodeAt(c + 2)] >> 2, A[Q++] = a >> 8 & 255, A[Q++] = a & 255), A;
}
function nB(t) {
  return O[t >> 18 & 63] + O[t >> 12 & 63] + O[t >> 6 & 63] + O[t & 63];
}
function aB(t, a, r) {
  for (var C, h = [], A = a; A < r; A += 3)
    C = (t[A] << 16 & 16711680) + (t[A + 1] << 8 & 65280) + (t[A + 2] & 255), h.push(nB(C));
  return h.join("");
}
function oB(t) {
  for (var a, r = t.length, C = r % 3, h = [], A = 16383, Q = 0, F = r - C; Q < F; Q += A)
    h.push(aB(
      t,
      Q,
      Q + A > F ? F : Q + A
    ));
  return C === 1 ? (a = t[r - 1], h.push(
    O[a >> 2] + O[a << 4 & 63] + "=="
  )) : C === 2 && (a = (t[r - 2] << 8) + t[r - 1], h.push(
    O[a >> 10] + O[a >> 4 & 63] + O[a << 2 & 63] + "="
  )), h.join("");
}
var rB = FA;
let QB = "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AAAACgAAAAUAAAAKAAAAAgAAAAgAAAAEAAAABwAAAAYAAAABAAAABQAAAA8AAAALAAAACQAAAA4AAAADAAAADAAAAA0AQcQNC5sJAQAAAAIAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAADgAAAAoAAAAEAAAACAAAAAkAAAAPAAAADQAAAAYAAAABAAAADAAAAAAAAAACAAAACwAAAAcAAAAFAAAAAwAAAGFyZ29uMmQAQXJnb24yZABhcmdvbjJpAEFyZ29uMmkAYXJnb24yaWQAQXJnb24yaWQAYXJnb24ydQBBcmdvbjJ1AFVua25vd24gZXJyb3IgY29kZQBUaGUgcGFzc3dvcmQgZG9lcyBub3QgbWF0Y2ggdGhlIHN1cHBsaWVkIGhhc2gAU29tZSBvZiBlbmNvZGVkIHBhcmFtZXRlcnMgYXJlIHRvbyBsb25nIG9yIHRvbyBzaG9ydABUaHJlYWRpbmcgZmFpbHVyZQBEZWNvZGluZyBmYWlsZWQARW5jb2RpbmcgZmFpbGVkAE1pc3NpbmcgYXJndW1lbnRzAFRvbyBtYW55IHRocmVhZHMATm90IGVub3VnaCB0aHJlYWRzAE91dHB1dCBwb2ludGVyIG1pc21hdGNoAFRoZXJlIGlzIG5vIHN1Y2ggdmVyc2lvbiBvZiBBcmdvbjIAQXJnb24yX0NvbnRleHQgY29udGV4dCBpcyBOVUxMAFRoZSBhbGxvY2F0ZSBtZW1vcnkgY2FsbGJhY2sgaXMgTlVMTABUaGUgZnJlZSBtZW1vcnkgY2FsbGJhY2sgaXMgTlVMTABNZW1vcnkgYWxsb2NhdGlvbiBlcnJvcgBBc3NvY2lhdGVkIGRhdGEgcG9pbnRlciBpcyBOVUxMLCBidXQgYWQgbGVuZ3RoIGlzIG5vdCAwAFNlY3JldCBwb2ludGVyIGlzIE5VTEwsIGJ1dCBzZWNyZXQgbGVuZ3RoIGlzIG5vdCAwAFNhbHQgcG9pbnRlciBpcyBOVUxMLCBidXQgc2FsdCBsZW5ndGggaXMgbm90IDAAUGFzc3dvcmQgcG9pbnRlciBpcyBOVUxMLCBidXQgcGFzc3dvcmQgbGVuZ3RoIGlzIG5vdCAwAFRvbyBtYW55IGxhbmVzAFRvbyBmZXcgbGFuZXMATWVtb3J5IGNvc3QgaXMgdG9vIGxhcmdlAE1lbW9yeSBjb3N0IGlzIHRvbyBzbWFsbABUaW1lIGNvc3QgaXMgdG9vIGxhcmdlAFRpbWUgY29zdCBpcyB0b28gc21hbGwAU2VjcmV0IGlzIHRvbyBsb25nAFNlY3JldCBpcyB0b28gc2hvcnQAQXNzb2NpYXRlZCBkYXRhIGlzIHRvbyBsb25nAEFzc29jaWF0ZWQgZGF0YSBpcyB0b28gc2hvcnQAU2FsdCBpcyB0b28gbG9uZwBTYWx0IGlzIHRvbyBzaG9ydABQYXNzd29yZCBpcyB0b28gbG9uZwBQYXNzd29yZCBpcyB0b28gc2hvcnQAT3V0cHV0IGlzIHRvbyBsb25nAE91dHB1dCBpcyB0b28gc2hvcnQAT3V0cHV0IHBvaW50ZXIgaXMgTlVMTABPSwAwMTIzNDU2Nzg5";
var CB = rB.toByteArray(QB);
if (!WebAssembly)
  throw new Error("WebAssembly not supported here.");
var sB = SA, cB = CB, R = {
  printErr: console.error,
  setStatus: console.log,
  wasmBinary: cB
  // TODO: set these to avoid using base64 everywhere?
  // wasmBinaryFile: root + 'dist/argon2.wasm',
  // locateFile: function(file) { return (args.distPath || '') + '/' + file; }
};
function fB(t) {
  return R._argon2_hash ? new Promise((a, r) => {
    try {
      a(VA(t));
    } catch (C) {
      r(C);
    }
  }) : new Promise((a, r) => {
    R.onRuntimeInitialized = function() {
      try {
        a(VA(t));
      } catch (C) {
        r(C);
      }
    }, sB(R);
  }).catch((a) => {
    console.log(a);
  });
}
function VA(t) {
  if (!R._argon2_hash)
    throw new Error("Error: _argon2_hash not available");
  var a = t && t.time || 10, r = t && t.mem || 1024, C = t && t.parallelism || 1, h = WA(t && t.pass || "password"), A = t && t.pass ? t.pass.length : 8, Q = WA(t && t.salt || "somesalt"), F = t && t.salt ? t.salt.length : 8, c = R.allocate(new Array(t && t.hashLen || 32), "i8", R.ALLOC_NORMAL), T = t && t.hashLen || 32, b = R.allocate(new Array(512), "i8", R.ALLOC_NORMAL), AA = 512, S = t && t.type || 0, eA = 19, L;
  try {
    var P = R._argon2_hash(
      a,
      r,
      C,
      h,
      A,
      Q,
      F,
      c,
      T,
      b,
      AA,
      S,
      eA
    );
  } catch (BA) {
    L = BA;
  }
  var V;
  if (P === 0 && !L) {
    for (var u = "", nA = new Uint8Array(T), q = 0; q < T; q++) {
      var aA = R.HEAP8[c + q];
      nA[q] = aA, u += ("0" + (255 & aA).toString(16)).slice(-2);
    }
    var oA = R.Pointer_stringify(b);
    V = { hash: nA, hashHex: u, encoded: oA };
  } else {
    try {
      L || (L = R.Pointer_stringify(R._argon2_error_message(P)));
    } catch {
    }
    V = { message: L, code: P };
  }
  try {
    R._free(h), R._free(Q), R._free(c), R._free(b);
  } catch {
  }
  if (L)
    throw V;
  return V;
}
function WA(t) {
  var a = t instanceof Uint8Array || t instanceof Array ? t : R.intArrayFromString(t);
  return R.allocate(a, "i8", R.ALLOC_NORMAL);
}
var ZA = {
  hash: fB,
  types: {
    Argon2d: 0,
    Argon2i: 1,
    Argon2id: 2,
    Argon2u: 10
  }
};
async function dB(t, a) {
  async function r(c) {
    const T = new TextEncoder().encode(c), b = await crypto.subtle.digest("SHA-256", T);
    return Array.from(new Uint8Array(b));
  }
  function C(c) {
    return btoa(
      String.fromCharCode.apply(null, new Uint8Array(c))
    );
  }
  let Q = (await ZA.hash({
    pass: t,
    // The master password to hash
    salt: C(await r(a)),
    // Base64 encoding of sha256(data)
    time: 20,
    // Apply 20 iterations
    mem: 1024,
    // Use 1024kB memory
    hashLen: 15,
    // Output 15 bytes of hash (15 * 8 / 6 = 20 Base64 characters)
    parallelism: 4,
    // Use 4 threads
    type: ZA.types.Argon2id
    // Harden against both side-channel and GPU cracking
  })).encoded.split("$").pop().replaceAll(/\+/gi, "-").replaceAll(/\//gi, "_");
  function F(c, T, b) {
    return T.substring(0, c) + b + T.substring(c + 1);
  }
  return Q.match(/.{4}[0-9]/g) || (Q = F(0, Q, "1")), Q.match(/.{4}[a-z]/g) || (Q = F(1, Q, "a")), Q.match(/.{4}[A-Z]/g) || (Q = F(2, Q, "A")), Q.match(/.{4}[\-\_]/g) || (Q = F(3, Q, "-")), Q;
}
let lB = prompt("Enter the master password"), hB = prompt("Enter a salt:", location.hostname.split(".").slice(-2, -1)[0] + ":0");
dB(lB, hB).then(alert);
