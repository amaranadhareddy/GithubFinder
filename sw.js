const staticAssets = ["./offline.html"];

self.addEventListener("install", async (event) => {
  const cache = await caches.open("github-finder");
  cache.addAll(staticAssets);
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  event.respondWith(newtworkFirst(req));
});

async function newtworkFirst(req) {
  try {
    const res = await fetch(req);
    return res;
  } catch (error) {
    return await caches.match("./offline.html");
  }
}
