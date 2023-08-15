let form = document.querySelector("form")

function renderRepos (repoData) {
    let repoList = document.getElementById("repos-list")
    let repo = document.createElement("li")
    // repoList.innerHTML = " "
    repo.innerHTML = `
        <p id="repo-name">Repo: 
            <a href="${repoData.html_url}">${repoData.name}</a>
        </p>
        `
    repoList.appendChild(repo) 
}

function createUser (userData) {
    console.log(userData)
    let userLi = document.createElement("li")
        let userList = document.getElementById("user-list").appendChild(userLi)
        userLi.innerHTML = `
        <h4 id="username">Username:</h4>
        <p id="login">${userData.login}
            <img class="avatar" src="${userData.avatar_url}"/img> 
            <button type="button">Repos</button>
        </p>
        <a href="${userData.html_url}">Visit ${userData.login}'s page</a>
        `
        
        let userName = userData.login
        let repoBtn = document.querySelector("button")

        repoBtn.addEventListener("click", (e) => {
            fetch(`https://api.github.com/users/${userName}/repos`)
            .then(resp => resp.json())
            .then(repoData => {
                console.log(repoData)
                repoData.forEach(renderRepos)
            })
        })
        
}

form.addEventListener("submit", (e) => {
    e.preventDefault()

    let userList = document.getElementById("user-list")
    userList.innerHTML = " "

    let repoList = document.getElementById("repos-list")
    repoList.innerHTML = " "


    let user = e.target.children[0].value

    fetch(`https://api.github.com/users/${user}`)
    .then(resp => resp.json())
    .then(userData => {
        console.log(userData)
        createUser(userData)
    })
    form.reset()
})

