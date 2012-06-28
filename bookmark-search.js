/*
 * Delicious Bookmarker
 * Copyright (c) 2009,2010 Haran Shivanan <shivanan@statictype.org>
 * Licensed under the MIT License. See the LICENSE.txt file
 */
var Data = null;
function stop() {
    postMessage(Data+":");
}
onmessage = function(e) {
    Data = e;
    setTimeout(stop,5*1000);
}
