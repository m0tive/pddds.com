// ~
"use strict";

let LIST_ID = "";

function addPost(time, data) {
    // loop over items, add them if missing, remove if there's too many

    let list = document.getElementById(LIST_ID);
    let item = document.createElement("li");
    item.id = time.toString();
    item.innerHTML = data.innerHTML;
    list.appendChild(item);
}

function buildFirehose(id) {
    LIST_ID = id;

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
            "showImages": true,
            "customCallback": function(tweets) {
                //let list = document.getElementById(id);
                for (let post of tweets) {
                    addPost(new Date(post.timestamp).getTime(), {
                        "className": "tweet",
                        "innerHTML": post.tweet,
                        "image": post.image
                    });

                    /*
                    // TODO - use data-expanded-url instead of href on anchors
                    let item = document.createElement("li");
                    item.className = "tweet";
                    item.innerHTML = post.tweet;
                    list.appendChild(item);

                    if (post.image !== undefined)
                    {
                        let imageFrame = document.createElement("div");
                        imageFrame.style = "width: 100px; height: 100px; overflow: hidden;";

                        let image = document.createElement("img");
                        image.src = post.image;
                        image.style = "width: 100%;";
                        imageFrame.appendChild(image);

                        item.appendChild(imageFrame);
                    }
                    */
                }
            },
        });
    });
}

function onPostsLoaded(id, posts) {
    //let list = document.getElementById(id);
    for (let post of posts) {
        let date = new Date(post.date);
        addPost(date.getTime(), {
            "className": "tweet",
            "innerHTML": post.title,
            "image": post.image
        });

        /*
        let item = document.createElement("li");
        item.innerText = post.title;
        list.appendChild(item);
        */
    }
}
