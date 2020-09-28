const github = new Github();
const ui = new UI();

const form = document.querySelector("#form");
const name = document.querySelector("#name");

document.addEventListener("DOMContentLoaded", () => {
  ui.showDefault();
});

form.addEventListener("submit", (e) => {
    console.log(e.target)
  if (name.value !== "") {
    ui.showLoader();
    github.getProfile(name.value).then((data) => {
      if (data.userData === undefined) {
        ui.noUserAlert();
      } else {
        ui.createCard(data.userData);
        ui.addRepos(data.repoData);
      }
    });
  }else{
      ui.emptyAlert();
  }
  e.preventDefault();
});
