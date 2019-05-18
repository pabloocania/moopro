import React from "react";
import ChipInput from "material-ui-chip-input";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

const styles = theme => [{}];
class KeywordsInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: props.keywords
    };
  }

  handleAddChip = function handleAddChip(chip) {
    const { keywords } = this.state;
    keywords.push(chip);
    this.setState({ keywords });
  };

  handleDeleteChip = function handleDeleteChip(chip, index) {
    const { keywords } = this.state;
    keywords.splice(index, 1);
    this.setState({ keywords });
  };

  render() {
    const { keywords } = this.state;
    const { floatingLabelText } = this.props;
    return (
      <ChipInput
        value={keywords}
        onRequestAdd={chip => this.handleAddChip(chip)}
        onRequestDelete={(chip, index) => this.handleDeleteChip(chip, index)}
        fullWidth
        floatingLabelText={floatingLabelText}
        floatingLabelFixed
        label="keyowrds lasbeaskla"
        variant="outlined"
      />
    );
  }
}

KeywordsInput.defaultProps = {
  keywords: [],
  floatingLabelText: "Keywords"
};

KeywordsInput.propTypes = {
  keywords: PropTypes.array,
  floatingLabelText: PropTypes.string
};
export default withStyles(styles)(KeywordsInput);
