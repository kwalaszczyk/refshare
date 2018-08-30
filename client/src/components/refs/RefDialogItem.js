import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  addRef,
  clearErrors,
  closeDialog,
  editRef
} from "../../actions/refsActions";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class RefDialogItem extends Component {
  state = {
    name: "",
    description: "",
    errors: {},
    isPrivate: false
  };

  handleClose = () => {
    this.props.closeDialog();
  };

  handleCheckboxChange = name => event => {
    this.setState({
      [name]: event.target.checked
    });
  };

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.errors).length !== 0) {
      this.setState({
        errors: nextProps.errors
      });
    } else if (!nextProps.refs.dialogData.open) {
      this.setState({ name: "", description: "" });
    } else if (
      Object.keys(nextProps.refs.dialogData).length != 0 &&
      nextProps.refs.dialogData.action === "edit"
    ) {
      this.setState({
        name: nextProps.refs.dialogData.refData.name,
        description: nextProps.refs.dialogData.refData.description,
        isPrivate: nextProps.refs.dialogData.refData.isPrivate
      });
    }
  }

  handleAdd = () => {
    const { type } = this.props.refs.dialogData;
    const { _id } = this.props.refs.refs;
    const { name, description } = this.state;

    const isFolder = type === "folder" ? true : false;
    const newRef = { name, isFolder, description };

    this.props.addRef(_id, newRef);
  };

  handleUpdate = () => {
    const { name, description, isPrivate } = this.state;
    const { _id, isFolder } = this.props.refs.dialogData.refData;
    const newRef = { id: _id, name, description, isPrivate, isFolder };

    this.props.editRef(newRef);
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { errors } = this.props;
    const { dialogData } = this.props.refs;
    const isOpen = dialogData.open || false;
    return (
      <Dialog
        open={isOpen}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {dialogData.action} {dialogData.type}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogData.action === "edit" ? "Edit" : "Insert"} value of{" "}
            {dialogData.type}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={dialogData.type === "link" ? "URL" : "Folder name"}
            onChange={this.handleChange("name")}
            error={errors.name ? true : false}
            helperText={errors.name ? errors.name : null}
            value={this.state.name}
            fullWidth
          />
          <TextField
            margin="dense"
            id="description"
            label={"Description"}
            onChange={this.handleChange("description")}
            value={this.state.description}
            fullWidth
          />
          {dialogData.action === "edit" && dialogData.refData.isFolder ? (
            <FormControlLabel
              control={
                <Checkbox
                  icon={<LockOpenIcon />}
                  checkedIcon={<LockIcon />}
                  checked={this.state.isPrivate}
                  value={"isPrivate"}
                  onChange={this.handleCheckboxChange("isPrivate")}
                />
              }
              label={"Make it private"}
            />
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          {dialogData.action === "edit" ? (
            <Button onClick={this.handleUpdate} color="primary">
              Update
            </Button>
          ) : (
            <Button onClick={this.handleAdd} color="primary">
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  refs: state.refs,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addRef, clearErrors, closeDialog, editRef }
)(withStyles(styles)(RefDialogItem));
