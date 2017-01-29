// ~
"use strict";

let LIST_ID = "";

//-----------------------------------------------------------------------------
function addPost(timestamp, data) {
    // loop over items, add them if missing, remove if there's too many
    //
    let date = new Date(timestamp);
    let time = date.getTime();

    let list = document.getElementById(LIST_ID);

    let target;
    for (let child = list.firstChild; child !== null; child = child.nextSibling) {
        if (Number(child.id) < time) {
            target = child;
            break;
        }
    }


    let item = document.createElement("li");
    item.id = time.toString();
    item.innerHTML = data.innerHTML;

    if (target === undefined) {
        list.appendChild(item);
    }
    else {
        list.insertBefore(item, target);
    }
}

//-----------------------------------------------------------------------------
function loadPosts() {
    // Load the posts json
    let request = new XMLHttpRequest();
    request.open('Get', '/data/posts.json', true/*async*/);

    request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            let data = JSON.parse(this.response);
            for (let post of data.posts) {
                addPost(post.timestamp, {
                    "className": "tweet",
                    "innerHTML": post.title,
                    "image": post.image
                });
            }
        }
    };

    request.send();
}

//-----------------------------------------------------------------------------
function loadTweets() {
    getScript(SITE_BASEURL + "/js/twitterFetcher.js", function() {

        twitterFetcher.fetch({
            "profile": {"screenName": 'pdddddds'},
            "dataOnly": true,
            "showImages": true,
            "customCallback": function(tweets) {
                //let list = document.getElementById(id);
                for (let post of tweets) {
                    addPost(post.timestamp, {
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

//-----------------------------------------------------------------------------
function buildFirehose(id) {
    LIST_ID = id;

    loadPosts();
    loadTweets();
}
