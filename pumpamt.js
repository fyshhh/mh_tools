"use strict";

window.onload = function () {
    //Declaring variables
    var level = document.getElementById("pump"),
        nachoreW = document.getElementById("nachoreWant"),
        maEssUse = document.getElementById("mEss"),
        qpcUse = document.getElementById("qpc"),
        oesbUse = document.getElementById("oesb"),
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
        blqA = [],
        miqA = [],
        meqA = [],
        hoqA = [],
        flqA = [],
        miqO = [],
        meqO = [],
        hoqO = [],
        flqO = [],
        blqV = [],
        miqV = [],
        meqV = [],
        hoqV = [],
        flqV = [],
        best = [],
        altC = [],
        diff = [],
        diffP = [],
        mEssV = [],
        qpcV = [],
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
    function start(x, y) {
        x[0] = (nachoreW.value / nachoreL[y]).toFixed(3);
        x[1] = Math.ceil(nachoreW.value / nachoreL[y]);
    }
    function batchCalc(x, y) {
        x[y] = Math.ceil(x[y - 1] / maEssUse.value);
        if (x[y] === 1) {
            x[y + 1] = " batch";
        } else {
            x[y + 1] = " batches";
        }
    }
    function batchCalcA(x, y) {
        var altM;
        if (maEssUse.value === "6") {
            altM = 3;
        } else {
            altM = 6;
        }
        x[y] = Math.ceil(x[y - 1] / altM);
        if (x[y] === 1) {
            x[y + 1] = " batch";
        } else {
            x[y + 1] = " batches";
        }
    }
    function pumpCalc(x, y) {
        x[y] = Math.ceil((x[y - 1]) /
            (pumpList[level.value - 1] * (Number(qpcUse.value) +
            Number(oesbUse.value))));
        if (x[y] === 1) {
            x[y + 1] = " catch.";
        } else {
            x[y + 1] = " catches.";
        }
    }
    function bToLeaf(x, y, z) {
        x[y] = x[y - 2] * 10;
        x[y + 1] = x[y];
        x[y + 2] = (x[y] / spiceLsL[z]).toFixed(3);
        x[y + 3] = Math.ceil(x[y + 2]);
    }
    function textAdd(x) {
        if (maEssUse.value === "6" && qpcUse.value === "2" &&
                qpcV[x] === 1) {
            document.getElementById("addText" + x).innerHTML = ", " +
                mEssV[x] + " Magic Essence, " + qpcV[x] +
                " Queso Pump Charm";
        } else if (maEssUse.value === "6" && qpcUse.value === "2" &&
                      (qpcV[x] > 1 || qpcV[x] === 0)) {
            document.getElementById("addText" + x).innerHTML = ", " +
                mEssV[x] + " Magic Essence, " + qpcV[x] +
                " Queso Pump Charms";
        } else if (maEssUse.value === "6") {
            document.getElementById("addText" + x).innerHTML = ", " +
                mEssV[x] + " Magic Essence";
        } else if (qpcUse.value === "2" && qpcV[x] === 1) {
            document.getElementById("addText" + x).innerHTML = ", " +
                qpcV[x] + " Queso Pump Charm";
        } else if (qpcUse.value === "2" && (qpcV[x] > 1 ||
                      qpcV[x] === 0)) {
            document.getElementById("addText" + x).innerHTML = ", " +
                qpcV[x] + " Queso Pump Charms";
        } else {
            document.getElementById("addText" + x).innerHTML = "";
        }
    }
    //Bland Queso calculations
    function blqCalc() {
        start(blqA, "blq");
        blqA[2] = blqA[1];
        pumpCalc(blqA, 3);
        blqA[5] = blqA[1] + blqA[3];
        blqA[6] = blqA[1];
        best[0] = blqA[5];
        for (i = 0; i < blqA.length; i += 1) {
            blqV[i].innerHTML = blqA[i];
        }
        altC[0] = 0;
        diff[0] = 0;
        diffP[0] = (0).toFixed(3);
        mEssV[0] = 0;
        qpcV[0] = blqA[3];
        if (qpcUse.value === "2" && qpcV[0] === 1) {
            document.getElementById("addText0").innerHTML = ", " +
                qpcV[0] + " Queso Pump Charm";
        } else if (qpcUse.value === "2" && (qpcV[0] > 1 ||
                      qpcV[0] === 0)) {
            document.getElementById("addText0").innerHTML = ", " +
                qpcV[0] + " Queso Pump Charms";
        } else {
            document.getElementById("addText0").innerHTML = "";
        }
    }
    //Mild Queso calculations
    function miqCalc() {
        start(miqA, "miq");
        batchCalc(miqA, 2);
        bToLeaf(miqA, 4, "miL");
        miqA[8] = miqA[2] * 10 + miqA[7];
        pumpCalc(miqA, 9);
        miqA[11] = miqA[1] + miqA[7] + miqA[9];
        miqA[12] = miqA[8];
        best[1] = miqA[11];
        start(miqO, "miq");
        batchCalcA(miqO, 2);
        bToLeaf(miqO, 4, "miL");
        miqO[8] = miqO[2] * 10 + miqO[7];
        pumpCalc(miqO, 9);
        miqO[11] = miqO[1] + miqO[7] + miqO[9];
        altC[1] = miqO[11];
        miqA[13] = Math.abs(best[1] - altC[1]);
        diff[1] = miqA[13];
        if (best[1] > altC[1]) {
            miqA[14] = (miqA[13] * 100 / best[1]).toFixed(3);
        } else if (best[1] < altC[1]) {
            miqA[14] = (miqA[13] * 100 / altC[1]).toFixed(3);
        } else {
            miqA[14] = "0.000";
        }
        diffP[1] = miqA[14];
        for (i = 0; i < miqA.length; i += 1) {
            miqV[i].innerHTML = miqA[i];
        }
        mEssV[1] = miqA[2] * 3;
        qpcV[1] = miqA[9];
        textAdd(1);
    }
    //Medium Queso calculations
    function meqCalc() {
        start(meqA, "meq");
        batchCalc(meqA, 2);
        bToLeaf(meqA, 4, "meL");
        batchCalc(meqA, 8);
        bToLeaf(meqA, 10, "miL");
        meqA[14] = meqA[2] * 100 + meqA[8] * 10 + meqA[13];
        pumpCalc(meqA, 15);
        meqA[17] = meqA[1] + meqA[7] + meqA[13] + meqA[15];
        meqA[18] = meqA[14];
        best[2] = meqA[17];
        start(meqO, "meq");
        batchCalcA(meqO, 2);
        bToLeaf(meqO, 4, "meL");
        batchCalcA(meqO, 8);
        bToLeaf(meqO, 10, "miL");
        meqO[14] = meqO[2] * 100 + meqO[8] * 10 + meqO[13];
        pumpCalc(meqO, 15);
        meqO[17] = meqO[1] + meqO[7] + meqO[13] + meqO[15];
        altC[2] = meqO[17];
        meqA[19] = Math.abs(best[2] - altC[2]);
        diff[2] = meqA[19];
        if (best[2] > altC[2]) {
            meqA[20] = (meqA[19] * 100 / best[2]).toFixed(3);
        } else if (best[2] < altC[2]) {
            meqA[20] = (meqA[19] * 100 / altC[2]).toFixed(3);
        } else {
            meqA[20] = "0.000";
        }
        diffP[2] = meqA[20];
        for (i = 0; i < meqA.length; i += 1) {
            meqV[i].innerHTML = meqA[i];
        }
        mEssV[2] = (meqA[2] + meqA[8]) * 3;
        qpcV[2] = meqA[15];
        textAdd(2);
    }
    //Hot Queso calculations
    function hoqCalc() {
        start(hoqA, "hoq");
        batchCalc(hoqA, 2);
        bToLeaf(hoqA, 4, "hoL");
        batchCalc(hoqA, 8);
        bToLeaf(hoqA, 10, "meL");
        batchCalc(hoqA, 14);
        bToLeaf(hoqA, 16, "miL");
        hoqA[20] = hoqA[2] * 1000 + hoqA[8] * 100 +
            hoqA[14] * 10 + hoqA[19];
        pumpCalc(hoqA, 21);
        hoqA[23] = hoqA[1] + hoqA[7] + hoqA[13] +
            hoqA[19] + hoqA[21];
        hoqA[24] = hoqA[20];
        best[3] = hoqA[23];
        start(hoqO, "hoq");
        batchCalcA(hoqO, 2);
        bToLeaf(hoqO, 4, "hoL");
        batchCalcA(hoqO, 8);
        bToLeaf(hoqO, 10, "meL");
        batchCalcA(hoqO, 14);
        bToLeaf(hoqO, 16, "miL");
        hoqO[20] = hoqO[2] * 1000 + hoqO[8] * 100 +
            hoqO[14] * 10 + hoqO[19];
        pumpCalc(hoqO, 21);
        hoqO[23] = hoqO[1] + hoqO[7] + hoqO[13] +
            hoqO[19] + hoqO[21];
        altC[3] = hoqO[23];
        hoqA[25] = Math.abs(best[3] - altC[3]);
        diff[3] = hoqA[25];
        if (best[3] > altC[3]) {
            hoqA[26] = (hoqA[25] * 100 / best[3]).toFixed(3);
        } else if (best[3] < altC[3]) {
            hoqA[26] = (hoqA[25] * 100 / altC[3]).toFixed(3);
        } else {
            hoqA[26] = "0.000";
        }
        diffP[3] = hoqA[26];
        for (i = 0; i < hoqA.length; i += 1) {
            hoqV[i].innerHTML = hoqA[i];
        }
        mEssV[3] = (hoqA[2] + hoqA[8] + hoqA[14]) * 3;
        qpcV[3] = hoqA[21];
        textAdd(3);
    }
    //Flamin' Queso calculations
    function flqCalc() {
        start(flqA, "flq");
        batchCalc(flqA, 2);
        bToLeaf(flqA, 4, "flL");
        batchCalc(flqA, 8);
        bToLeaf(flqA, 10, "hoL");
        batchCalc(flqA, 14);
        bToLeaf(flqA, 16, "meL");
        batchCalc(flqA, 20);
        bToLeaf(flqA, 22, "miL");
        flqA[26] = flqA[2] * 10000 + flqA[8] * 1000 +
            flqA[14] * 100 + flqA[20] * 10 + flqA[25];
        pumpCalc(flqA, 27);
        flqA[29] = flqA[1] + flqA[7] + flqA[13] +
            flqA[19] + flqA[25] + flqA[27];
        flqA[30] = flqA[26];
        best[4] = flqA[29];
        start(flqO, "flq");
        batchCalcA(flqO, 2);
        bToLeaf(flqO, 4, "flL");
        batchCalcA(flqO, 8);
        bToLeaf(flqO, 10, "hoL");
        batchCalcA(flqO, 14);
        bToLeaf(flqO, 16, "meL");
        batchCalcA(flqO, 20);
        bToLeaf(flqO, 22, "miL");
        flqO[26] = flqO[2] * 10000 + flqO[8] * 1000 +
            flqO[14] * 100 + flqO[20] * 10 + flqO[25];
        pumpCalc(flqO, 27);
        flqO[29] = flqO[1] + flqO[7] + flqO[13] +
            flqO[19] + flqO[25] + flqO[27];
        altC[4] = flqO[29];
        flqA[31] = Math.abs(best[4] - altC[4]);
        diff[4] = flqA[31];
        if (best[4] > altC[4]) {
            flqA[32] = (flqA[31] * 100 / best[4]).toFixed(3);
        } else if (best[4] < altC[4]) {
            flqA[32] = (flqA[31] * 100 / altC[4]).toFixed(3);
        } else {
            flqA[32] = "0.000";
        }
        diffP[4] = flqA[32];
        for (i = 0; i < flqA.length; i += 1) {
            flqV[i].innerHTML = flqA[i];
        }
        mEssV[4] = (flqA[2] + flqA[8] + flqA[14] + flqA[20]) * 3;
        qpcV[4] = flqA[27];
        textAdd(4);
    }
    //Best cheese evaluation
    function bestCalc() {
        minH = Math.min.apply(null, best);
        document.getElementById("bestH").innerHTML = minH;
        for (i = 0; i < best.length; i += 1) {
            if (best[i] === minH) {
                document.getElementById("bestQ").innerHTML = posH[i];
                document.getElementById("saveN").innerHTML = diff[i];
                document.getElementById("saveP").innerHTML = diffP[i];
                if (maEssUse.value === "6" && qpcUse.value === "2" &&
                        qpcV[i] === 1) {
                    document.getElementById("bestM").innerHTML = ", " +
                        mEssV[i] + " Magic Essence and " + qpcV[i] +
                        " Queso Pump Charm";
                } else if (maEssUse.value === "6" && qpcUse.value === "2" &&
                              (qpcV[i] > 1 || qpcV[1] === 0)) {
                    document.getElementById("bestM").innerHTML = ", " +
                        mEssV[i] + " Magic Essence and " + qpcV[i] +
                        " Queso Pump Charms";
                } else if (maEssUse.value === "6") {
                    document.getElementById("bestM").innerHTML = " and " +
                        mEssV[i] + " Magic Essence";
                } else if (qpcUse.value === "2" && qpcV[i] === 1) {
                    document.getElementById("bestM").innerHTML = " and " +
                        qpcV[i] + " Queso Pump Charm";
                } else if (qpcUse.value === "2" && (qpcV[i] > 1 ||
                              qpcV[1] === 0)) {
                    document.getElementById("bestM").innerHTML = " and " +
                        qpcV[i] + " Queso Pump Charms";
                } else {
                    document.getElementById("bestM").innerHTML = "";
                }
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
        if (qpcUse.value === "2" && oesbUse.value === "0.5") {
            document.getElementById("addP").innerHTML =
                ", boosted to " + pumpList[level.value - 1] * 2.5 +
                " with my Queso Pump Charms and" +
                " Overgrown Ember Stone Base";
        } else if (qpcUse.value === "2") {
            document.getElementById("addP").innerHTML =
                ", boosted to " + pumpList[level.value - 1] * 2 +
                " with my Queso Pump Charms";
        } else if (oesbUse.value === "0.5") {
            document.getElementById("addP").innerHTML =
                ", boosted to " + pumpList[level.value - 1] * 1.5 +
                " with my Overgrown Ember Stone Base";
        } else {
            document.getElementById("addP").innerHTML = "";
        }

    };
    nachoreW.onkeyup = function () {
        calc();
    };
    maEssUse.onchange = function () {
        var messA = document.getElementsByClassName("messG");
        calc();
        if (maEssUse.value === "6") {
            for (i = 0; i < messA.length; i += 1) {
                messA[i].innerHTML = "has";
            }
        } else {
            for (i = 0; i < messA.length; i += 1) {
                messA[i].innerHTML = "would have";
            }
        }
    };
    oesbUse.onchange = function () {
        calc();
        if (qpcUse.value === "2" && oesbUse.value === "0.5") {
            document.getElementById("addP").innerHTML =
                ", boosted to " + pumpList[level.value - 1] * 2.5 +
                " with Queso Pump Charms and the" +
                " Overgrown Ember Stone Base";
        } else if (qpcUse.value === "2") {
            document.getElementById("addP").innerHTML =
                ", boosted to " + pumpList[level.value - 1] * 2 +
                " with Queso Pump Charms";
        } else if (oesbUse.value === "0.5") {
            document.getElementById("addP").innerHTML =
                ", boosted to " + pumpList[level.value - 1] * 1.5 +
                " with the Overgrown Ember Stone Base";
        } else {
            document.getElementById("addP").innerHTML = "";
        }
    };
    qpcUse.onchange = function () {
        calc();
        if (qpcUse.value === "2" && oesbUse.value === "0.5") {
            document.getElementById("addP").innerHTML =
                ", boosted to " + pumpList[level.value - 1] * 2.5 +
                " with my Queso Pump Charms and " +
                " Overgrown Ember Stone Base";
        } else if (qpcUse.value === "2") {
            document.getElementById("addP").innerHTML =
                ", boosted to " + pumpList[level.value - 1] * 2 +
                " with my Queso Pump Charms";
        } else if (oesbUse.value === "0.5") {
            document.getElementById("addP").innerHTML =
                ", boosted to " + pumpList[level.value - 1] * 1.5 +
                " with my Overgrown Ember Stone Base";
        } else {
            document.getElementById("addP").innerHTML = "";
        }
    };
};
