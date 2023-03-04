import React from "react";
import classes from "./GoogleSearch.css";
import GoogleMapReact from "google-map-react";
import axios_bars from "../../axios-bars";
import keys from "../../keys";

const API_KEY = keys.MAP_API_KEY;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.findPlace = this.findPlace.bind(this);
  }

  findPlace(e, map) {
    var searchBox = new window.google.maps.places.SearchBox(e.target);

    searchBox.addListener("places_changed", () => {
      var places = searchBox.getPlaces();

      if (places.length === 0) return;
      const place = places[0];

      console.log("place", place);

      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      const addressArray = place.formatted_address.split(",");

      if (addressArray[addressArray.length - 1].trim() != "UK") {
        window.alert("Only UK based searches are enabled for now :)");
        return;
      }

      const exists =
        this.props.data &&
        this.props.data.some(function (item) {
          return item.place_id === place.place_id;
        });

      if (exists) {
        window.alert(
          "This location already exists, use 'Swith Location' to find it"
        );
      } else if (
        place.types &&
        (place.types.includes("bar") || place.types.includes("restaurant"))
      ) {
        const answer = window.confirm(
          "This is a new location, would you like to submit a hapihour for this location?"
        );
        if (!answer) {
          return;
        }
      } else {
        window.alert("This location is not a bar / restaurant");
      }

      const el = document.createElement("p");
      el.innerHTML = place.adr_address;
      let city = "";
      try {
        city = el.querySelector(".locality").innerText.trim();
      } catch (err) {}

      if (
        place.types &&
        (place.types.includes("bar") || place.types.includes("restaurant"))
      ) {
        const trimmedPlace = {
          name: place.name,
          address: place.formatted_address,
          location: {
            coordinates: [
              place.geometry.location.lat(),
              place.geometry.location.lng(),
            ],
            type: "Point",
          },
          place_id: place.place_id,
          photo: place.photos && place.photos[0].getUrl(),
          website: place.website && place.website,
          city: city,
          deals: [],
        };

        axios_bars
          .post("/bar", trimmedPlace)
          .then(function (response) {
            window.alert("Successfully Added");
          })
          .catch(function (error) {
            window.alert("Failed");
          });
      }
    });
  }

  render() {
    return (
      <div className={classes.GoogleSearch}>
        <input
          onChange={(e) => this.findPlace(e, this.props.map)}
          id="keyword"
          onKeyDown={(event) => {
            if (event.keyCode === 13) {
              this.searchBar.blur();
              return false;
            }
          }}
        />
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY, libraries: "places" }}
        />
      </div>
    );
  }
}

export default SearchBar;
