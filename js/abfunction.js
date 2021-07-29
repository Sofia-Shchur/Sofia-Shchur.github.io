$(function () {

    // $("#ab .line").draggable();

    document.getElementById('message').addEventListener('keydown', (event) => {
        if (event.key == 'Backspace') {
            console.log('level 1 backspace');
            $(document).unbind('keydown').bind('keydown', function (e) {
                if (e.key == 'Backspace') {
                    delLastSymbol();
                }
            });
        }
    });


    document.getElementById('message').addEventListener('keypress', (event) => {
        var e = document.getElementById("sizeLetter");
        var lineWidth = e.options[e.selectedIndex].text;
        console.log('listener kepress', event.key);
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

function delLastSymbol() {
    var text = $("#message").val();
    var e = document.getElementById("sizeLetter");
    var lineWidth = e.options[e.selectedIndex].text
    $("#ab").html("");
    var newText = text.substring(0, text.length - 1);
    console.log("newText", newText);

    //setTimeout(function(){
    writePhrase(newText, 'ab', lineWidth);
    //4422 $("#message").val(newText);
    if (chbox.checked) {
        $('.checkedImage').trigger('click');
    }
    //},500)
}


function newSizeAb() {
    var text = $("#message").val();
    var e = document.getElementById("sizeLetter");
    var lineWidth = e.options[e.selectedIndex].text;
    clearAb();
    writePhrase(text, 'ab', lineWidth);
    $("#message").val(text);
    if (chbox.checked) {
        $('.checkedImage').trigger('click');
    }
}

function clearAb() {
    $("#ab").html("");
    $("#message").val("");
}

function toLeft() {

    var arrLetter = [];
    $(".letterDiv").each(function (index, value) {
        var position = $(this).position();
        arrLetter.push(position.left);
    });

    $(".letterDiv").each(function (index, value) {
        $(this).css({left: arrLetter[index] + -20, position: 'absolute'});
    });
}


function toRight() {
    var arrLetter = [];

    $(".letterDiv").each(function (index, value) {
        var position = $(this).position();
        console.log("position.left first loop", position.left);
        arrLetter.push(position.left);
    });
    /*
        var minValue = Math.min.apply(null, arrLetter);
        var maxValue = Math.max.apply(null, arrLetter);

        console.log("minValue", minValue);
        console.log("maxValue", maxValue);
        var difValue = maxValue - minValue;
        console.log("difValue", difValue);

       // var leftOffset = (1000 - difValue) / 2 - 20 * 4 / 2;

     */

    $(".letterDiv").each(function (index, value) {
        console.log("oldPosition !!!! " + index + " ", arrLetter[index]);
        console.log("oldPosition.left + leftOffset", arrLetter[index]);
        $(this).css({left: arrLetter[index] + 20, position: 'absolute'});
    });
}

function toUp() {
    var arrLetter = [];
    var arrUp = [];

    $(".letterDiv").each(function (index, value) {
        var position = $(this).position();
        arrLetter.push(position.left);
    });

    $(".letterDiv").each(function (index, value) {
        $(this).css({left: arrLetter[index], position: 'absolute'});
    });

    $(".letterDiv").each(function (index, value) {
        var position = $(this).position();
        console.log("position.top ", position.top);
        arrUp.push(position.top);
    });

    $(".letterDiv").each(function (index, value) {
        $(this).css({top: arrUp[index] - 20, position: 'absolute'});
    });
    // }, 500)
}

function toDown() {
    console.log("!!!function toDown!!!");
    var arrDownTop = [];
    var arrDown = [];

    var testDownTop = []
    // var testDownTop = []

    $(".letterDiv").each(function (index, value) {
        var position = $(this).position();
        arrDown.push(position.left);
    });

    $(".letterDiv").each(function (index, value) {
        $(this).css({left: arrDown[index], position: 'absolute'});
    });

    $(".letterDiv").each(function (index, value) {
        var position = $(this).position();
        var positionTest = $(this)[0].getBoundingClientRect();

        console.log("position.top ", position.top);
        arrDownTop.push(position.top);
        testDownTop.push(positionTest.top);
        console.log("arrDownTop", arrDownTop);
        console.log("testDownTop", testDownTop);
    });

    $(".letterDiv").each(function (index, value) {
        $(this).css({top: arrDownTop[index] + 20, position: 'absolute'});
    });

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
    if (chbox.checked) {
        $('.checkedImage').trigger('click');
    }
}


var $_GET = [];
window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (a, name, value) {
    $_GET[name] = value;
});

//get the 'index' query parameter
if (typeof $_GET['color'] !== 'undefined') {
    pickerColor = $_GET['color'];
    if (pickerColor.indexOf('%23') > -1) {
        pickerColor = pickerColor.replace(/%23/g, '#')
    }
    $('#color').val(pickerColor);
}


//writeLetter([], "ab", false);
function writeLetter(arr, divId, lineWidth) {
    console.log('write letter');
    let color = 'green';

    pickerColor = $('#color').val();
    // console.log(pickerColor);

    let texture = '';
    if (!lineWidth) {
        if (chbox.checked) {
            texture = $(".checkedImage").attr('src');
        }
        var e = document.getElementById("sizeLetter");
        var lineWidth = e.options[e.selectedIndex].text;

    }

    // var lineWidth = document.getElementByеId('sizeLetter').value;
    const width = arr[0].length * lineWidth;
    $("#" + divId + " .line").css({"width": lineWidth + "px", "height": lineWidth + "px"});
    //$(".word").css({"width": width + "px"});
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
    // $('#a' + randNum).css({top: level * 100});
    var position = $('#a' + randNum).position();
    if (position.left < positionLeft) {
        //$('.arrowsForText').addClass('hide');
        alert('Ввод большого количества текста доступен в PRO-версии!');
        setTimeout(function () {
            $(".letterDiv").hide("explode", {pieces: 9}, 1000);
            clearAb();
            positionLeft = 0;
        }, 1000);


        console.log("!!!! new line !!!!!");
    }
    positionLeft = position.left;
    console.log("position.left");
    console.log(position.left);

    //$(".letterDiv").unwrap();
    $.each(arr, function (index, value) {
        if (value[0] === 'h') {
            $("#a" + randNum).append('<div style="border: 2px dotted white; width: ' + lineWidth * 6 + 'px; height: ' + lineWidth + 'px; background-color: #757575; float: left; position: relative;">&nbsp;</div>')
        } else {
            $.each(value, function (i, v) {
                if (v.length === 4) {
                    $("#a" + randNum).append('<div onclick="addDruggable($(this).parent().attr(\'id\'))" class="line" style="background-image: url(' + texture + '); background-color: ' + pickerColor + ';   width: ' + lineWidth + 'px; height: ' + lineWidth + 'px;border-radius:' + style(v) + '">&nbsp;</div>')
                } else {
                    $("#a" + randNum).append('<div style="width:' + lineWidth + 'px; height: ' + lineWidth + 'px; opacity: 0; float: left;">&nbsp;</div>')
                }
            });
        }
    });
}

function addDruggable(divId) {

    $('#' + divId).draggable();

}


function showABC() {
    if (typeof $_GET['message'] !== 'undefined') {
        //decodeURIComponent(text1)
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

        /*  if ($_GET['message'].indexOf('%5C') > -1) {
              $_GET['message'] = $_GET['message'].replace(/%5C/g, '\\');
          }*/
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
    });
}


if (typeof $_GET['message'] !== 'undefined') {
    //
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


function check() {
    if (chbox.checked) {
        texture();
    }
}

var bgPic = ['http://sofia-shchur.github.io/pictures/wall.jpg',
    'http://sofia-shchur.github.io/pictures/stars.jpg',
    'http://sofia-shchur.github.io/pictures/cosmo.jpg',
    'http://sofia-shchur.github.io/pictures/flowers_pink.jpg',
    'http://sofia-shchur.github.io/pictures/flowers_yellow.jpg',
    'http://sofia-shchur.github.io/pictures/paper.jpg',
    'http://sofia-shchur.github.io/pictures/line_paper.jpg',
    'http://sofia-shchur.github.io/pictures/new_year.jpg',
    'http://sofia-shchur.github.io/pictures/new_year2.jpg',
    'http://sofia-shchur.github.io/pictures/strawberry.jpg',
    'http://sofia-shchur.github.io/pictures/wallpaper.jpg',
    'http://sofia-shchur.github.io/pictures/watermelon.jpg',
    'http://sofia-shchur.github.io/pictures/pizza.jpg',
    'http://sofia-shchur.github.io/pictures/eggs.jpg',
    'http://sofia-shchur.github.io/pictures/heart_small.png',
    'http://sofia-shchur.github.io/pictures/tulip.jpg',
];

var bgrArr = ['http://sofia-shchur.github.io/pictures/kitty.jpg',
    'http://sofia-shchur.github.io/pictures/kitten.jpg',
    'http://sofia-shchur.github.io/pictures/butterfly.jpg',
    'http://sofia-shchur.github.io/pictures/lime.jpg',
    'http://sofia-shchur.github.io/pictures/sun.jpg',
    'http://sofia-shchur.github.io/pictures/heart_mini.jpg',
];

function selectColor() {
    $('input[name="color"]').val('red')
}

function validateMessage(formElement) {
    if ($('#message').val()) {
        $("#sendCardForm").submit();
    } else {
        alert("Write Your Postcard Message!");
        return false;
    }
}


function changeBgr(src, bgrId) {
    $("#ab").css({"background-size": "80%", "background-image": "url(" + src + ")"});

    var num = bgrId.replace("bgr_", "");

    $('#bgr').val(num);

    /* var c = 30;
     if(typeof interval !== 'undefined'){
         clearInterval(interval)
     }
     var interval = setInterval(function () {
         if (c == 10) {
             c = 0
         }
         $(".picTexture").css({"background-size": c * 100 + "%"});
         c++;
     }, 1000)*/
}

function changeLettersBgr(srcBg, bgrLetterId) {
    if (document.getElementById('stripe').checked) {
        $("#ab .line").css({"background-image": "url(" + srcBg + ")"});
    }
    console.log(bgrLetterId);
    var num = bgrLetterId.replace("img_", "");
    $('#txtBgr').val(num);
    $(".checkedImage").removeClass("checkedImage");
    $("#img_" + num).addClass("checkedImage");
}

function removeBg() {
    console.log('removeBgr');
    $("#ab").css({"background-image": "url('')"});
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
    for (let j in bgrArr) {
        $("#previewLetterBgr").append("<img onclick='changeLettersBgr(this.src, this.id);' id='img_" + j + "' style='height: 64px; width: 64px; cursor: pointer' src='" + bgrArr[j] + "'/>")
    }
    $("#img_0").addClass("checkedImage");
})


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

