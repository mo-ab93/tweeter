$(document).ready(function () {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },

  ]

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    let result = '';
    for (let tweet of tweets) {
      result += createTweetElement(tweet);

    }

    return $("#tweets-container").append(result);
  }

  const createTweetElement = function (tweet) {
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
  <p>${tweet["content"].text}</p>
</div>

<footer>

  <p>${tweet["created_at"]}</p>

  <div>
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
  </div>
</footer>

</article>
`

    return $tweet;
  }


  renderTweets(data);

  
  $("#tweet-input").submit(function( event ) {
    event.preventDefault();
    
    $.ajax({
      type: 'POST',
      url: "/tweets/",
      data: $(this).serialize(),   
      success: function(){
         renderTweets(data);
      }
      
   });
   
  });

});