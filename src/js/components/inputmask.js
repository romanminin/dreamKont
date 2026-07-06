import Inputmask from "inputmask";

// CommonJS
// const Inputmask = require("inputmask");

Inputmask({ mask: "+7 (999) 999-99-99", showMaskOnHover: false })
       .mask(document.querySelectorAll('#phone, .phone-mask'));