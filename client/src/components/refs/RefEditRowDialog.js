import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import { addRef, editRef } from "../../actions/refsActions";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class RefEditRowDialog extends Component {
  state = {
    open: false,
    name: "",
    description: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleEdit = () => {
    const { row } = this.props;
    const { name, description } = this.state;
    const newRef = { id: row._id, name, description };

    this.props.editRef(newRef);
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.name,
      description: nextProps.description
    });
  }

  render() {
    const { classes, label, type } = this.props;
    return (
      <div>
        <Button
          variant="outlined"
          className={classes.button}
          onClick={this.handleClickOpen}
        >
          <EditIcon />
          {label}
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit {type}</DialogTitle>
          <DialogContent>
            <DialogContentText>Insert value of {type}</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={type === "folder" ? "Name" : "URL"}
              onChange={this.handleChange("name")}
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
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleEdit} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  refs: state.refs
});

export default connect(
  mapStateToProps,
  { addRef, editRef }
)(withStyles(styles)(RefEditRowDialog));
