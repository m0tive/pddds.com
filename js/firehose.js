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
}

function onPostsLoaded(id, posts) {
    let list = document.getElementById(id);
    for (let post of posts) {
        let item = document.createElement("li");
        item.innerText = post.title;
        list.appendChild(item);
    }
}
