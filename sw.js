
self.addEventListener("install", (event) => {

  event.waitUntil(
 
    caches
      .open("calcApp") 
      
      .then((cache) => {
    
        cache.addAll(["home.html", "home.css"]);

      })
      .catch((err) => console.log(err))
  );
});

self.addEventListener("activate", () => {
  console.log("we are in activated phase");
});


self.addEventListener("fetch", (e) => {
  console.log("network request" , e.request.url);
  e.respondWith(
    caches
      .match(e.request)
      .then((file) => {
        if (file) {
            console.log('founded in cache')
          return file; 
        }
        console.log("not founded in cache, go to network to get the files")
        return fetch(e.request.url);
      })
      .catch((err) => console.log(err))
  );
});
