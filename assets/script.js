// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

const now = dayjs().format('dddd, MMMM DD-YYYY');
$(currentDay).html(now);

$(document).ready(function () {
    //add Bootstrap classes to table
    $(".row").addClass("time-block");
    $(".time").addClass("col-3 col-md-2 hour");
    $(".description").addClass("col-6 col-md-8");
    $(".save").addClass("col-3 col-md-2");

    //assign color to before, after, and current hours
    function addColor () {
        $(".row").each(function() {
            let rowId = $(this).attr("id");
            let hour = parseInt(rowId.replace(/\D/g, ''));
            console.log(hour);
            let  currentHour = parseInt(dayjs().format("H"));
            console.log(currentHour);
            let eventRow = $(this);
            if (currentHour > hour) {
                eventRow.addClass("past");
                console.log("past")
            }
            if (currentHour == hour) {
                eventRow.addClass("present");
                console.log("present");
            }
            if (currentHour < hour) {
                eventRow.addClass("future");
                console.log("future");
            }
})};

    //assigns events found in local storage to their respective hour
    function loadEvents () {
        $(".row").each(function() {
            let rowId = $(this).attr("id");
            let hour = rowId.replace(/\D/g, '');
            console.log(hour);
            let eventRow = $(this).find(".description .input");
            let storedInput = localStorage.getItem(`event-${hour}`);
            console.log(storedInput);
            if (storedInput != null) {
                eventRow.text(storedInput);
            }
})};

loadEvents();
addColor();


$(".row").each(function() {
    let eventRow = $(this).closest(".row").find(".description .input");
    let rowId = $(this).attr("id");
    let hour = rowId.replace(/\D/g, '');
    console.log(hour);
    let saveBtn = $(this).find(".saveBtn");
    saveBtn.click(function() {
        let userInput = eventRow.text().trim();
        localStorage.setItem(`event-${hour}`, userInput);
    });
    saveBtn.click(function() {
        const lineBreak = document.createElement("br");
        eventRow.append(lineBreak);
    });
    
    //why isn't this function working to create a neweform element after the first one is saved?
    saveBtn.click(function() {
        const newEvent = document.createElement("span");
        newEvent.setAttribute("class", "input");
        newEvent.setAttribute("role", "textbox");
        newEvent.setAttribute("contenteditable", "true");
        newEvent.innerHTML = "Add/Change Event";
        eventRow.parent().append(newEvent);
        });

    });

});

  