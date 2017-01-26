// ~

function buildFirehose(id) {
    // Load the posts json
    let request = new XMLHttpRequest();
    request.open('Get', '/data/posts.json', true/*async*/);

    request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            let data = JSON.parse(this.response);
            onPostsLoaded(id, data.posts);
        } else {
            // TODO
        }
    };

    // TODO
    //request.onerror = function() { };
    request.send();

    getScript(SITE_BASEURL + "/js/twitterFetcher.js", function() {

        twitterFetcher.fetch({
          "profile": {"screenName": 'pdddddds'},
          "dataOnly": true,
          "customCallback": function(tweets) {
              console.log(tweets);
              let list = document.getElementById(id);
              for (let post of tweets) {
                  // TODO - use data-expanded-url instead of href on anchors
                  let item = document.createElement("li");
                  item.innerHTML = post.tweet;
                  list.appendChild(item);
              }
          },
        });
    });
}

function onPostsLoaded(id, posts) {
    let list = document.getElementById(id);
    for (let post of posts) {
        let item = document.createElement("li");
        item.innerText = post.title;
        list.appendChild(item);
    }
}
