//variables
let toRightVar = 0;
let toDownVar = 0;
let level = 1;
let positionLeft = 0;
let chbox = document.getElementById('stripe');
let newSizeRun = false;

//event listeners for keydown and keypress - backspace, enter
$(function () {
    window.backspaceActive = 0;
    /** $(".line").mouseover(function (el) {
        $(this).css({"box-shadow": "5px 5px 7px #000000"});
        console.log("line")
    });

     $(".line").mouseout(function (el) {
        $(this).css({"box-shadow": "2px 2px 4px #000000"});
        console.log("line")
    });

     $('.line').mouseover(function() {
        $(this).css({'transform' : 'rotate(45deg)'});
    }); **/

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

    document.getElementById('message').addEventListener( 'keypress', (event)=>{
        if (event.code == 'Space') {
            linesCount();
        }
    });
    //linesCount();

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

//remove the last symbol in textarea and AB-div
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

//resize symbol
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

//clear textarea and AB-div
function clearAb() {
    $("#ab").html("");
    $("#message").val("");
    document.getElementById("message").disabled = false;
}

//function for arrow "to left"
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

//function for arrow "to right"
function toRight(curDiv) {
    var arrLetter = [];
    $("#" + curDiv + " .letterDiv").each(function (index, value) {
        var position = $(this).position();
        arrLetter.push(position.left);
    });
    /*      var minValue = Math.min.apply(null, arrLetter);
            var maxValue = Math.max.apply(null, arrLetter);
            console.log("minValue", minValue);
            console.log("maxValue", maxValue);
            var difValue = maxValue - minValue;
            console.log("difValue", difValue);
            var leftOffset = (1000 - difValue) / 2 - 20 * 4 / 2;    */
    $("#" + curDiv + " .letterDiv").each(function (index, value) {
        $(this).css({left: arrLetter[index] + 20, position: 'absolute'});
    });
    toRightVar++;
    $('#toRightVar').val(toRightVar);
}

//function for arrow "to up"
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

//function for arrow "to down"
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

//function for write text
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

//GET-variable
var $_GET = [];
window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (a, name, value) {
    $_GET[name] = value;
});

//GET-variable for color of letters
if (typeof $_GET['color'] !== 'undefined') {
    if ($_GET['color']) {
        pickerColor = $_GET['color'];
    }
    if (pickerColor.indexOf('%23') > -1) {
        pickerColor = pickerColor.replace(/%23/g, '#')
    }
    $('#color').val(pickerColor);
}

//function for write letters
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

    // unique space for concrete letter
    $("#" + divId).append('<div class="letterDiv" id="a' + randNum + '" style="width:' + width + 'px; border: 0 solid white; height: 204; float: left"></div>');
    var position = $('#a' + randNum).position();
    if (position.left < positionLeft && (window.backspaceActive == 0 && newSizeRun !== true)) {
        // alertPRO();
        // todo : decide situation with broken position when we use arrows for moving text
        // todo : refactor - replace all decorative arrays (woods, fractals) in new file +
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
    });
}

//alert for pro-version
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

//function to limit the number of lines
function linesCount() {
    let rowCount = 0;
    let oldTop = 0;
    let positionRow;
    console.log("!!!!!!!!! we count lines");
    var e = document.getElementById("sizeLetter");
    var lineWidth = e.options[e.selectedIndex].text;


    $("#ab .line").each((index, val) => {
        positionRow = $(val).position();
        if (positionRow.top > oldTop) {
            console.log("positionRow.top > oldTop");
            console.log(positionRow.top , oldTop);
            console.log("positionRow.top - oldTop, lineWidth / 1");
            console.log(positionRow.top - oldTop, lineWidth / 1);
            if (positionRow.top - oldTop > lineWidth * 2) {
                rowCount++;
                console.log("linesCount rowCount", rowCount);
            }
            oldTop = positionRow.top;
        }else{
            console.log("positionRow.top == oldTop");
            console.log(positionRow.top , oldTop);
        }

        if (rowCount > 4) {
            rowCount = 0;
            document.getElementById("message").disabled = true;
            alert("You can't write too much text here.");
            // todo: dont allow write more. +
        }
    })
}

//draggable in letters
function addDruggable(divId) {
    $('#' + divId).draggable();
}

