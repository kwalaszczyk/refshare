import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { connect } from "react-redux";
import { getRefs } from "../../actions/refsActions";
import RefRow from "./RefRow";
import RefDialog from "./RefDialog";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  }
});

class RefTable extends Component {
  state = {
    snackbarOpen: false,
    modalOpen: false,
    dialogOpen: false
  };

  handleCloseSnackbar = () => {
    this.setState({ snackbarOpen: false });
  };

  handleOpenSnackbar = () => {
    this.setState({ snackbarOpen: true });
  };

  componentDidMount() {
    this.props.getRefs(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProp) {
    console.log(nextProp);
  }

  render() {
    const { classes } = this.props;
    const { refs, refContent } = this.props.refs;
    const { user } = this.props.auth;
    const { snackbarOpen, modalOpen, dialogOpen } = this.state;

    let rows = [];

    if (refContent) {
      // Sort - folders on top
      rows = refContent.sort((x, y) => {
        return y.isFolder - x.isFolder;
      });
    }
    return (
      <div className="custom-template not-vert-center">
        <Paper className={classes.root}>
          <RefDialog
            currentFolderId={this.props.match.params.id}
            label={"add link"}
            type={"link"}
          />
          <RefDialog
            currentFolderId={this.props.match.params.id}
            label={"add folder"}
            type={"folder"}
          />
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "2rem" }} />
                <TableCell>Name</TableCell>
                <TableCell numeric={true} style={{ width: "1rem" }}>
                  Edit
                </TableCell>
                <TableCell numeric={true} style={{ width: "1rem" }}>
                  Copy to clipboard
                </TableCell>
                <TableCell numeric={true} style={{ width: "1rem" }}>
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <RefRow
                  key={row._id}
                  row={row}
                  handleOpenSnackbar={this.handleOpenSnackbar}
                  isEditing={false}
                />
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={snackbarOpen}
          onClose={this.handleCloseSnackbar}
          autoHideDuration={2000}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Link copied to clipboard!</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleCloseSnackbar}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

RefTable.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  refs: state.refs,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getRefs }
)(withStyles(styles)(RefTable));
