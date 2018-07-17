/*jslint browser:true*/
/*jslint node:true*/

"use strict";

window.onload = function () {
    var level = document.getElementById("pump"),
        nachoreW = document.getElementById("nachoreWant"),
        pumpList = [1, 2, 5, 7, 12, 30, 40, 60, 150, 200],
        nextList = [10, 25, 100, 150, 300, 1000, 2000, 3000, 5000, "no"],
        //Updated on 170718 ~1530h
        nachoreL = {
            blq: 0.696,
            miq: 2.262,
            meq: 7.621,
            hoq: 34.975,
            flq: 109.951
        },
        i,
        blq = [];
    for (i = 1; i <= 4; i += 1) {
        blq[(i - 1)] = document.getElementById("blq" + i);
    }
    nachoreW.onkeypress = function (e) {
        var key = e.charCode || e.keyCode || 0;
        if (key === 13) {
            e.preventDefault();
        }
    };
    level.onchange = function () {
        var blqHunt = nachoreW.value / nachoreL.blq;
        document.getElementById("display").innerHTML =
            pumpList[level.value - 1];
        document.getElementById("nachoreNeed").innerHTML =
            nextList[level.value - 1];
        blq4.innerHTML = Math.ceil(Math.ceil(blqHunt) /
            pumpList[level.value - 1]);
        blq5.innerHTML = parseInt(blq2.innerHTML, 10) +
            parseInt(blq4.innerHTML, 10);
    };
    nachoreW.onkeyup = function () {
        var blqHunt = nachoreW.value / nachoreL.blq;
        blq1.innerHTML = blqHunt.toFixed(3);
        blq2.innerHTML = Math.ceil(blqHunt);
        blq3.innerHTML = blq2.innerHTML;
        blq4.innerHTML = Math.ceil(Math.ceil(blqHunt) /
            pumpList[level.value - 1]);
        blq5.innerHTML = parseInt(blq2.innerHTML, 10) +
            parseInt(blq4.innerHTML, 10);
        blq6.innerHTML = blq2.innerHTML;
    };
};
