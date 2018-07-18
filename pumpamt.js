/*jslint browser:true*/
/*jslint node:true*/

/*To-do:
    1) add hunts saved via ME functionality
    2) add QPC functionality
    3) add OESB functionality
    4) add tonic functionality (take values from DB)
    5) learn CSS and beautify site*/

"use strict";

window.onload = function () {
    //Declaring variables
    var level = document.getElementById("pump"),
        nachoreW = document.getElementById("nachoreWant"),
        maEssUse = document.getElementById("mEss"),
        pumpList = [1, 2, 5, 7, 12, 30, 40, 60, 150, 200],
        nextList = [10, 25, 100, 150, 300, 1000, 2000, 3000, 5000, "no"],
        //Updated on 180718 ~1330h; rate per catch
        nachoreL = {
            blq: 0.695,
            miq: 2.260,
            meq: 7.618,
            hoq: 34.938,
            flq: 109.935
        },
        spiceLsL = {
            miL: 2.902,
            meL: 1.979,
            hoL: 1.409,
            flL: 0.872
        },
        i,
        blqV = [],
        miqV = [],
        meqV = [],
        hoqV = [],
        flqV = [],
        best = [],
        posH = ["Bland Queso",
                "Mild Queso",
                "Medium Queso",
                "Hot Queso",
                "Flamin' Queso"],
        minH;
    for (i = 1; i < Infinity; i += 1) {
        blqV[(i - 1)] = document.getElementById("blq" + i);
        if (blqV[(i - 1)] === null) {
            blqV.pop();
            break;
        }
    }
    for (i = 1; i < Infinity; i += 1) {
        miqV[(i - 1)] = document.getElementById("miq" + i);
        if (miqV[(i - 1)] === null) {
            miqV.pop();
            break;
        }
    }
    for (i = 1; i < Infinity; i += 1) {
        meqV[(i - 1)] = document.getElementById("meq" + i);
        if (meqV[(i - 1)] === null) {
            meqV.pop();
            break;
        }
    }
    for (i = 1; i < Infinity; i += 1) {
        hoqV[(i - 1)] = document.getElementById("hoq" + i);
        if (hoqV[(i - 1)] === null) {
            hoqV.pop();
            break;
        }
    }
    for (i = 1; i < Infinity; i += 1) {
        flqV[(i - 1)] = document.getElementById("flq" + i);
        if (flqV[(i - 1)] === null) {
            flqV.pop();
            break;
        }
    }
    //Shortcuts
    function toInt(x) {
        return parseFloat(x.innerHTML);
    }
    function batchCalc(x, y) {
        x[y].innerHTML = Math.ceil(toInt(x[y - 1]) / maEssUse.value);
        if (toInt(x[y]) === 1) {
            x[y + 1].innerHTML = " batch";
        } else {
            x[y + 1].innerHTML = " batches";
        }
    }
    function pumpCalc(x, y) {
        x[y].innerHTML = Math.ceil(toInt(x[y - 1]) /
            pumpList[level.value - 1]);
        if (toInt(x[y]) === 1) {
            x[y + 1].innerHTML = " catch.";
        } else {
            x[y + 1].innerHTML = " catches.";
        }
    }
    function start(x, y) {
        x[0].innerHTML = (nachoreW.value / nachoreL[y]).toFixed(3);
        x[1].innerHTML = Math.ceil(nachoreW.value / nachoreL[y]);
    }
    function bToLeaf(x, y, z) {
        x[y].innerHTML = toInt(x[y - 2]) * 10;
        x[y + 1].innerHTML = x[y].innerHTML;
        x[y + 2].innerHTML = (toInt(x[y]) / spiceLsL[z]).toFixed(3);
        x[y + 3].innerHTML = Math.ceil(toInt(x[y + 2]));
    }
    //Bland Queso calculations
    function blqCalc() {
        start(blqV, "blq");
        blqV[2].innerHTML = blqV[1].innerHTML;
        pumpCalc(blqV, 3);
        blqV[5].innerHTML = toInt(blqV[1]) + toInt(blqV[3]);
        blqV[6].innerHTML = blqV[1].innerHTML;
        best[0] = toInt(blqV[5]);
    }
    //Mild Queso calculations
    function miqCalc() {
        start(miqV, "miq");
        batchCalc(miqV, 2);
        bToLeaf(miqV, 4, "miL");
        miqV[8].innerHTML = toInt(miqV[2]) * 10 + toInt(miqV[7]);
        pumpCalc(miqV, 9);
        miqV[11].innerHTML = toInt(miqV[1]) + toInt(miqV[7]) +
            toInt(miqV[9]);
        miqV[12].innerHTML = miqV[8].innerHTML;
        best[1] = toInt(miqV[11]);
    }
    //Medium Queso calculations
    function meqCalc() {
        start(meqV, "meq");
        batchCalc(meqV, 2);
        bToLeaf(meqV, 4, "meL");
        batchCalc(meqV, 8);
        bToLeaf(meqV, 10, "miL");
        meqV[14].innerHTML = toInt(meqV[2]) * 100 + toInt(meqV[8]) * 10 +
            toInt(meqV[13]);
        pumpCalc(meqV, 15);
        meqV[17].innerHTML = toInt(meqV[1]) + toInt(meqV[7]) +
            toInt(meqV[13]) + toInt(meqV[15]);
        meqV[18].innerHTML = meqV[14].innerHTML;
        best[2] = toInt(meqV[17]);
    }
    //Hot Queso calculations
    function hoqCalc() {
        start(hoqV, "hoq");
        batchCalc(hoqV, 2);
        bToLeaf(hoqV, 4, "hoL");
        batchCalc(hoqV, 8);
        bToLeaf(hoqV, 10, "meL");
        batchCalc(hoqV, 14);
        bToLeaf(hoqV, 16, "miL");
        hoqV[20].innerHTML = toInt(hoqV[2]) * 1000 + toInt(hoqV[8]) * 100 +
            toInt(hoqV[14]) * 10 + toInt(hoqV[19]);
        pumpCalc(hoqV, 21);
        hoqV[23].innerHTML = toInt(hoqV[1]) + toInt(hoqV[7]) +
            toInt(hoqV[13]) + toInt(hoqV[19]) + toInt(hoqV[21]);
        hoqV[24].innerHTML = hoqV[20].innerHTML;
        best[3] = toInt(hoqV[23]);
    }
    //Flamin' Queso calculations
    function flqCalc() {
        start(flqV, "flq");
        batchCalc(flqV, 2);
        bToLeaf(flqV, 4, "flL");
        batchCalc(flqV, 8);
        bToLeaf(flqV, 10, "hoL");
        batchCalc(flqV, 14);
        bToLeaf(flqV, 16, "meL");
        batchCalc(flqV, 20);
        bToLeaf(flqV, 22, "miL");
        flqV[26].innerHTML = toInt(flqV[2]) * 10000 + toInt(flqV[8]) * 1000 +
            toInt(flqV[14]) * 100 + toInt(flqV[20]) * 10 + toInt(flqV[25]);
        pumpCalc(flqV, 27);
        flqV[29].innerHTML = toInt(flqV[1]) + toInt(flqV[7]) +
            toInt(flqV[13]) + toInt(flqV[19]) + toInt(flqV[25]) + toInt(flqV[27]);
        flqV[30].innerHTML = flqV[26].innerHTML;
        best[4] = toInt(flqV[29]);
    }
    //Best cheese evaluation
    function bestCalc() {
        minH = Math.min.apply(null, best);
        document.getElementById("bestH").innerHTML = minH;
        for (i = 0; i < best.length; i += 1) {
            if (best[i] === minH) {
                document.getElementById("bestQ").innerHTML = posH[i];
                break;
            }
        }
    }
    //All calculations
    function calc() {
        blqCalc();
        miqCalc();
        meqCalc();
        hoqCalc();
        flqCalc();
        bestCalc();
    }
    nachoreW.onkeypress = function (e) {
        var key = e.charCode || e.keyCode || 0;
        if (key === 13) {
            e.preventDefault();
        }
    };
    level.onchange = function () {
        document.getElementById("display").innerHTML =
            pumpList[level.value - 1];
        document.getElementById("nachoreNeed").innerHTML =
            nextList[level.value - 1];
        calc();
    };
    nachoreW.onkeyup = function () {
        calc();
    };
    maEssUse.onchange = function () {
        calc();
    };
};
