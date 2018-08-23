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
    name: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAdd = () => {
    const { currentFolderId, type } = this.props;
    const isFolder = type === "folder" ? true : false;
    const newRef = { name: this.state.name, isFolder };
    this.props.addRef(currentFolderId, newRef);
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes, label, type } = this.props;
    return (
      <div>
        <Button
          variant="outlined"
          className={classes.button}
          onClick={this.handleClickOpen}
        >
          <AddCircleIcon />
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
      </div>
    );
  }
}

export default connect(
  null,
  { addRef }
)(withStyles(styles)(RefDialog));
