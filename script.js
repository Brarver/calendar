let today = moment();
let currentMonth = today.month()
let currentYear = today.year()
let selectYear = $('#year')
let selectMonth = $('#month')


let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = $('#monthAndYear')
showCalendar(currentMonth, currentYear);

function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.val());
    currentMonth = parseInt(selectMonth.val());
    showCalendar(currentMonth, currentYear);
}

///////////////////////////DISPLAY MONTH CALENDAR///////////////////////////////////////////////////////

function showCalendar(month, year) {

    let firstDay = moment().month(month).year(year).startOf('month').day()
    let daysInMonth = moment().month(month).year(year).daysInMonth();

    let tbl = $("#calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.html('')

    // filing data about month and in the page via DOM.
    monthAndYear.html(months[month] + " " + year);
    selectYear.val(year)
    selectMonth.val(month)

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = $("<tr>")

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = $("<td>").text("");
                row.append(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = $("<td>").text(date);
                cell.addClass('week w' + i)
                cell.attr('data-day', month + 1 +'/'+ date)
                if (date === today.date() && year === today.year() && month === today.month()) {
                    cell.addClass("bg-info");

                } // color today's date
                row.append(cell);
                date++;
            }


        }

        tbl.append(row); // appending each row into calendar body.
    }
    initializeWeek()

}

///////////////////////DISPLAY WEEK CALENDAR//////////////////////////////////////////////////

function showWeek(query) {

    var array = []
    query.each(function(i,v) {
        array.push([($(v).data('day'))])
    })

    $('.sun').text('Sunday ' + array[0])
    $('.mon').text('Monday ' + array[1])
    $('.tues').text('Tuesday ' + array[2])
    $('.wed').text('Wednesday ' + array[3])
    $('.thurs').text('Thursday ' + array[4])
    $('.fri').text('Friday ' + array[5])
    $('.sat').text('Saturday ' + array[6])
}

/////////////////////////////// INITIALIZE WEEK VIEW //////////////////////////////////////////

function initializeWeek() {
    var week = $('.bg-info').parent().children()
    showWeek(week)
}

////////////////////EVENTS////////////////////////////////////////////////////////////////////

$('.week').on('click', function (e) {
    var week = $(this).parent().children()
    showWeek(week)
})

