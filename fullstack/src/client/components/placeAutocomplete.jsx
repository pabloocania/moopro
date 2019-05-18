import React from "react";
import { Input, FormControl, InputLabel } from "@material-ui/core";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { GoogleApiWrapper } from "google-maps-react";

function getAddressObject(addressComponents) {
  const ShouldBeComponent = {
    home: ["street_number"],
    postal_code: ["postal_code"],
    street: ["street_address", "route"],
    region: [
      "administrative_area_level_1",
      "administrative_area_level_2",
      "administrative_area_level_3",
      "administrative_area_level_4",
      "administrative_area_level_5"
    ],
    city: [
      "locality",
      "sublocality",
      "sublocality_level_1",
      "sublocality_level_2",
      "sublocality_level_3",
      "sublocality_level_4"
    ],
    country: ["country"]
  };

  const address = {
    home: "",
    postal_code: "",
    street: "",
    region: "",
    city: "",
    country: ""
  };
  addressComponents.forEach((component) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const shouldBe in ShouldBeComponent) {
      if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
        if (shouldBe === "country") {
          address[shouldBe] = component.short_name;
        } else {
          address[shouldBe] = component.long_name;
        }
      }
    }
  });
  return address;
}

class AddressAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      formatted_address: "",
      fullAddress: null,
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
            const fullAddress = getAddressObject(resultsGeocode[0].address_components);
            this.setState({ types: resultsGeocode[0].types, fullAddress });
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
                  placeholder: "Dirección o Nombre del comercio",
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
