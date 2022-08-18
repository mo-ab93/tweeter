$(document).ready(function() {

  // Render Tweets
  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
    for (let tweet of tweets) {
      const result = createTweetElement(tweet);
      $("#tweets-container").prepend(result);
    }

  };
  


  // Cross-Site Scripting
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  // create new tweet function
  const createTweetElement = function(tweet) {
    let $tweet = `
<article class="tweet">
<header>
  <div>
    <img src=${tweet["user"].avatars}>
    <p>${tweet["user"].name}</p>
  </div>
  <h4>${tweet["user"].handle}</h4>
</header>
<div class="tweet-content">
  <p>${escape(tweet["content"].text)}</p>
</div>

<footer>

  <p>${timeago.format(tweet["created_at"])}</p>

  <div>
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
  </div>
</footer>

</article>
`;

    return $tweet;
  };


  // Data fetching
  const loadTweets = function() {
    $.ajax('http://localhost:8080/tweets', { method: 'GET' })
      .then(function(data) {
        renderTweets(data);
      });
  };
  
  loadTweets();


  // hide error massages
  $(".bar.error").hide();


  // Submit new tweet and POST request by Ajax
  $("#tweet-input").submit(function(event) {
    event.preventDefault();
    const tweetLength = $("#tweet-text").val().length;
    const remaining = 140 - tweetLength;
    const emptyInput = $("#tweet-text").val().trim();
    if (emptyInput === "" || remaining < 0) {
      $(".bar.error").slideDown("slow");
      return;
    }
    $.ajax({
      type: 'POST',
      url: "/tweets/",
      data: $(this).serialize(),
      success: function() {
        loadTweets();
      }
    });
    
  });
  
});


// Toggle arrow
$(".new-tweet").hide();
$(".nav-text-icon").click(function() {
  $(".new-tweet").slideToggle("slow");
});