class UI {
  constructor() {
    this.card = document.querySelector(".profile-card");
  }

  showDefault() {
    this.card.classList.remove("profile-card");
  }

  createCard(user) {
    this.card.classList.add("profile-card");
    this.card.innerHTML = `
    <div class="profile-photo">
        <img
          src="${user.avatar_url}"
          alt="${user.login}"
        />
    </div>
    <div class="profile-info">
        <h2 class="userName">${user.name}</h2>
        <p class="bio">${user.bio}</p>
        <ul class="info">
          <li>${user.followers} <strong>Followers</strong></li>
          <li>${user.following} <strong>Following</strong></li>
          <li>${user.public_repos} <strong>Repos</strong></li>
        </ul>
    <div class="repoList">
    </div>
    
    </div>
    `;
  }

  addRepos(repos) {
    let repoList = document.querySelector(".repoList");
    let repoElement;
    repos
      .sort((a, b) => {
        return new Date(b.updated_at) - new Date(a.updated_at);
      })
      .slice(0, 10)
      .forEach((repo) => {
        repoElement = document.createElement("a");
        repoElement.appendChild(document.createTextNode(`${repo.name}`));
        repoElement.className = "repo";
        repoElement.setAttribute("href", `${repo.html_url}`);
        repoElement.setAttribute("target", `_blank`);
        repoList.appendChild(repoElement);
      });
  }

  noUserAlert() {
    this.card.classList.add("profile-card");
    this.card.innerHTML = `
    
    <div class="profile-info">
        <h2 class="userName">No user found.</h2>
        
    </div>
    `;
  }

  emptyAlert() {
    this.card.classList.add("profile-card");
    this.card.innerHTML = `
    
    <div class="profile-info">
        <h2 class="userName">Please enter a name</h2>
        
    </div>
    `;
  }

  showLoader() {
    this.card.innerHTML = `<img src="loading.gif" alt="loader">`;
  }
}
