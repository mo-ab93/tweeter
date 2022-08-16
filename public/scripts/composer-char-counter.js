$(document).ready(function() {
  let maxCount = 140;
  $( "#tweet-text" ).keyup(function() {
    let tweetLength = $(this).val().length;
    let remaining = maxCount - tweetLength;
    $(".counter").html(remaining);
    if (remaining < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "#545149");
    }
  })
  
});