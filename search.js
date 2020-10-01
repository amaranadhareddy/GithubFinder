const github = new Github();
const ui = new UI();
const bookmarkObj = new BookMark();

const searchIcon = document.querySelector(".search-icon");
const searchText = document.querySelector("#name");
const search = document.querySelector(".search");
const searchHint = document.querySelector(".search-hint");
const searchForm = document.querySelector("#form");
const bookmark = document.querySelector(".bookmark");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
const searchPlaceholder = "Search a Github User";
let placeholderLength = 0;
const typeWriterSpeed = 100;
let placeholder = "";
let searchValue;

searchText.setAttribute("disabled", "disabled");

document.addEventListener("DOMContentLoaded", () => {
  ui.showDefault();
});

search.addEventListener("click", (e) => {
  if (e.target.classList.contains("search-icon")) {
    searchText.classList.add("selected");
    searchIcon.classList.add("selected");
    bookmark.classList.add("hide");
    if (placeholder.length < 0) {
      placeholderLength = 0;
    }

    showPlaceholder();
    searchText.removeAttribute("disabled");
    searchText.focus();
  }
});

searchText.addEventListener("keyup", (e) => {
  if (searchText.value !== "") {
    searchHint.classList.add("selected");
  }
});

searchText.addEventListener("blur", (e) => {
  restoreSearch();
});

searchForm.addEventListener("submit", getUserdata);

function getUserdata(e) {
  searchValue = searchText.value;
  restoreSearch();

  placeholder = "";
  searchText.setAttribute("disabled", "disabled");
  if (searchValue !== "") {
    ui.showLoader();
    github.getProfile(searchValue).then((data) => {
      if (data.userData === undefined) {
        ui.noUserAlert();
      } else {
        ui.createCard(data.userData);
        ui.addRepos(data.repoData);
        ui.clearFavorites();
      }
    });
  } else {
    ui.emptyAlert();
  }

  e.preventDefault();
}

function restoreSearch() {
  searchText.value = "";
  searchText.classList.remove("selected");
  searchIcon.classList.remove("selected");
  searchHint.classList.remove("selected");
  bookmark.classList.remove("hide");
  searchText.setAttribute("placeholder", "");
  placeholderLength = 0;
  searchText.blur();
}

function showPlaceholder() {
  if (placeholderLength < searchPlaceholder.length) {
    placeholder =
      searchText.getAttribute("placeholder") +
      searchPlaceholder.charAt(placeholderLength);
    searchText.setAttribute("placeholder", placeholder);
    placeholderLength++;
    setTimeout(showPlaceholder, typeWriterSpeed);
  }
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("bookmark-fa")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    if (bookmarks && bookmarks.length > 0) {
      if (bookmarkObj.isBookMarked(searchValue)) {
        bookmarks = bookmarks.filter(
          (bookmark) => bookmark.userId != searchValue
        );
        ui.changeBookmarkIcon(document.querySelector(".add-bookmark"), false);
      } else {
        bookmarkObj.addBookmark();
      }
    } else {
      bookmarks = [];
      bookmarkObj.addBookmark();
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    e.preventDefault();
  } else if (e.target.classList.contains("bookmark-header")) {
    ui.getBookMarks();
    e.preventDefault();
  } else if (e.target.classList.contains("fav-name")) {
    searchText.value = e.target.getAttribute("userid");
    getUserdata(e);
    e.preventDefault();
  } else if (e.target.classList.contains("remove")) {
    bookmarkObj.removeBookmark(
      e.target.previousElementSibling.getAttribute("userid")
    );
    ui.getBookMarks();
    e.preventDefault();
  }
  
});
