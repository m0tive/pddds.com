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

                        let authorLinkHTML = ""
                        {
                            let temp = document.createElement("div");
                            temp.innerHTML = post.author;

                            let authorLink = temp.getElementsByClassName('TweetAuthor-link')[0];
                            if (authorLink !== undefined) {
                                let screenName = authorLink.getElementsByClassName('TweetAuthor-screenName')[0];
                                if (screenName !== undefined) {
                                    authorLink.innerHTML = screenName.innerHTML;
                                    authorLinkHTML = authorLink.outerHTML;
                                }
                            }
                        }

                        let innerHTML = `<div class="info">
                            <img src="${SITE_BASEURL}/img/twitter_icon.svg" class="icon" />
                            ${authorLinkHTML}
                            <abbr class="published" title="${post.timestamp}">
                                <a href="${post.permalinkURL}">${formatDate(post.timestamp)}</a>
                            </abbr>
                        </div>
                        <p>${post.tweet}</p>`;

                        // TODO - use data-expanded-url instead of href on anchors

                        if (post.image !== undefined)
                        {
                            innerHTML += `<div class="imageFrame">
                                <a href="${post.permalinkURL}"><img src="${post.image}"/></a>
                            </div>`;
                        }

                        item.innerHTML = innerHTML;
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
