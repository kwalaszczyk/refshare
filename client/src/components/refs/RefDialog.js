import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { addRef, clearErrors, openDialog } from "../../actions/refsActions";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class RefDialog extends Component {
  handleClickOpen = () => {
    const dialogData = { open: true, action: "add", type: this.props.type };
    this.props.openDialog(dialogData);
  };

  render() {
    const { label } = this.props;
    return (
      <React.Fragment>
        <Button
          variant="outlined"
          className="btn btn-light"
          onClick={this.handleClickOpen}
          style={{
            display: "inline-block",
            float: "right",
            marginRight: "20px",
            border: "0px",
            marginTop: "10px",
            marginBottom: "10px"
          }}
        >
          <AddCircleIcon />
          {label}
        </Button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  refs: state.refs,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addRef, clearErrors, openDialog }
)(withStyles(styles)(RefDialog));
