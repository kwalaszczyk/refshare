import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import { addRef, editRef, openDialog } from "../../actions/refsActions";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class RefEditButton extends Component {
  handleClickOpen = () => {
    const dialogData = {
      open: true,
      action: "edit",
      refData: this.props.row,
      type: this.props.row.isFolder ? "folder" : "link"
    };
    this.props.openDialog(dialogData);
  };

  handleEdit = () => {
    const { row } = this.props;
    const { name, description, isPrivate } = this.state;
    const newRef = { id: row._id, name, description, isPrivate };

    this.props.editRef(newRef);
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleCheckboxChange = name => event => {
    this.setState({
      [name]: event.target.checked
    });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.name,
      description: nextProps.description,
      isPrivate: nextProps.isPrivate
    });
  }

  render() {
    const { classes, label, row } = this.props;
    const type = row.isFolder ? "folder" : "link";

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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  refs: state.refs
});

export default connect(
  mapStateToProps,
  { addRef, editRef, openDialog }
)(withStyles(styles)(RefEditButton));
