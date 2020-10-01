class BookMark {
  constructor() {}
  addBookmark() {
    let userName = document.querySelector(".userName").textContent;
    let profilePhoto = document
      .querySelector(".profile-photo")
      .firstElementChild.getAttribute("src");
    let userData = {
      userId: searchValue,
      name: userName,
      profilePhoto: profilePhoto,
    };
    ui.changeBookmarkIcon(document.querySelector(".add-bookmark"), true);
    bookmarks.push(userData);
  }

  removeBookmark(userId) {
    console.log(userId);
    bookmarks = bookmarks.filter((bookmark) => {
      return bookmark.userId != userId;
    });
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  checkBookmarks() {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    return bookmarks && bookmarks.length > 0;
  }

  isBookMarked(id) {
    if (this.checkBookmarks()) {
      return bookmarks.some(
        (bookmark) => bookmark.userId.toLowerCase() === id.toLowerCase()
      );
    }
  }
}
