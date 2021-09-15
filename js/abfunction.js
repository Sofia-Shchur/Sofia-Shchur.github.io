var toRightVar = 0;
var toDownVar = 0;

$(function () {
    window.backspaceActive = 0;
    document.getElementById('message').addEventListener('keydown', (event) => {
        if (event.key == 'Backspace') {
            window.backspaceActive = 1;
            console.log('level 1 backspace');
            $(document).unbind('keydown').bind('keydown', function (e) {
                if (e.key == 'Backspace') {
                    delLastSymbol();
                }
            });
        } else {
            window.backspaceActive = 0;
        }
    });

    document.getElementById('message').addEventListener('keypress', (event) => {
        var e = document.getElementById("sizeLetter");
        var lineWidth = e.options[e.selectedIndex].text;
        console.log('listener keypress', event.key);
        if (event.key == 'Enter') {
            $(document).unbind('keypress').bind('keypress', function (e) {
                writePhrase(' ', 'ab', lineWidth);
            });
        } else {
            $(document).unbind('keypress').bind('keypress', function (e) {
                writePhrase(event.key, 'ab', lineWidth);
                console.log(`key=${event.key},code=${event.code}`);
            });
        }
    });
});

let level = 1;
let positionLeft = 0;
var chbox = document.getElementById('stripe');
var newSizeRun = false;

function delLastSymbol() {
    var text = $("#message").val();
    var e = document.getElementById("sizeLetter");
    var lineWidth = e.options[e.selectedIndex].text
    $("#ab").html("");
    var newText = text.substring(0, text.length - 1);
    console.log("newText", newText);
    writePhrase(newText, 'ab', lineWidth);
    if (chbox.checked) {
        $('.checkedImage').trigger('click');
    }
}

function newSizeAb() {
    newSizeRun = true;
    var text = $("#message").val();
    var e = document.getElementById("sizeLetter");
    var lineWidth = e.options[e.selectedIndex].text;
    clearAb();
    writePhrase(text, 'ab', lineWidth);
    $("#message").val(text);
    if (chbox.checked) {
        $('.checkedImage').trigger('click');
    }
    toRightVar = 0;
    toDownVar = 0;
    $('#toRightVar').val(toRightVar);
    $('#toDownVar').val(toDownVar);
    console.log("to right equal zero")
}

function clearAb() {
    $("#ab").html("");
    $("#message").val("");
}

function toLeft(curDiv) {
    var arrLetter = [];
    $("#" + curDiv + " .letterDiv").each(function (index, value) {
        var position = $(this).position();
        arrLetter.push(position.left);
    });

    $("#" + curDiv + " .letterDiv").each(function (index, value) {
        $(this).css({left: arrLetter[index] + -20, position: 'absolute'});
    });
    toRightVar--;
    $('#toRightVar').val(toRightVar);
}

function toRight(curDiv) {
    var arrLetter = [];
    $("#" + curDiv + " .letterDiv").each(function (index, value) {
        var position = $(this).position();
        arrLetter.push(position.left);
    });
    /*
            var minValue = Math.min.apply(null, arrLetter);
            var maxValue = Math.max.apply(null, arrLetter);
            console.log("minValue", minValue);
            console.log("maxValue", maxValue);
            var difValue = maxValue - minValue;
            console.log("difValue", difValue);
            var leftOffset = (1000 - difValue) / 2 - 20 * 4 / 2;
    */
    $("#" + curDiv + " .letterDiv").each(function (index, value) {
        $(this).css({left: arrLetter[index] + 20, position: 'absolute'});
    });
    toRightVar++;
    $('#toRightVar').val(toRightVar);
}

function toUp(curDiv) {
    var arrLetter = [];
    var arrUp = [];
    $("#" + curDiv + " .letterDiv").each(function (index, value) {
        var position = $(this).position();
        arrLetter.push(position.left);
    });
    $("#" + curDiv + " .letterDiv").each(function (index, value) {
        $(this).css({left: arrLetter[index], position: 'absolute'});
    });
    $("#" + curDiv + " .letterDiv").each(function (index, value) {
        var position = $(this).position();
        console.log("position.top ", position.top);
        arrUp.push(position.top);
    });
    $("#" + curDiv + " .letterDiv").each(function (index, value) {
        $(this).css({top: arrUp[index] - 20, position: 'absolute'});
    });
    toDownVar--;
    $('#toDownVar').val(toDownVar);
}

