'use strict';

const $ = function (foo) {
    return document.getElementById(foo);
};

const headAndShoulders = function (foo) {
    let bar = document.getElementsByClassName('title');
    for (let baz of bar) {
        let qux = document.createTextNode(foo);
        baz.appendChild(qux);
    }
};

const feet = function (foo) {
    let bar = document.getElementsByTagName('footer');
    let baz = new Date().getFullYear();
    const qux = `\u00A9 nml ${foo}-${baz}`;
    let quux = document.createTextNode(qux);
    bar[0].appendChild(quux);
};
