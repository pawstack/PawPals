import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';


class PlacesAutocomplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      autocompleteItems: [],
      materialUIItems: [],
    };
    this.autocompleteCallback = this.autocompleteCallback.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.debouncedFetchPredictions = debounce(this.fetchPredictions, this.props.debounce);

  }

  componentDidMount() {
    if (!window.google) {
      throw new Error('Google Maps JavaScript API library must be loaded. See: https://github.com/kenny-hibino/react-places-autocomplete#load-google-library');
    }

    if (!window.google.maps.places) {
      throw new Error('Google Maps Places library must be loaded. Please add `libraries=places` to the src URL. See: https://github.com/kenny-hibino/react-places-autocomplete#load-google-library');
    }

    this.autocompleteService = new google.maps.places.AutocompleteService();
    this.autocompleteOK = google.maps.places.PlacesServiceStatus.OK;
  }
  componentWillUnmount() {
    this.isUnmounted = true;
  }

  autocompleteCallback(predictions, status) {
    if (status !== this.autocompleteOK) {
      this.props.onError(status);
      if (this.props.clearItemsOnError) { this.clearAutocomplete(); }
      return;
    }

    // transform snake_case to camelCase
    const formattedSuggestion = (structured_formatting) => ({ mainText: structured_formatting.main_text,
      secondaryText: structured_formatting.secondary_text,
    });

    const { highlightFirstSuggestion } = this.props;

    this.setState({
      autocompleteItems: predictions.map((p, idx) => ({
        suggestion: p.description,
        placeId: p.place_id,
        active: (highlightFirstSuggestion && idx === 0 ? true : false),
        index: idx,
        formattedSuggestion: formattedSuggestion(p.structured_formatting),
      })
      ),
      materialUIItems: predictions.map((p, idx) => {
        return p.description;
      })
    });
  }

  fetchPredictions() {
    const { value } = this.props.inputProps;
    if (value.length) {
      this.autocompleteService.getPlacePredictions(
        Object.assign({ input: value}, this.props.options),
        this.autocompleteCallback);
    }
  }

  clearAutocomplete() {
    this.setState({ autocompleteItems: [] });
  }

  selectAddress(address, placeId) {
    this.clearAutocomplete();
    this.handleSelect(address, placeId);
  }

  handleSelect(address, placeId) {
    this.props.onSelect ? this.props.onSelect(address, placeId) : this.props.inputProps.onChange(address);
  }

  getActiveItem() {
    return this.state.autocompleteItems.find(item => item.active);
  }

  selectActiveItemAtIndex(index) {
    const activeName = this.state.autocompleteItems.find(item => item.index === index).suggestion;
    this.setActiveItemAtIndex(index);
    this.props.inputProps.onChange(activeName);
  }

  handleEnterKey() {
    const activeItem = this.getActiveItem();
    if (activeItem === undefined) {
      this.handleEnterKeyWithoutActiveItem();
    } else {
      this.selectAddress(activeItem.suggestion, activeItem.placeId);
    }
  }

  handleEnterKeyWithoutActiveItem() {
    if (this.props.onEnterKeyDown) {
      this.props.onEnterKeyDown(this.props.inputProps.value);
      this.clearAutocomplete();
    } else {
      return; //noop
    }
  }

  handleDownKey() {
    if (this.state.autocompleteItems.length === 0) {
      return;
    }

    const activeItem = this.getActiveItem();
    if (activeItem === undefined) {
      this.selectActiveItemAtIndex(0);
    } else {
      const nextIndex = (activeItem.index + 1) % this.state.autocompleteItems.length;
      this.selectActiveItemAtIndex(nextIndex);
    }
  }

  handleUpKey() {
    if (this.state.autocompleteItems.length === 0) {
      return;
    }

    const activeItem = this.getActiveItem();
    if (activeItem === undefined) {
      this.selectActiveItemAtIndex(this.state.autocompleteItems.length - 1);
    } else {
      let prevIndex;
      if (activeItem.index === 0) {
        prevIndex = this.state.autocompleteItems.length - 1;
      } else {
        prevIndex = (activeItem.index - 1) % this.state.autocompleteItems.length;
      }
      this.selectActiveItemAtIndex(prevIndex);
    }
  }

  handleInputKeyDown(event) {
    switch (event.key) {
    case 'Enter':
      event.preventDefault();
      this.handleEnterKey();
      break;
    case 'ArrowDown':
      event.preventDefault(); // prevent the cursor from moving
      this.handleDownKey();
      break;
    case 'ArrowUp':
      event.preventDefault(); // prevent the cursor from moving
      this.handleUpKey();
      break;
    case 'Escape':
      this.clearAutocomplete();
      break;
    }

    if (this.props.inputProps.onKeyDown) {
      this.props.inputProps.onKeyDown(event);
    }
  }

  setActiveItemAtIndex(index) {
    this.setState({
      autocompleteItems: this.state.autocompleteItems.map((item, idx) => {
        if (idx === index) {
          return Object.assign({active: true}, item);
        } else {
          return Object.assign({active: false}, item);
        }
      }),
    });
  }

  handleInputChange(event) {
    this.props.inputProps.onChange(event);
    if (!event) {
      this.clearAutocomplete();
      return;
    }
    this.debouncedFetchPredictions();
  }

  handleInputOnBlur(event) {
    this.clearAutocomplete();

    if (this.props.inputProps.onBlur) {
      this.props.inputProps.onBlur(event);
    }
  }

  inlineStyleFor(...props) {
    const { classNames, styles } = this.props;
    // No inline style if className is passed via props for the element.
    if (props.some(prop => classNames.hasOwnProperty(prop))) {
      return {};
    }

    return props.reduce((acc, prop) => {
      return Object.assign(
        {},
        acc,
        styles[prop]
      );
    }, {});
  }

  classNameFor(...props) {
    const { classNames } = this.props;

    return props.reduce((acc, prop) => {
      const name = classNames[prop] || '';
      return name ? `${acc} ${name}` : acc;
    }, '');
  }

  getInputProps() {
    const defaultInputProps = {
      type: 'text',
      autoComplete: 'off',
    };

    return Object.assign(
      {}, 
      defaultInputProps,
      this.props.inputProps,
      {
        onChange: (event) => {
          this.handleInputChange(event);
        },
        onKeyDown: (event) => {
          this.handleInputKeyDown(event);
        },
        onBlur: (event) => {
          this.handleInputOnBlur(event);
        },
        style: this.inlineStyleFor('input'),
        className: this.classNameFor('input'),
      });
  }

  render() {
    const { classNames, styles } = this.props;
    const { autocompleteItems } = this.state;
    const inputProps = this.getInputProps();
    if (this.props.hintText) {
      var auto = <AutoComplete
        hintText ={this.props.hintText}
        dataSource={this.state.materialUIItems}
        onUpdateInput={inputProps.onChange}
        fullWidth={true}/>;
    } else if (this.props.label) {
      var auto = <AutoComplete
        dataSource={this.state.materialUIItems}
        onUpdateInput={inputProps.onChange}
        floatingLabelText={this.props.label}
        fullWidth={true}/>;
    }
    return (
      <div
        id="PlacesAutocomplete__root"
        style={this.inlineStyleFor('root')}
        className={this.classNameFor('root')}>
        {auto}
      </div>
    );
  }
}

PlacesAutocomplete.defaultProps = {
  clearItemsOnError: false,
  onError: (status) => console.error('[react-places-autocomplete]: error happened when fetching data from Google Maps API.\nPlease check the docs here (https://developers.google.com/maps/documentation/javascript/places#place_details_responses)\nStatus: ', status),
  classNames: {},
  autocompleteItem: ({ suggestion }) => (<div>{suggestion}</div>),
  styles: {},
  options: {},
  debounce: 200,
  highlightFirstSuggestion: false,
  googleLogo: true,
  googleLogoType: 'default',
};

export default PlacesAutocomplete;