//change title to div-myABC
function showABC() {
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

function hideABC() {
    document.getElementById("myABC").style.display = "none";
    document.getElementById("createCard").style.display = "block";
}

function hideH1() {
    $("#greetHeader").removeClass("mb-1").addClass("hide");
    $("#miniHeader").removeClass("mb-5").addClass("hide");
    $("#createCard").hide()
}

//GET-variables
if (typeof $_GET['bgr'] !== 'undefined') {
    $(function () {
        if (bgPic[$_GET['bgr']]) {
            console.log('bgr', bgPic[$_GET['bgr']]);
            var bgrPic;

            if ($_GET['bgrArrNum'] == 0) {
                bgrPic = bgPic[$_GET['bgr']]
                console.log("bgrArrNum 0", bgPic[$_GET['bgr']])
            }
            if ($_GET['bgrArrNum'] == 2) {
                bgrPic = bgPic2[$_GET['bgr']]
            }

            $("#myABC").css({"background-size": "100%", "background-image": "url(" + bgrPic + ")"});
            /*
                        if ($_GET['bgrArrNum'] == 3) {
                            $("#myABC").css({"background-size": "80%", "background-image": "url(" + bgPic3[$_GET['bgr']] + ")"});
                        }*/

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
        if (typeof $_GET['filter'] !== 'undefined') {
            if ($_GET['filter'] && $_GET['txtBgr']) {
                window.applyFilter($_GET['filter'], 'myABC');
            }
        }
        if (typeof $_GET['stripe'] !== 'undefined') {
            if ($_GET['stripe'] && $_GET['txtBgr']) {
                $("#myABC .line").css({"background-image": "url(" + bgrArr[$_GET['txtBgr']] + ")"});
                $("#myABC .line").css({"background-color": "rgba(255,255,255,0)"});
            }
        }
    });
}

if (typeof $_GET['message'] !== 'undefined') {
    showABC();
    hideH1();
    if ($_GET['comment']) {
        //$_GET['comment'] = $_GET['comment'].replace();
        $("#commentMessage").text($_GET['comment'].replace(/\+/g, ' ').replace(/%2C/g, ','));
    }
    if ($_GET['message'].indexOf('%0D%0A') > -1) {
        $_GET['message'] = $_GET['message'].replace(/%0D%0A/g, '&nbsp; &nbsp; &nbsp;');
    }
    /** if ($_GET['message'].indexOf('heartsymbol') > -1 || $_GET['message'].indexOf('smilesymbol') > -1) {

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
     }**/
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

//style for letters
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

//validation for the submit button
function validateMessage(formElement) {
    if ($('#message').val()) {
        var resultPrompt = prompt("Do you want to add a comment under the postcard? If not, click \"Cancel\".");
        $("#sendCardForm").submit();
    } else {
        alert("Write Your Postcard Message!");
        return false;
    }
    if (resultPrompt) {
        if (resultPrompt.length < 1000) {
        $("#comment").val(resultPrompt);
        $("#sendCardForm").submit();
    } else {
        alert("Your comment is very long, maximum - 1000 chars.");
        return false;
        }
    }
}

//change background div-AB
function changeBgr(src, bgrId, arrNum) {
    $("#ab").css({"background-size": "100%", "background-image": "url(" + src + ")"});
    var num = bgrId.replace("bgr_", "");
    $('#bgr').val(num);
    if (arrNum) {
        $('#bgrArrNum').val(arrNum);
    }
}

//filter zebra
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

//filter mix backgrounds of letters
function mixBgFilter(curDiv) {
    // $("#" + curDiv + " .line").each((index, val) => {

    //})
    let c = 0;
    $("#" + curDiv + " .letterDiv").each((index, val) => {
        $(val).css({"background-image": "url(" + array3[c] + ")"});
        c++;
    })
}

//filter white fractals in desert
function mixBgFilterWithDesert(curDiv) {
    let c = 0;
    // letters loop
    $("#" + curDiv + " .line").each((index, val) => {
        if (c > fractalWhiteArr.length - 1) {
            c = 0;
        }
        $(val).css({"background-image": "url(" + fractalWhiteArr[c] + ")"});
        console.log(c, fractalWhiteArr[c]);
        c++;
    })

    // bgr loop
    $("#" + curDiv + " .letterDiv").each((index, val) => {
        if ($(val).children().hasClass("line")) {
            $(val).css({"background-image": "url(" + bgPic[6] + ")"});
        } else {
            $(val).css({"background-image": "url(" + bgPic[7] + ")"});
        }
    })
}

//filter zebra inside zebra
function zebraInsideZebraFilter(curDiv) {
    var picFirst = array3[0];
    var picSecond = bgPic2[0];
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
        $(val).css({"background-image": "url(" + picSecond + ")"});
        if (c % 2) {
            $(val).css({"background-image": "url(" + picFirst + ")"});
        }
    })
}

//filter mix pictures from letters-bg array
function mixPicturesVersion1Filter(curDiv) {

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

var bgrAll = bgPic.concat(bgPic2);

//filter mix pictures from backgrounds array
function mixPicturesVersion2Filter(curDiv) {
    console.log($("#" + curDiv + " .line"));
    var c = 0;

    $("#" + curDiv + " .line").each((index, val) => {
        if (c > bgrAll.length - 1) {
            c = 0;
        }
        $(val).css({"background-image": "url(" + bgrAll[c] + ")"});
        c++;
    })
}

//filter mix pictures from letters-bg and backgrounds array
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

    var c = 0;

    $("#" + curDiv + " .line").each((index, val) => {
        if (c > fractalWhiteArr.length - 1) {
            c = 0;
        }
        $(val).css({"background-image": "url(" + fractalWhiteArr[c] + ")"});
        c++;
    })

}

//filter fractals
function fractalBlueArrayFilter(curDiv) {

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

    var c = 0;
    $("#" + curDiv + " .line").each((index, val) => {

        if (c > fractalGreenArr.length - 1) {
            c = 0;
        }
        $(val).css({"background-image": "url(" + fractalGreenArr[c] + ")"});
        c++;
    })
}

//filter snowflakes
function snowflakesArrayFilter(curDiv) {

    var c = 0;
    $("#" + curDiv + " .line").each((index, val) => {

        if (c > snowflakesArr.length - 1) {
            c = 0;
        }
        $(val).css({"background-image": "url(" + snowflakesArr[c] + ")"});
        c++;
    })
}

//filter woods
function blueWoodArrayFilter(curDiv) {

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

    var c = 0;
    $("#" + curDiv + " .line").each((index, val) => {

        if (c > greenWoodArr.length - 1) {
            c = 0;
        }
        $(val).css({"background-image": "url(" + greenWoodArr[c] + ")"});
        c++;
    })
}

//filter 2 fractals
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

//filter rotate
function rotateFilter(curDiv) {
    var picFirst = array3[0];
    var picSecond = bgPic2[0];
    var curTop = 0;
    var curLeft = 0;
    var c = 0;
    var position = 0;
    var newLine = false;
    mixLetterZebraFilter(curDiv);
    $("#" + curDiv + " .zebra").each((index, val) => {
        position = $(val).position();
        // need check when we create new line
        if (position.top > curTop) {
            var e = document.getElementById("sizeLetter");
            var lineWidth = e.options[e.selectedIndex].text;
            if (position.top - curTop != lineWidth / 1) {
                console.log("!!!! found new line !!!!!!!")
                console.log(position.top - curTop, lineWidth / 1)
                newLine = true;
            }
            c++;
        }
        if (position.top < curTop) {
            c = 1;
        }
        if (newLine) {
            c = 1;
        }
        curTop = position.top;
        curLeft = position.left;

        $(val).css({"background-image": "url(" + picFirst + ")"});
        if (c % 2) {
            $(val).css({"background-image": "url(" + picSecond + ")"});
        } else {
            //$(val).css({"border-radius": "25px"});
            $(val).addClass("rotateFilter");
        }
        newLine = false;
    })
}

function rotateFilter2(curDiv) {
    $("#" + curDiv + " .line").addClass("rotateFilter");
}

//shadow in letters preview on hover
function mouseOverEffect(bgrLetterId) {
    console.log(bgrLetterId);
    $("#" + bgrLetterId).addClass("previewLetterShadow");
}

function mouseOutEffect(bgrLetterId) {
    console.log(bgrLetterId);
    $("#" + bgrLetterId).removeClass("previewLetterShadow");
}

//change background of letters
function changeLettersBgr(srcBg, bgrLetterId) {
    if (document.getElementById('stripe').checked) {
        $("#ab .line").css({"background-image": "url(" + srcBg + ")"});
        $("#ab .line").css({"background-color": "rgba(255,255,255,0)"});
    }
    console.log(bgrLetterId);
    var num = bgrLetterId.replace("img_", "");
    $('#txtBgr').val(num);
    $(".checkedImage").removeClass("checkedImage");
    $("#img_" + num).addClass("checkedImage");
}

//remove background in div-AB
function removeBg() {
    $("#ab").css({"background-image": "url('')"});
}

//choose filter
window.applyFilter = function (optionValue, curDiv) {
    // ---- apply filter function
    $("#" + curDiv + " .line").removeClass("rotateFilter");
    $("#" + curDiv + " .letterDiv").each((index, val) => {
        $(val).css({"background-image": ""});
    })
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
    } else if (optionValue == 17) {
        mixBgFilterWithDesert(curDiv);
    } else if (optionValue == 18) {
        rotateFilter(curDiv);
    } else if (optionValue == 19) {
        rotateFilter2(curDiv);
    }
}

