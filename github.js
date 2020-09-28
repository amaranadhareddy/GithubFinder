class Github {
  constructor() {
    this.baseUrl = "https://api.github.com/users/";
  }

  async getProfile(userName) {
    let user = await fetch(`${this.baseUrl}${userName}`);
    let userData, repoData;
    if (user.status === 200) {
      userData = await user.json();
      let repo = await fetch(`${this.baseUrl}${userName}/repos`);
      repoData = await repo.json();
    }
    return {
      userData,
      repoData,
    };
  }
}
