$(document).ready(function () {


    //setting variables and jQuery.
    var player1 = prompt("Player one! Enter your name. You will be blue.");
    var player1Color = 'rgb(86, 151, 255)';

    var player2 = prompt("Player two! Enter your name. You will be red.");
    var player2Color = 'rgb(237, 45, 73)';

    var gameOn = true;
    var table = $('table tr');

    // just for our reffrence
    function reportWin(rowNum, colNum) {
        console.log('you won starting at this row,col.');
        console.log(rowNum);
        console.log(colNum);
    }

    //change color of a button at given index
    function changeColor(rowIndex, colIndex, color) {
        return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);

    }
    // tell the color of as specific button
    function returnColor(rowIndex, colIndex) {
        return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
    }
    //check if bottom row is empty of an giveen colomn
    function checkBottomRow(colIndex) {
        var colorReport = returnColor(5, colIndex);
        for (var row = 5; row > -1; row--) {
            colorReport = returnColor(row, colIndex);
            if (colorReport === 'rgb(0, 255, 255)') {
                return row;
            }

        }
    }

    //checking if four colors given are same and not grey(empty button).
    function colorMatched(one, two, three, four) {
        return (one === two && one === three & one === four && one !== 'rgb(0, 255, 255)' && one !== undefined)
    }

    // lets check if four colors are connected
    //1. horizontally connected?
    function horizontalCheck() {
        for (var row = 0; row < 6; row++) {
            for (var col = 0; col < 4; col++) {
                if (colorMatched(returnColor(row, col), returnColor(row, col + 1), returnColor(row, col + 2), returnColor(row, col + 3))) {
                    console.log('horizontal win');
                    reportWin(row, col);
                    return true;
                } else {
                    continue;
                }
            }
        }
    }
    //2.for checking vertically
    function verticalCheck() {
        for (var col = 0; col < 7; col++) {
            for (var row = 0; row < 3; row++) {
                if (colorMatched(returnColor(row, col), returnColor(row + 1, col), returnColor(row + 2, col), returnColor(row + 3, col))) {
                    console.log('vertical win')
                    reportWin(row, col);
                    return true;
                }
                else {
                    continue;
                }
            }
        }
    }
    //3. for checking diagonally
    function diagonalCheck() {
        for (var col = 0; col < 6; col++) {
            for (var row = 0; row < 7; row++) {
                if (colorMatched(returnColor(row, col), returnColor(row - 1, col + 1), returnColor(row - 2, col + 2), returnColor(row - 3, col + 3))) {
                    console.log('diag +ve slope win');
                    reportWin(row, col);
                    return true;

                }
                else if (colorMatched(returnColor(row, col), returnColor(row + 1, col + 1), returnColor(row + 2, col + 2), returnColor(row + 3, col + 3))) {
                    console.log('diag -ve slope win');
                    reportWin(row, col);
                    return true;
                }
                else {
                    continue;
                }
            }
        }
    }

    var currentPlayer = 1;
    var currentName = player1;
    var currentColor = player1Color;

    $('h3').text(player1 + " it is your turn to pick a colomn and drop in!")


    $('.board button').on('click', function () {
        $(this).fadeOut(100);
        $(this).fadeIn(500);

        var col = $(this).closest('td').index();

        var bottomAvail = checkBottomRow(col);


        changeColor(bottomAvail, col, currentColor);

        if (horizontalCheck() || verticalCheck() || diagonalCheck()) {

            $('h3').fadeOut('3000');
            $('h2').fadeOut('6000');
            $('h1').text("The winner is..." + currentName.toUpperCase());
            $('h1').css({
                'color': 'currentColor',
                'font-size': '60px',
                'background-color': '#FFE066'
            })
            
            for (var row = 0; row < 6; row++) {
                for (var col = 0; col < 7; col++) {
                    table.eq(row).find('td').eq(col).find('button').fadeIn(2000).css('background-color', currentColor);
                }
            }
            $('.board').fadeOutde();

        }
        currentPlayer = currentPlayer * -1;

        if (currentPlayer === 1) {
            currentName = player1;
            $('h3').text("Its your turn " + currentName);
            currentColor = player1Color;
        } else {
            currentName = player2;
            $('h3').text("Its your turn " + currentName);
            currentColor = player2Color
        }
    })
})