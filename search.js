const github = new Github();
const ui = new UI();

const searchIcon = document.querySelector(".search-icon");
const searchText = document.querySelector("#name");
const search = document.querySelector(".search");
const searchHint = document.querySelector(".search-hint");
const searchForm = document.querySelector("#form");
const bookmark = document.querySelector(".bookmark");

const searchPlaceholder = "Search a Github User";
let placeholderLength = 0;
const typeWriterSpeed = 100;
let placeholder = "";

searchText.setAttribute("disabled", "disabled");

document.addEventListener("DOMContentLoaded", () => {
  ui.showDefault();
});

search.addEventListener("click", (e) => {
  if (e.target.classList.contains("search-icon")) {
    searchText.classList.add("selected");
    searchIcon.classList.add("selected");
    bookmark.classList.add("hide");
    if (placeholder.length == 0) {
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

searchForm.addEventListener("submit", (e) => {
  let searchValue = searchText.value;
  searchText.value = "";
  searchText.classList.remove("selected");
  searchIcon.classList.remove("selected");
  searchHint.classList.remove("selected");
  bookmark.classList.remove("hide");
  searchText.setAttribute("placeholder", "");

  searchText.blur();
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
      }
    });
  } else {
    ui.emptyAlert();
  }

  e.preventDefault();
});

function showPlaceholder() {
  console.log("placeholder is called");
  if (placeholderLength < searchPlaceholder.length) {
    placeholder =
      searchText.getAttribute("placeholder") +
      searchPlaceholder.charAt(placeholderLength);
    searchText.setAttribute("placeholder", placeholder);
    placeholderLength++;
    setTimeout(showPlaceholder, typeWriterSpeed);
  }
}
