// Function that is called when the promise resolves
// user is the object that has been returned from GitHub API
function userInformationHTML(user) {
    return `
        <h2>${user.name}
            <span class='small-name'>
                (@<a href="${user.html_url}" target='_blank'>${user.login}</a>)
            </span>
        </h2>
        <div class='gh-content'>
            <div class="gh-avatar">
                <a href='${user.html_url}' target='_blank'>
                    <img src='${user.avatar_url}' width='80' height='80' alt='${user.login}' />
                </a>
            </div>
            <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
        </div>`;
}

// Add function to display repository info
// repos is the object that has been returned from GitHub API - it actually returns this object as an array
function repoInformationHTML(repos) {
    if (repos.length == 0) {
        return `<div class='clearfix repo-list'>No repos!</div>`;
    }

    var listItemsHTML = repos.map(function(repo) {
        return `<li>
                    <a href='${repo.html_url}' target='_blank'>${repo.name}</a>
                </li>`;
    });

    return `<div class='clearfix repo-list'>
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join('\n')}
                </ul>
            </div>`;
}

function fetchGitHubInformation(event) {
    // empty divs when the textbox is empty
    $('#gh-user-data').html('');
    $('#gh-repo-data').html('');

    var username = $('#gh-username').val();
    if (!username) {
        $('#gh-user-data').html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }

    $('#gh-user-data').html(
        `<div id="loader">
            <img src='assets/css/loader.gif' alt="loading..." />
        </div>`);

    //  promise
    $.when(
        $.getJSON(`https://api.github.com/users/${username}`),
        // lists repositories for this individual user
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        function(firstResponse, secondResponse) {
            var userData = firstResponse[0];
            var repoData = secondResponse[0];
            $('#gh-user-data').html(userInformationHTML(userData));
            $('#gh-repo-data').html(repoInformationHTML(repoData));
        }, function(errorResponse) {
            if (errorResponse.status === 404) {
                $('#gh-user-data').html(`<h2>No information found for user ${username}</h2>`)
            } else {
                console.log(errorResponse);
                $('#gh-user-data').html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`)
            }
        });
    }

    // have author's GitHub info displayed when loading the page
    $(document).ready(fetchGitHubInformation);