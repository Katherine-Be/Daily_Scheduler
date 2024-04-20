// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
    //add Bootstrap classes to table
    $(".row").addClass("time-block");
    $(".time").addClass("col-2 col-md-1 hour text-center");
    $(".description").addClass("col-8 col-md-10");
    $(".save").addClass("col-2 col-md-1");

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

    //set textbox to grow with content added
    // let userEventDesc = document.querySelector(".input");
    // let widthMachine = document.querySelector(".input-wrap .width-machine");
    // userEventDesc.addEventListener("keyup", () => {
    // widthMachine.innerHTML = userEventDesc.value;
    // });

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
            newEvent.innerHTML = "Add event descrition";
            eventRow.parent().append(newEvent);
        });

    });

});


    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?




//need to hav w represent the one selected time out of all he hours - maybe use if description element !null and button is clicked, save selected element to local storage.
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
 ;
  