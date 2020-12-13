'use strict';
/**
 * nQuery, *the* JS Framework
 */
export const $ = function (foo) {
    return document.getElementById(foo);    // save keystrokes
}




export const aspectRatio = function (w, h, nW) {
  //(original height / original width) x new width = new height
  let newHeight = (h / w) * nW;
  return newHeight;
}
