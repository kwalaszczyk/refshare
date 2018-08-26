import React, { Component } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import FolderIcon from "@material-ui/icons/Folder";
import InsertLinkIcon from "@material-ui/icons/InsertLink";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { deleteRef, showSnackbar } from "../../actions/refsActions";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import RefEditRowDialog from "./RefEditRowDialog";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class RefRow extends Component {
  onDeleteClick = row_id => {
    this.props.deleteRef(row_id);
  };

  state = {
    to: ""
  };

  componentDidMount() {
    this.setState({ to: this.props.to });
  }

  addProtocolToLink = url => {
    if (!/^https?:\/\//i.test(url)) {
      url = "http://" + url;
    }
    return url;
  };

  handleOpenSnackbar = text => {
    this.props.showSnackbar(text);
  };

  render() {
    const { row, isOwned, classes } = this.props;
    const to = row.isFolder ? row._id : row.name;

    return (
      <TableRow key={row._id}>
        <TableCell>
          {row.isFolder ? <FolderIcon /> : <InsertLinkIcon />}
        </TableCell>
        {row.isFolder ? (
          <TableCell
            component={Link}
            to={to != null ? to : "/"}
            style={{ cursor: "pointer" }}
          >
            {row.name}
          </TableCell>
        ) : (
          <TableCell
            component="a"
            href={this.addProtocolToLink(row.name)}
            target="_blank"
            style={{ cursor: "pointer" }}
          >
            {row.name}
          </TableCell>
        )}
        <TableCell>{row.description}</TableCell>
        {isOwned ? (
          <React.Fragment>
            <TableCell numeric={true}>
              <RefEditRowDialog
                name={row.name}
                row={row}
                description={row.description}
                isPrivate={row.isPrivate}
              />
            </TableCell>
            <TableCell numeric={true}>
              {!row.isFolder ? (
                <CopyToClipboard style={{ cursor: "pointer" }} text={row.name}>
                  <FileCopyIcon
                    onClick={this.handleOpenSnackbar.bind(this, "Link copied")}
                  />
                </CopyToClipboard>
              ) : null}
            </TableCell>
            <TableCell numeric={true}>
              <IconButton
                className={classes.button}
                aria-label="Delete"
                color="primary"
              >
                <DeleteIcon
                  onClick={this.onDeleteClick.bind(this, row._id, "delete")}
                  style={{ cursor: "pointer" }}
                >
                  delete
                </DeleteIcon>
              </IconButton>
            </TableCell>
          </React.Fragment>
        ) : null}
      </TableRow>
    );
  }
}
export default connect(
  null,
  { deleteRef, showSnackbar }
)(withStyles(styles)(RefRow));
