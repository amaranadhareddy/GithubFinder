class UI {
  constructor() {
    this.card = document.querySelector(".profile-card");
  }

  showDefault() {
    this.card.classList.remove("profile-card");
  }

  createCard(user) {
    this.card.classList.add("profile-card");
    let bookMarkFaClass;
    if (bookmarkObj.isBookMarked(user.login)) {
      bookMarkFaClass = "fa-bookmark";
    } else {
      bookMarkFaClass = "fa-bookmark-o";
    }
    this.card.style.display = "flex";
    this.card.innerHTML = `
    <div class="profile-photo">
        <img
          src="${user.avatar_url}"
          alt="${user.login}"
        />
    </div>
    <div class="profile-info">
        <div class="header"><h2 class="userName">${user.name}</h2>
        <a class="add-bookmark"><i class="fa ${bookMarkFaClass} fa-2x bookmark-fa"></i></a>
            
        </div>
        
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
    this.card.style.display = "flex";
    this.card.innerHTML = `<img src="loading.gif" alt="loader">`;
  }

  changeBookmarkIcon(bookmarkIcon, bookmarked) {
    if (bookmarked) {
      bookmarkIcon.firstElementChild.classList.remove("fa-bookmark-o");
      bookmarkIcon.firstElementChild.classList.add("fa-bookmark");
    } else {
      bookmarkIcon.firstElementChild.classList.remove("fa-bookmark");
      bookmarkIcon.firstElementChild.classList.add("fa-bookmark-o");
    }
  }

  getBookMarks() {
    this.card.innerHTML = ``;
    this.card.style.display = "none";
    let favorites = document.querySelector(".favorites");
    let favHtml = "";
    if (bookmarkObj.checkBookmarks()) {
      bookmarks.forEach((bookmark) => {
        favHtml += `
          <div class="favorite">
            <img src="${bookmark.profilePhoto}?client_id=d9308aacf8b204d361fd&client_secret=84969aeef73956f4ec9e8716d1840532802bb81b" alt="brad" class="fav-photo">
           <h3 class="fav-name" userId=${bookmark.userId}>${bookmark.name}</h3>
            <i class='fa fa-remove fa-1.5x remove'></i>
          
          </div>
          `;
      });
    } else {
      favHtml += `
          <div class="favorite">
            
           <h3 class="fav-name" style="margin:0 auto">No favorites</h3>
            
          
          </div>
          `;
    }

    favorites.innerHTML = favHtml;
  }

  clearFavorites() {
    document.querySelector(".favorites").innerHTML = "";
  }
}
