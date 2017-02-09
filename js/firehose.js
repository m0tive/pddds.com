// ~
"use strict";

let LIST_ID = "";

const MONTH_LIST = [
    "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
]

function formatDate(date) {
    date = new Date(date);
    return MONTH_LIST[date.getMonth()]
        + " " + date.getDate()
        + " " + date.getFullYear();
}

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
                        item.className = "tweet";

                        let info = document.createElement("div");
                        info.className = "info";

                        let permalink = document.createElement("a");
                        permalink.href = post.permalinkURL

                        // twitter icon
                        {

                            let icon = document.createElement("img");
                            icon.src = SITE_BASEURL + "/img/twitter_icon.svg";
                            icon.className = "icon";
                            permalink.appendChild(icon);
                        }

                        // date
                        {
                            let pubdate = document.createElement("abbr");
                            pubdate.className = "published";
                            pubdate.title = post.timestamp;
                            pubdate.innerText = formatDate(post.timestamp);

                            permalink.appendChild(pubdate);
                        }

                        info.appendChild(permalink);

                        item.appendChild(info);

                        // TODO - use data-expanded-url instead of href on anchors
                        let container = document.createElement("p");
                        container.innerHTML = post.tweet;
                        item.appendChild(container);

                        if (post.image !== undefined)
                        {
                            let imageFrame = document.createElement("div");
                            imageFrame.className = "imageFrame";
                            //imageFrame.style = "width: 100px; height: 100px; overflow: hidden;";

                            let link = document.createElement("a");
                            link.href = post.permalinkURL;

                            let image = document.createElement("img");
                            image.src = post.image;
                            image.style = "width: 100%;";
                            link.appendChild(image);

                            imageFrame.appendChild(link);

                            item.appendChild(imageFrame);
                        }
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
