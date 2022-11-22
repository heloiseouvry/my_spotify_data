import raw_data from "./data/endsong_5.json" assert { type: "json" };

const app = {
  artists: {},
  sorted_artists: [],

  init() {
    console.log("Data init");
    app.gatherArtists();
    app.showArtists();
    document.querySelector("#button_alpha").addEventListener("click", app.sortArtists);
    document.querySelector("#button_num").addEventListener("click", app.sortArtists);
  },

  gatherArtists() {
    for (let stream_element of raw_data) {
      let current_artist = stream_element["master_metadata_album_artist_name"];
      if (app.artists.hasOwnProperty(current_artist)) {
        app.artists[current_artist]++;
      } else {
        app.artists[current_artist] = 1;
      }
    }
    app.sorted_artists = Object.keys(app.artists).map((key) => {
      return [key, app.artists[key]];
    });
  },

  showArtists(sort = "num") {   
    if(sort=="num"){
      app.sorted_artists.sort((first, second) => {
        return second[1] - first[1];
      });
    } else if(sort=="alpha"){
      app.sorted_artists.sort();
    }  
    console.log(app.sorted_artists);
    for (let artist of app.sorted_artists) {
      const newContent = document.createElement("div");
      newContent.textContent = `${artist[0]}  - ${artist[1]}`;
      document.querySelector("#container").appendChild(newContent);
    }
  },

  sortArtists(event) {
    document.querySelector("#container").innerHTML = "";
    if (event.target.id == "button_alpha") {
      app.showArtists("alpha");
    } else if (event.target.id == "button_num") {
      app.showArtists("num");
    }
  },
};

document.addEventListener("DOMContentLoaded", app.init);
