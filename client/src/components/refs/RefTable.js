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
import {
  getRefs,
  closeSnackbar,
  showSnackbar
} from "../../actions/refsActions";
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
    dialogOpen: false,
    currentFolder: ""
  };

  handleCloseSnackbar = () => {
    this.props.closeSnackbar();
  };

  handleOpenSnackbar = () => {
    this.setState({ snackbarOpen: true });
  };

  componentDidMount() {
    this.props.getRefs(this.props.match.params.id);
    this.setState({ currentFolder: this.props.match.params.id });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.currentFolder !== this.props.match.params.id) {
      this.props.getRefs(this.props.match.params.id);
      this.setState({ currentFolder: this.props.match.params.id });
    }
  }

  render() {
    const { classes, auth } = this.props;
    const { refs, refContent, snackbarText, snackbarIsOpen } = this.props.refs;
    const isOwned = refs.owner._id === auth.user.id ? true : false;
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
            refId={refs}
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
              <TableRow style={{ backgroundColor: "#0099ff" }}>
                <TableCell style={{ width: "5%" }} />
                <TableCell style={{ width: "15%" }}>Name</TableCell>
                <TableCell>Description</TableCell>
                {isOwned ? (
                  <React.Fragment>
                    <TableCell numeric={true} style={{ width: "5%" }}>
                      Edit
                    </TableCell>
                    <TableCell numeric={true} style={{ width: "5%" }}>
                      Copy to clipboard
                    </TableCell>
                    <TableCell numeric={true} style={{ width: "5%" }}>
                      Delete
                    </TableCell>
                  </React.Fragment>
                ) : null}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <RefRow key={row._id} row={row} isOwned={isOwned} />
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={snackbarIsOpen}
          onClose={this.handleCloseSnackbar}
          autoHideDuration={2000}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{snackbarText}</span>}
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
  { getRefs, showSnackbar, closeSnackbar }
)(withStyles(styles)(RefTable));