function toDown(curDiv) {
    var arrDownTop = [];
    var arrDown = [];
    var testDownTop = [];
    $("#" + curDiv + " .letterDiv").each(function (index, value) {
        var position = $(this).position();
        arrDown.push(position.left);
    });
    $("#" + curDiv + " .letterDiv").each(function (index, value) {
        $(this).css({left: arrDown[index], position: 'absolute'});
    });
    $("#" + curDiv + " .letterDiv").each(function (index, value) {
        var position = $(this).position();
        var positionTest = $(this)[0].getBoundingClientRect();
        arrDownTop.push(position.top);
        testDownTop.push(positionTest.top);
    });
    $("#" + curDiv + " .letterDiv").each(function (index, value) {
        $(this).css({top: arrDownTop[index] + 20, position: 'absolute'});
    });
    toDownVar++;
    $('#toDownVar').val(toDownVar);
}

function writePhrase(str, divId, lineWidth) {
    str = str.toLowerCase();
    //https://unicode-table.com/en/
    str = str.replace(/heartsymbol/g, 'à');
    str = str.replace(/smilesymbol/g, 'á');
    if (str == "[keyspace]") {
        console.log('key SPACE!!');
        writeLetter(spaceV, divId, lineWidth);
        writeLetter(spaceV, divId, lineWidth);
        $('#message').val($('#message').val() + '  ');
    } else {
        var wordArr = str.split('');
        wordArr.forEach(function (e) {
            switch (e) {
                case "à":
                    writeLetter(heartSymbol, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    $('#message').val($('#message').val() + 'heartsymbol');
                    break;
                case "á":
                    writeLetter(smileSymbol, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    $('#message').val($('#message').val() + 'smilesymbol');
                    break;
                case "а":
                    writeLetter(letterA, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "б":
                    writeLetter(letterB, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "в":
                    writeLetter(letterV, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "г":
                    writeLetter(letterG, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "д":
                    writeLetter(letterD, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "е":
                    writeLetter(letterE, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "ё":
                    writeLetter(letterYo, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "ж":
                    writeLetter(letterZh, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "з":
                    writeLetter(letterZ, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "и":
                    writeLetter(letterI, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "й":
                    writeLetter(letterIK, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "к":
                    writeLetter(letterK, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "л":
                    writeLetter(letterL, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "м":
                    writeLetter(letterM, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "н":
                    writeLetter(letterN, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "о":
                    writeLetter(letterO, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "п":
                    writeLetter(letterP, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "р":
                    writeLetter(letterR, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "с":
                    writeLetter(letterS, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "т":
                    writeLetter(letterT, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "у":
                    writeLetter(letterY, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "ф":
                    writeLetter(letterF, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "х":
                    writeLetter(letterH, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "ц":
                    writeLetter(letterTz, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "ч":
                    writeLetter(letterCh, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "ш":
                    writeLetter(letterSh, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "щ":
                    writeLetter(letterShch, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "ъ":
                    writeLetter(letterTZnak, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "ы":
                    writeLetter(letterYi, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "ь":
                    writeLetter(letterMZnak, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "э":
                    writeLetter(letterYe, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "ю":
                    writeLetter(letterU, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "я":
                    writeLetter(letterYa, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "!":
                    writeLetter(excMark, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "?":
                    writeLetter(queMark, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case ".":
                    writeLetter(dot, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case ",":
                    writeLetter(comma, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "'":
                    writeLetter(quote, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "`":
                    writeLetter(quote, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case ":":
                    writeLetter(colon, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "-":
                    writeLetter(dash, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "a":
                    writeLetter(engA, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "b":
                    writeLetter(engB, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "c":
                    writeLetter(engC, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "d":
                    writeLetter(engD, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "e":
                    writeLetter(engE, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "f":
                    writeLetter(engF, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "g":
                    writeLetter(engG, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "h":
                    writeLetter(engH, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "i":
                    writeLetter(engI, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "j":
                    writeLetter(engJ, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "k":
                    writeLetter(engK, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "l":
                    writeLetter(engL, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "m":
                    writeLetter(engM, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "n":
                    writeLetter(engN, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "o":
                    writeLetter(engO, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "p":
                    writeLetter(engP, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "q":
                    writeLetter(engQ, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "r":
                    writeLetter(engR, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "s":
                    writeLetter(engS, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "t":
                    writeLetter(engT, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "u":
                    writeLetter(engU, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "v":
                    writeLetter(engV, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "w":
                    writeLetter(engW, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "x":
                    writeLetter(engX, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "y":
                    writeLetter(engY, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "z":
                    writeLetter(engZ, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case '"':
                    writeLetter(doubleQuote, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "@":
                    console.log('replaced @');
                    writeLetter(at, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "1":
                    writeLetter(numberOne, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "2":
                    writeLetter(numberTwo, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "3":
                    writeLetter(numberThree, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "4":
                    writeLetter(numberFour, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "5":
                    writeLetter(numberFive, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "6":
                    writeLetter(numberSix, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "7":
                    writeLetter(numberSeven, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "8":
                    writeLetter(numberEight, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "9":
                    writeLetter(numberNine, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "0":
                    writeLetter(numberZero, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case ">":
                    writeLetter(moreSymbol, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "<":
                    writeLetter(lessSymbol, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                /* case "/":
                     writeLetter(slash, divId, lineWidth);
                     writeLetter(spaceV, divId, lineWidth);
                     break;*/
                case "/":
                    writeLetter(backSlash, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "#":
                    writeLetter(diez, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "+":
                    writeLetter(plus, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "=":
                    writeLetter(equal, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "_":
                    writeLetter(underscore, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "$":
                    writeLetter(dollar, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "^":
                    writeLetter(degree, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "%":
                    writeLetter(percent, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "*":
                    writeLetter(asterisk, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "&":
                    writeLetter(ampersand, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "(":
                    writeLetter(parenthesisLeft, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case ")":
                    writeLetter(parenthesisRight, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                case "|":
                    writeLetter(separator, divId, lineWidth);
                    writeLetter(spaceV, divId, lineWidth);
                    break;
                default:
                    writeLetter(spaceV, divId, lineWidth);
            }
        })
    }
    if ($("#filter").val() != "") {
        console.log("filter", $("#filter").val());
        var optionValue = $("#filter").val();
        console.log("optionValue --->", optionValue);
        setTimeout(() => {
            window.applyFilter(optionValue, divId);
        }, 100)
    } else {
        console.log("filter not found", $("#filter").val());
        if (chbox.checked) {
            $('.checkedImage').trigger('click');
        }
    }
}

var $_GET = [];
window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (a, name, value) {
    $_GET[name] = value;
});

if (typeof $_GET['color'] !== 'undefined') {
    pickerColor = $_GET['color'];
    if (pickerColor.indexOf('%23') > -1) {
        pickerColor = pickerColor.replace(/%23/g, '#')
    }
    $('#color').val(pickerColor);
}

function writeLetter(arr, divId, lineWidth) {
    pickerColor = $('#color').val();
    let texture = '';
    if (!lineWidth) {
        if (chbox.checked) {
            texture = $(".checkedImage").attr('src');
        }
        var e = document.getElementById("sizeLetter");
        var lineWidth = e.options[e.selectedIndex].text;
    }
    const width = arr[0].length * lineWidth;
    $("#" + divId + " .line").css({"width": lineWidth + "px", "height": lineWidth + "px"});
    const randNum = Math.floor(Math.random() * 1000000000);

    function newLine(level, randNum) {
        $('#a' + randNum).addClass('level_' + level);
        $(document).keypress(function (e) {
            if (e.which == 13) {
                writePhrase("\n", ab, lineWidth);
            }
        });
    }

    // unique space for concrete letter
    $("#" + divId).append('<div class="letterDiv" id="a' + randNum + '" style="width:' + width + 'px; border: 0 solid white; height: 204; float: left"></div>');
    var position = $('#a' + randNum).position();
    if (position.left < positionLeft && (window.backspaceActive == 0 && newSizeRun !== true)) {
        alertPRO();
    }

    function alertPRO() {
        if ($_GET['message']) {
            return;
        } else {
            alert('Ввод большого количества текста доступен в PRO-версии!');
            setTimeout(function () {
                $(".letterDiv").hide("explode", {pieces: 9}, 1000);
                clearAb();
                positionLeft = 0;
            }, 1000);
        }
        console.log("!!!! new line !!!!!");
    }

    positionLeft = position.left;

    $.each(arr, function (index, value) {
        $.each(value, function (i, v) {
            if (v.length === 4) {
                $("#a" + randNum).append('<div onclick="addDruggable($(this).parent().attr(\'id\'))" class="line" style="background-image: url(' + texture + '); background-size: 100% 100%; background-color: ' + pickerColor + ';   width: ' + lineWidth + 'px; height: ' + lineWidth + 'px;border-radius:' + style(v) + '">&nbsp;</div>')
            } else {
                $("#a" + randNum).append('<div style="width:' + lineWidth + 'px; height: ' + lineWidth + 'px; opacity: 0; float: left;">&nbsp;</div>')
            }
        });
        //}
    });
}

function addDruggable(divId) {
    $('#' + divId).draggable();
}

function showABC() {
    if (typeof $_GET['message'] !== 'undefined') {
        $_GET['message'] = decodeURI($_GET['message']);
        if ($_GET['message'].indexOf('+')) {
            $_GET['message'] = $_GET['message'].replace(/\+/g, ' ');
        }
        document.getElementById("myABC").style.display = "block";
        document.getElementById("createCard").style.display = "none";

        if ($_GET['message'].indexOf('%40') > -1) {
            console.log('at found');
            $_GET['message'] = $_GET['message'].replace(/%40/g, 'Ф');
        }
    }
}

function hideABC() {
    document.getElementById("myABC").style.display = "none";
    document.getElementById("createCard").style.display = "block";
}

function hideH1() {
    $("#greetHeader").removeClass("mb-1").addClass("hide");
    $("#miniHeader").removeClass("mb-5").addClass("hide");
    $("#createCard").hide()
}

if (typeof $_GET['bgr'] !== 'undefined') {
    $(function () {
        if (bgPic[$_GET['bgr']]) {
            console.log('bgr', bgPic[$_GET['bgr']]);
            $("#myABC").css({"background-size": "80%", "background-image": "url(" + bgPic[$_GET['bgr']] + ")"});
        } else {
            console.log('bgr not found');
        }
        if (bgPic2[$_GET['bgr']]) {
            console.log('bgr', bgPic2[$_GET['bgr']]);
            $("#myABC").css({"background-size": "80%", "background-image": "url(" + bgPic2[$_GET['bgr']] + ")"});
        } else {
            console.log('bgr not found');
        }
        if (typeof $_GET['textureBG'] !== 'undefined') {
            if ($_GET['textureBG'] == "on") {
                $("#myABC .line").css({"background-image": "url(" + bgPic[$_GET['bgr']] + ")"});
                console.log('letterBG checked');
            } else {
                console.log('letterBG not checked');
            }
        }
        if (typeof $_GET['stripe'] !== 'undefined') {
            if ($_GET['stripe'] && $_GET['txtBgr']) {
                $("#myABC .line").css({"background-image": "url(" + bgrArr[$_GET['txtBgr']] + ")"});
            }
        }
        if (typeof $_GET['filter'] !== 'undefined') {
            window.applyFilter($_GET['filter'], 'myABC');
        }
    });
}

if (typeof $_GET['message'] !== 'undefined') {
    showABC();
    hideH1();
    if ($_GET['message'].indexOf('%0D%0A') > -1) {
        $_GET['message'] = $_GET['message'].replace(/%0D%0A/g, '&nbsp; &nbsp; &nbsp;');
    }
    /* if ($_GET['message'].indexOf('heartsymbol') > -1 || $_GET['message'].indexOf('smilesymbol') > -1) {

         var symbolArr = $_GET['message'].split('symbol');
         symbolArr.pop();
         console.log(symbolArr)
         console.log(symbolArr.length)
         symbolArr.forEach(element => {
             console.log(element)
             writePhrase(element + 'symbol', 'myABC', $_GET['sizeLetter']);
         })
         $_GET['message'] = $_GET['message'].replace(/heartsymbol/g, '');
         $_GET['message'] = $_GET['message'].replace(/smilesymbol/g, '');
     }*/
    // $_GET['message'] = $_GET['message'].replace(/symbol/g, '');
    writePhrase($_GET['message'], 'myABC', $_GET['sizeLetter']);
    var i;
    if ($_GET['toRightVar']) {
        console.log("toRightVar -> ", toRightVar);
        i = 0;
        while (i < $_GET['toRightVar']) {
            toRight("myABC");
            i++;
        }
        toRightVar = 0;
        console.log(toRightVar, 'found');
    }
    if ($_GET['toDownVar']) {
        i = 0;
        while (i < $_GET['toDownVar']) {
            toDown("myABC");
            i++;
        }
        toDownVar = 0;
    }
} else {
    hideABC();
}

function style(v) {
    var str = '';
    v.forEach(element => {
        if (element === 1) {
            str += '25px ';
        } else {
            str += '0 ';
        }
    });
    return str;
}

var fractalBlueArr = ['https://sofia-shchur.github.io/pictures/filters/fractals/blue1.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/blue2.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/blue3.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/blue4.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/blue5.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/blue6.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/blue7.jpg',
];

// todo: create new Arrays (fractals, woods, stripes) sort by color
// todo: create new Filters (or fix existing) using new Arrays (fractals, woods, stripes)

var fractalRedArr = ['https://sofia-shchur.github.io/pictures/filters/fractals/red1.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/red2.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/red3.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/red4.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/red5.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/red6.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/red7.jpg',
];

var fractalBlackArr = ['https://sofia-shchur.github.io/pictures/filters/fractals/black1.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/black2.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/black3.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/black4.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/black5.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/black6.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/black7.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/black8.jpg',
];

var fractalWhiteArr = ['https://sofia-shchur.github.io/pictures/filters/fractals/white1.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/white2.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/white3.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/white4.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/white5.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/white6.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/white7.jpg',
];

var fractalYellowArr = ['https://sofia-shchur.github.io/pictures/filters/fractals/yellow1.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/yellow2.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/yellow3.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/yellow4.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/yellow5.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/yellow6.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/yellow7.jpg',
];

var fractalGreenArr = ['https://sofia-shchur.github.io/pictures/filters/fractals/green1.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/green2.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/green3.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/green4.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/green5.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/green6.jpg',
    'https://sofia-shchur.github.io/pictures/filters/fractals/green7.jpg',
];

var snowflakesArr = ['https://sofia-shchur.github.io/pictures/filters/snowf1.jpg',
    'https://sofia-shchur.github.io/pictures/filters/snowf2.jpg',
    'https://sofia-shchur.github.io/pictures/filters/snowf3.jpeg',
    'https://sofia-shchur.github.io/pictures/filters/snowf4.jpg',
    'https://sofia-shchur.github.io/pictures/filters/snowf5.jpg',
    'https://sofia-shchur.github.io/pictures/filters/snowf6.jpg',
    'https://sofia-shchur.github.io/pictures/filters/snowf7.jpg',
];

var blueWoodArr = ['https://sofia-shchur.github.io/pictures/filters/bluewood1.jpg',
    'https://sofia-shchur.github.io/pictures/filters/bluewood2.jpg',
    'https://sofia-shchur.github.io/pictures/filters/bluewood3.jpg',
    'https://sofia-shchur.github.io/pictures/filters/bluewood4.jpg',
    'https://sofia-shchur.github.io/pictures/filters/bluewood5.jpg',
    'https://sofia-shchur.github.io/pictures/filters/bluewood6.jpg',
    'https://sofia-shchur.github.io/pictures/filters/bluewood7.jpg',
];

var pinkWoodArr = ['https://sofia-shchur.github.io/pictures/filters/pinkwood1.jpg',
    'https://sofia-shchur.github.io/pictures/filters/pinkwood2.jpg',
    'https://sofia-shchur.github.io/pictures/filters/pinkwood3.jpg',
    'https://sofia-shchur.github.io/pictures/filters/pinkwood4.jpg',
    'https://sofia-shchur.github.io/pictures/filters/pinkwood5.jpg',
    'https://sofia-shchur.github.io/pictures/filters/pinkwood6.jpg',
    'https://sofia-shchur.github.io/pictures/filters/pinkwood7.jpg',
];

var greenWoodArr = ['https://sofia-shchur.github.io/pictures/filters/greenwood1.jpg',
    'https://sofia-shchur.github.io/pictures/filters/greenwood2.jpg',
    'https://sofia-shchur.github.io/pictures/filters/greenwood3.jpg',
    'https://sofia-shchur.github.io/pictures/filters/greenwood4.jpg',
    'https://sofia-shchur.github.io/pictures/filters/greenwood5.jpg',
    'https://sofia-shchur.github.io/pictures/filters/greenwood6.jpg',
    'https://sofia-shchur.github.io/pictures/filters/greenwood7.jpg',
];

var bgPic = ['http://sofia-shchur.github.io/pictures/backgrounds/cosmo.jpg',
    'http://sofia-shchur.github.io/pictures/backgrounds/grass.jpg',
    'http://sofia-shchur.github.io/pictures/backgrounds/waterBG.jpg',
    'http://sofia-shchur.github.io/pictures/backgrounds/woods.jpg',
    'http://sofia-shchur.github.io/pictures/backgrounds/snow.jpg',

];

var bgPic2 = ['http://sofia-shchur.github.io/pictures/backgrounds/heart_small.png',
    'http://sofia-shchur.github.io/pictures/backgrounds/flowers_pink.jpg',
    'http://sofia-shchur.github.io/pictures/backgrounds/strawberry.jpg',
];

var bgrArr = [ 'http://sofia-shchur.github.io/pictures/texture/flower.png',
    'http://sofia-shchur.github.io/pictures/texture/fish.png',
    'http://sofia-shchur.github.io/pictures/texture/leaf.png',
    'http://sofia-shchur.github.io/pictures/texture/star.png',
    'http://sofia-shchur.github.io/pictures/texture/snowflake.gif',
    'http://sofia-shchur.github.io/pictures/texture/heart_mini.jpg',
    'http://sofia-shchur.github.io/pictures/texture/butterfly.jpg',
    'http://sofia-shchur.github.io/pictures/texture/water.jpg',
    'http://sofia-shchur.github.io/pictures/texture/kitten.jpg',
];

function messageEmptyCheck() {
    //return;
    //fix messageEmptyCheck() for all situations;
    /*console.log("message " + $("#message").val(), $("#message").val().length);
    setTimeout(()=>{
        if (!$("#message").val().length) {
            $("#message").val('text');
            $("#ab").html('');
            writePhrase('text', 'ab', 20)
        }
    }, 500)*/
}

var array3 = bgPic.concat(bgrArr);

function validateMessage(formElement) {
    if ($('#message').val()) {
        $("#sendCardForm").submit();
    } else {
        alert("Write Your Postcard Message!");
        return false;
    }
}

function changeBgr(src, bgrId) {
    $("#ab").css({"background-size": "100%", "background-image": "url(" + src + ")"});
    var num = bgrId.replace("bgr_", "");
    $('#bgr').val(num);
}

//<i id="colorText"> Color: </i> <input type="color" name="color" id="color" value="#757575"/>


function mixLetterZebraFilter(curDiv) {
    let c = 0
    let idDiv;
    mixPicturesFractalsFilter(curDiv);
    $("#" + curDiv + " .letterDiv").each((index, val) => {

        var checkSpace = c % 4;
        if (!checkSpace) {
            idDiv = $(val).attr('id');
            $("#" + idDiv + " .line").addClass("zebra");
            $("#" + idDiv + " .zebra").css({"background-image": "url(" + array3[1] + ")"});
        }

        if ($("#" + idDiv).children().hasClass("line")) {
            c++;
        }
    })
    console.log("Im Zebra(")
}

function mixBgFilter(curDiv) {
    let c = 0;
    $("#" + curDiv + " .letterDiv").each((index, val) => {
        $(val).css({"background-image": "url(" + array3[c] + ")"});
        c++;
    })
}

function zebraInsideZebraFilter(curDiv) {
    var picFirst = array3[0];
    var picSecond = array3[1];
    var curTop = 0;
    var c = 0;
    var position = 0;
    mixLetterZebraFilter(curDiv);
    $("#" + curDiv + " .zebra").each((index, val) => {
        position = $(val).position();
        if (position.top > curTop) {
            c++;
        }
        if (position.top < curTop) {
            c = 1;
        }
        curTop = position.top;
        $(val).css({"background-image": "url(" + picFirst + ")"});
        if (c % 2) {
            $(val).css({"background-image": "url(" + picSecond + ")"});
            //$(val).hide("explode", {pieces: 9}, 1000);
        }
    })
}

/*class Book {
    constructor(title, pages, price) {
        this.title = title;
        this.pages = pages;
        this.price = price;
    }

}*/

function mixPicturesVersion1Filter(curDiv) {
    //remove bgr
    $("#" + curDiv + " .letterDiv").each((index, val) => {
        $(val).css({"background-image": ""});
    })
    console.log("first filter");
    var c = 0;
    $("#" + curDiv + " .line").each((index, val) => {
        if (c > bgrArr.length - 1) {
            c = 0;
        }
        $(val).css({"background-image": "url(" + bgrArr[c] + ")"});
        c++;
    })
}

function mixPicturesVersion2Filter(curDiv) {
    console.log($("#" + curDiv + " .line"));
    var c = 0;
    $("#" + curDiv + " .line").each((index, val) => {
        if (c > bgPic.length - 1) {
            c = 0;
        }
        $(val).css({"background-image": "url(" + bgPic[c] + ")"});
        c++;
    })
}

function mixPicturesVersion3Filter(curDiv) {
    var c = 0;
    $("#" + curDiv + " .line").each((index, val) => {
        if (c > array3.length - 1) {
            c = 0;
        }
        /** Example **
         c2 = c;
         if (c % 2) {
                c2--;
            }
         $(val).css({"background-image": "url(" + array3[c2] + ")"});
         */
        $(val).css({"background-image": "url(" + array3[c] + ")"});
        c++;
    })
}

function mixPicturesFractalsFilter(curDiv) {
    //remove bgr
    $("#" + curDiv + " .letterDiv").each((index, val) => {
        $(val).css({"background-image": ""});
    })
    var c = 0;
    $("#" + curDiv + " .line").each((index, val) => {
        if (c > fractalWhiteArr.length - 1) {
            c = 0;
        }
        $(val).css({"background-image": "url(" + fractalWhiteArr[c] + ")"});
        c++;
    })

}

function fractalBlueArrayFilter(curDiv) {
    //remove bgr
    $("#" + curDiv + " .letterDiv").each((index, val) => {
        $(val).css({"background-image": ""});
    })
    var c = 0;
    $("#" + curDiv + " .line").each((index, val) => {
        if (c > fractalBlueArr.length - 1) {
            c = 0;
        }
        $(val).css({"background-image": "url(" + fractalBlueArr[c] + ")"});
        c++;
    })
}

function fractalRedArrayFilter(curDiv) {
    //remove bgr
    $("#" + curDiv + " .letterDiv").each((index, val) => {
        $(val).css({"background-image": ""});
    })
    var c = 0;
    $("#" + curDiv + " .line").each((index, val) => {
        if (c > fractalRedArr.length - 1) {
            c = 0;
        }
        $(val).css({"background-image": "url(" + fractalRedArr[c] + ")"});
        c++;
    })
}

function fractalBlackArrayFilter(curDiv) {
    //remove bgr
    $("#" + curDiv + " .letterDiv").each((index, val) => {
        $(val).css({"background-image": ""});
    })
    var c = 0;
    $("#" + curDiv + " .line").each((index, val) => {
        if (c > fractalBlackArr.length - 1) {
            c = 0;
        }
        $(val).css({"background-image": "url(" + fractalBlackArr[c] + ")"});
        c++;
    })
}

function fractalWhiteArrayFilter(curDiv) {
    //remove bgr
    $("#" + curDiv + " .letterDiv").each((index, val) => {
        $(val).css({"background-image": ""});
    })
    var c = 0;
    $("#" + curDiv + " .line").each((index, val) => {
        if (c > fractalWhiteArr.length - 1) {
            c = 0;
        }
        $(val).css({"background-image": "url(" + fractalWhiteArr[c] + ")"});
        c++;
    })
}

function fractalYellowArrayFilter(curDiv) {
    //remove bgr
    $("#" + curDiv + " .letterDiv").each((index, val) => {
        $(val).css({"background-image": ""});
    })
    var c = 0;
    $("#" + curDiv + " .line").each((index, val) => {
        if (c > fractalYellowArr.length - 1) {
            c = 0;
        }
        $(val).css({"background-image": "url(" + fractalYellowArr[c] + ")"});
        c++;
    })
}

function fractalGreenArrayFilter(curDiv) {
    //remove bgr
    $("#" + curDiv + " .letterDiv").each((index, val) => {
        $(val).css({"background-image": ""});
    })
    var c = 0;
    $("#" + curDiv + " .line").each((index, val) => {
        if (c > fractalGreenArr.length - 1) {
            c = 0;
        }
        $(val).css({"background-image": "url(" + fractalGreenArr[c] + ")"});
        c++;
    })
}

function snowflakesArrayFilter(curDiv) {
    //remove bgr
    $("#" + curDiv + " .letterDiv").each((index, val) => {
        $(val).css({"background-image": ""});
    })
    var c = 0;
    $("#" + curDiv + " .line").each((index, val) => {
        if (c > snowflakesArr.length - 1) {
            c = 0;
        }
        $(val).css({"background-image": "url(" + snowflakesArr[c] + ")"});
        c++;
    })
}

function blueWoodArrayFilter(curDiv) {
    //remove bgr
    $("#" + curDiv + " .letterDiv").each((index, val) => {
        $(val).css({"background-image": ""});
    })
    var c = 0;
    $("#" + curDiv + " .line").each((index, val) => {
        if (c > blueWoodArr.length - 1) {
            c = 0;
        }
        $(val).css({"background-image": "url(" + blueWoodArr[c] + ")"});
        c++;
    })
}

function pinkWoodArrayFilter(curDiv) {
    //remove bgr
    $("#" + curDiv + " .letterDiv").each((index, val) => {
        $(val).css({"background-image": ""});
    })
    var c = 0;
    $("#" + curDiv + " .line").each((index, val) => {
        if (c > pinkWoodArr.length - 1) {
            c = 0;
        }
        $(val).css({"background-image": "url(" + pinkWoodArr[c] + ")"});
        c++;
    })
}

function greenWoodArrayFilter(curDiv) {
    //remove bgr
    $("#" + curDiv + " .letterDiv").each((index, val) => {
        $(val).css({"background-image": ""});
    })
    var c = 0;
    $("#" + curDiv + " .line").each((index, val) => {
        if (c > greenWoodArr.length - 1) {
            c = 0;
        }
        $(val).css({"background-image": "url(" + greenWoodArr[c] + ")"});
        c++;
    })
}

function fractalBlackRedArrayFilter(curDiv) {
    var picFirst = fractalWhiteArr[1];
    var picSecond = fractalBlackArr[0];
    var curTop = 0;
    var c = 0;
    var position = 0;
    mixLetterZebraFilter(curDiv);
    $("#" + curDiv + " .zebra").each((index, val) => {
        position = $(val).position();
        if (position.top > curTop) {
            c++;
        }
        if (position.top < curTop) {
            c = 1;
        }
        curTop = position.top;
        $(val).css({"background-image": "url(" + picFirst + ")"});
        if (c % 2) {
            $(val).css({"background-image": "url(" + picSecond + ")"});
        }
    })
}

function changeLettersBgr(srcBg, bgrLetterId) {
    if (document.getElementById('stripe').checked) {
        $("#ab .line").css({"background-image": "url(" + srcBg + ")"});
        $("#ab .line").css({"background-color": "rgba(156, 22, 181, 0)"});
    }
    console.log(bgrLetterId);
    var num = bgrLetterId.replace("img_", "");
    $('#txtBgr').val(num);
    $(".checkedImage").removeClass("checkedImage");
    $("#img_" + num).addClass("checkedImage");
}

function removeBg() {
    $("#ab").css({"background-image": "url('')"});
}

window.applyFilter = function (optionValue, curDiv) {
    // ---- apply filter function
    if (optionValue == 0) {
        mixPicturesVersion1Filter(curDiv);
    } else if (optionValue == 1) {
        mixPicturesVersion2Filter(curDiv);
    } else if (optionValue == 2) {
        mixPicturesVersion3Filter(curDiv);
    } else if (optionValue == 3) {
        mixLetterZebraFilter(curDiv);
    } else if (optionValue == 4) {
        zebraInsideZebraFilter(curDiv);
    } else if (optionValue == 5) {
        mixBgFilter(curDiv);
    } else if (optionValue == 6) {
        fractalBlueArrayFilter(curDiv);
    } else if (optionValue == 7) {
        fractalRedArrayFilter(curDiv);
    } else if (optionValue == 8) {
        fractalBlackArrayFilter(curDiv);
    } else if (optionValue == 9) {
        fractalWhiteArrayFilter(curDiv);
    } else if (optionValue == 10) {
        fractalYellowArrayFilter(curDiv);
    } else if (optionValue == 11) {
        fractalGreenArrayFilter(curDiv);
    } else if (optionValue == 12) {
        snowflakesArrayFilter(curDiv);
    } else if (optionValue == 13) {
        fractalBlackRedArrayFilter(curDiv);
    } else if (optionValue == 14) {
        blueWoodArrayFilter(curDiv);
    } else if (optionValue == 15) {
        pinkWoodArrayFilter(curDiv);
    } else if (optionValue == 16) {
        greenWoodArrayFilter(curDiv);
    }
}

$(function () {
    if (typeof $_GET['lang'] !== 'undefined') {
        console.log("lang found doc ready");
        if ($_GET['lang'] == 1) {
            console.log("translate");
            translateFn(1);
        }
    }

    for (let i in bgPic) {
        $("#previewBgr").append("<img onclick='changeBgr(this.src, this.id);' id='bgr_" + i + "' style='height: 64px; width: 64px; cursor: pointer' src='" + bgPic[i] + "'/>")
    }
    for (let i in bgPic2) {
        $("#previewBgr2").append("<img onclick='changeBgr(this.src, this.id);' id='bgr_" + i + "' style='height: 64px; width: 64px; cursor: pointer' src='" + bgPic2[i] + "'/>")
    }
    for (let j in bgrArr) {
        $("#previewLetterBgr").append("<img onclick='changeLettersBgr(this.src, this.id);' id='img_" + j + "' style='height: 64px; width: 64px; cursor: pointer' src='" + bgrArr[j] + "'/>")
    }
    $("#img_0").addClass("checkedImage");

    $('#filters').change(function () {
        $('#stripe').attr('checked', false);
        const optionValue = $("#filters option:selected").val();
        console.log("optionValue", optionValue);
        messageEmptyCheck();
        $('#filter').val(optionValue);
        window.applyFilter(optionValue, 'ab');
    });
})

const showMoreBg = () => {
    $("#showMore").addClass('hide');
    $("#previewBgr2").removeClass('hide');
}

var lang = 0; // 0 - eng, 1 - ru
var translate = [];
translate['hello'] = [['hello'], ['привет']];
translate['buttonSend'] = [['Send Your Card!'], ['Отправить открытку!']];
translate['clear'] = [['Clear background'], ['Очистить фон']];
translate['createCardHeader'] = [['Create Your Card'], ['Создайте вашу открытку']];
translate['createCard'] = [['Create Your Card!'], ['Создайте вашу открытку!']];
translate['clearBtn'] = [['Clear'], ['Очистить']];
translate['greetHeader'] = [['Greetings Cards'], ['Поздравительные открытки']];
translate['miniHeader'] = [['Best online Greetings Service'], ['Лучший онлайн-сервис поздравительных открыток']];
translate['colorText'] = [['Color:'], ['Цвет букв:']];
translate['sizeText'] = [['Size:'], ['Размер букв:']];
translate['textureText'] = [['Texture:'], ['Текстура:']];
translate['letterBG'] = [['Inherit in letters:'], ['Фон наследуется в буквах:']];
translate['homeSidebar'] = [['Card'], ['Открытка']];
translate['editorSidebar'] = [['Editor'], ['Редактор']];
translate['greetingCardSidebar'] = [['Greeting card'], ['Ваша открытка']];
translate['gallerySidebar'] = [['Gallery'], ['Галерея']];
translate['letters'] = [['Letters:'], ['Буквы:']];
translate['backgrounds'] = [['Backgrounds:'], ['Фон:']];
translate['gallery'] = [['Gallery'], ['Галерея']];

function translateFn(lang) {
    for (let i in translate) {
        $('#' + i).html(translate[i][lang]);
    }
    $('#lang').val(lang);
}

translateFn(0);

