import React from "react";
import scriptLoader from "react-async-script-loader";
import { Input, FormControl, InputLabel } from "@material-ui/core";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { GoogleApiWrapper } from "google-maps-react";

class AddressAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      formatted_address: "",
      icon: "",
      geopoint: null,
      placeId: "",
      name: "",
      rating: "",
      types: null
    };

    //
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address, placeId) => {
    const { onPlaceSelect } = this.props;
    /*
    if (placeId) {
      const request = {
        placeId,
        fields: ["price_level", "review", "photo", "website"]
      };
      this.autocomplete.getDetails(request, (results, status) => {
        console.log("Place Details");
        console.log(results);
      });
    }
    */
    this.setState({ address, placeId });
    this.autocomplete.findPlaceFromQuery(
      {
        query: address,
        fields: ["name", "rating", "formatted_address", "icon"]
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.setState({
            name: results[0].name,
            rating: results[0].rating,
            formatted_address: results[0].formatted_address,
            icon: results[0].icon
          });
          geocodeByAddress(address).then((resultsGeocode) => {
            this.setState({ types: resultsGeocode[0].types });
            getLatLng(resultsGeocode[0])
              .then((latLng) => {
                this.setState({ geopoint: latLng });
                if (onPlaceSelect) {
                  onPlaceSelect(this.state);
                }
              })
              .catch(error => console.error("Can't get LatLng", error));
          });
        }
      }
    );
  };

  componentDidMount() {
    const input = document.getElementById("component-simple");
    this.autocomplete = new google.maps.places.PlacesService(input);
  }

  onChange = (event) => {
    // console.log("onChange");
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({
          getInputProps, suggestions, getSuggestionItemProps, loading
        }) => (
          <div>
            <FormControl fullWidth>
              <InputLabel htmlFor="component-simple">Buscar Lugar</InputLabel>
              <Input
                value={this.state.address}
                label="Direccion o Nombre"
                {...getInputProps({
                  placeholder: "Dirección o Nombre",
                  className: "location-search-input"
                })}
                id="component-simple"
              />
            </FormControl>

            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBwtMuaAqAeHnd9Oyb4F9Ro1eXpvaSHf_s"
})(AddressAutocomplete);
