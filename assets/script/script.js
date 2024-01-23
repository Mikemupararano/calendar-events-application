    const localeSettings = {};
  dayjs.locale(localeSettings);
  // Hold on after the DOM is fully loaded and then run the code.
  $(function () {
    // Extracting current hour of the day from day.js.
    const currentHour = dayjs().format('H');
  // Here I change the background color of each block depending on whether it is in the past, present or future of present time block.
    function hourlyColor() {
      $('.time-block').each(function() {
        const blockHour = parseInt(this.id);
        $(this).toggleClass('past', blockHour < currentHour);
        $(this).toggleClass('present', blockHour === currentHour);
        $(this).toggleClass('future', blockHour > currentHour);
      });
    }
  // If a user clicks save button, their input is saved in the textarea and the entry is saved in local storage.
    function textEntry() {
      $('.saveBtn').on('click', function() {
        const key = $(this).parent().attr('id');
        const value = $(this).siblings('.description').val();
        localStorage.setItem(key, value);
      });
    }
   // Refreshing background color based on past, present or future compared to present block: past(grey), present(red), or future(green). 
    function refreshColor() {
      $('.time-block').each(function() {
        const blockHour = parseInt(this.id);
        if (blockHour == currentHour) {
          $(this).removeClass('past future').addClass('present');
        } else if (blockHour < currentHour) {
          $(this).removeClass('future present').addClass('past');
        } else {
          $(this).removeClass('past present').addClass('future');
        }
      });
    }
    // Fetching user entry from the localStorage and setting textarea values for each time block.
    $('.time-block').each(function() {
      const key = $(this).attr('id');
      const value = localStorage.getItem(key);
      $(this).children('.description').val(value);
    });
      
    function updateTime() {
      const dateElement = $('#date');
      const timeElement = $('#time');
      const currentDate = dayjs().format('dddd, MMMM D, YYYY');
      const currentTime = dayjs().format('hh:mm:ss A');
      dateElement.text(currentDate);
      timeElement.text(currentTime);
    }
    // Calling the three main functions to set up the page.
    hourlyColor();
    textEntry();                
    refreshColor();
    // Update the time once per second 
    
    setInterval(updateTime, 1000);
  });

/*$(document).ready(function () {
  // Display current day
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

  // Function to update time block colors based on current time
  function updateColors() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).data("time"));

      $(this).removeClass("past present future");

      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  // Function to load events from local storage
  function loadEvents() {
    $(".time-block").each(function () {
      var blockHour = $(this).data("time");
      var savedEvent = localStorage.getItem("event_" + blockHour);

      if (savedEvent) {
        $(this).find("textarea").val(savedEvent);
      }
    });
  }

  // Function to save event to local storage
  $(".saveBtn").on("click", function () {
    var blockHour = $(this).parent().data("time");
    var eventText = $(this).siblings("textarea").val();

    localStorage.setItem("event_" + blockHour, eventText);
  });

  // Call functions to initialize the page
  updateColors();
  loadEvents();
});*/
