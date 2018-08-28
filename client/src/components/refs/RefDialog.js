import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { addRef } from "../../actions/refsActions";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class RefDialog extends Component {
  state = {
    open: false,
    name: "",
    description: "",
    errors: {}
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleAdd = () => {
    const { type } = this.props;
    const { _id } = this.props.refs.refs;
    const { name, description } = this.state;
    const isFolder = type === "folder" ? true : false;
    const newRef = { name, isFolder, description };
    this.props.addRef(_id, newRef);
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  render() {
    const { classes, label, type, errors, refs } = this.props;
    return (
      <React.Fragment>
        <Button
          variant="outlined"
          className={classes.button}
          onClick={this.handleClickOpen}
          style={{
            display: "inline-block",
            float: "right",
            marginRight: "20px"
          }}
        >
          <AddCircleIcon style={{ marginRight: "10px" }} />
          {label}
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add {type}</DialogTitle>
          <DialogContent>
            <DialogContentText>Insert value of new {type}</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={type === "folder" ? "Name" : "URL"}
              onChange={this.handleChange("name")}
              error={errors.url ? true : false}
              helperText={errors.url ? errors.url : null}
              fullWidth
            />
            <TextField
              margin="dense"
              id="description"
              label={"Description"}
              onChange={this.handleChange("description")}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAdd} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
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
  { addRef }
)(withStyles(styles)(RefDialog));
