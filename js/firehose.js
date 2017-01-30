// ~
"use strict";

let LIST_ID = "";

//-----------------------------------------------------------------------------
function addPost(timestamp, itemBuilder) {

    // loop over items, add them if missing, remove if there's too many
    //
    let date = new Date(timestamp);
    let time = date.getTime();

    if (time < 1440000000000) { return; }

    let list = document.getElementById(LIST_ID);

    let target;
    for (let child = list.firstChild; child !== null; child = child.nextSibling) {
        if (Number(child.id) < time) {
            target = child;
            break;
        }
    }


    let item = document.createElement("li");
    itemBuilder(item);
    item.id = time.toString();

    if (target === undefined) {
        list.appendChild(item);
    }
    else {
        list.insertBefore(item, target);
    }
}

//-----------------------------------------------------------------------------
function loadTweets() {
    getScript(SITE_BASEURL + "/js/twitterFetcher.js", function() {

        twitterFetcher.fetch({
            "profile": {"screenName": 'pdddddds'},
            "dataOnly": true,
            "showImages": true,
            "customCallback": function(tweets) {
                for (let post of tweets) {
                    addPost(post.timestamp, function(item) {
                        // TODO - use data-expanded-url instead of href on anchors
                        item.innerHTML = post.tweet;
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
                        let link = document.createElement("a");
                        link.innerText = "Twitter";
                        link.href = post.permalinkURL;
                        item.appendChild(link);
                        item.className = "tweet";
                    })
                }
            },
        });
    });
}

//-----------------------------------------------------------------------------
function buildFirehose(id) {
    LIST_ID = id;
    loadTweets();
}