//GET-variable for translate
$(function () {
    if (typeof $_GET['lang'] !== 'undefined') {
        console.log("lang found doc ready");
        if ($_GET['lang'] == 1) {
            console.log("translate");
            translateFn(1);
        }
    }
//preview pictures for backgrounds
    for (let i in bgPic) {
        $("#previewBgr").append("<img onclick='changeBgr(this.src, this.id, 0);' id='bgr_" + i + "' style='height: 64px; width: 64px; cursor: pointer; border-radius: 7px; margin: 1px;' src='" + bgPic[i] + "'/>")
    }
    for (let i in bgPic2) {
        $("#previewBgr2").append("<img onclick='changeBgr(this.src, this.id, 2);' id='bgr_" + i + "' style='height: 64px; width: 64px; cursor: pointer; border-radius: 7px; margin: 1px;' src='" + bgPic2[i] + "'/>")
    }
    for (let j in bgrArr) {
        $("#previewLetterBgr").append("<img onmouseout='mouseOutEffect(this.id);' onmouseover='mouseOverEffect(this.id);' onclick='changeLettersBgr(this.src, this.id);' id='img_" + j + "' class='previewLetter' src='" + bgrArr[j] + "'/>")
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

//function for the button to show more backgrounds
const showMoreBg = () => {
    $("#showMore").addClass('hide');
    $("#previewBgr2").removeClass('hide');
}

//translator
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

