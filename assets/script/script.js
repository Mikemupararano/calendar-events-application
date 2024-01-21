$(document).ready(function () {
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
});
