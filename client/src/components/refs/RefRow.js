import React, { Component } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import FolderIcon from "@material-ui/icons/Folder";
import InsertLinkIcon from "@material-ui/icons/InsertLink";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import EditIcon from "@material-ui/icons/Edit";
import { CopyToClipboard } from "react-copy-to-clipboard";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { deleteRef } from "../../actions/refsActions";
import { withStyles } from "@material-ui/core/styles";

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

  render() {
    const { row, handleOpenSnackbar, classes } = this.props;

    return (
      <TableRow key={row._id}>
        <TableCell>
          {row.isFolder ? <FolderIcon /> : <InsertLinkIcon />}
        </TableCell>
        <TableCell
          component="a"
          href={row.isFolder ? row._id : row.name}
          style={{ cursor: "pointer" }}
        >
          {row.name}
        </TableCell>
        {/* <TableCell
          component={Link}
          to={row.isFolder ? row._id : row.value}
          style={{ cursor: "pointer" }}
        >
          {value}
        </TableCell> */}
        <TableCell numeric={true}>
          <EditIcon
            onClick={this.onEditClick.bind(this, row._id, "edit")}
            style={{ cursor: "pointer" }}
          />
        </TableCell>
        <TableCell numeric={true}>
          {!row.isFolder ? (
            <CopyToClipboard style={{ cursor: "pointer" }} text={row.name}>
              <FileCopyIcon onClick={handleOpenSnackbar} />
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
      </TableRow>
    );
  }
}
export default connect(
  null,
  { deleteRef }
)(withStyles(styles)(RefRow));
