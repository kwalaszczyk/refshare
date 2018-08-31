import React, { Component } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import FolderIcon from "@material-ui/icons/Folder";
import FolderSharedIcon from "@material-ui/icons/FolderShared";
import InsertLinkIcon from "@material-ui/icons/InsertLink";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import {
  deleteRef,
  showSnackbar,
  addFavorite
} from "../../actions/refsActions";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import RefEditButton from "./RefEditButton";

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

  onFavoriteClick = row_id => {
    this.props.addFavorite(row_id, this.props.auth.user.id);
    this.setState({ isFavorite: !this.state.isFavorite });
  };

  state = {
    to: "",
    isFavorite: false
  };

  componentDidMount() {
    this.setState({
      to: this.props.to,
      isFavorite: this.props.row.favorites.find(
        f => f === this.props.auth.user.id
      )
        ? true
        : false
    });
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
        <TableCell style={{ paddingRight: "0px" }}>
          {row.isFolder ? (
            row.isPrivate ? (
              <FolderIcon />
            ) : (
              <FolderSharedIcon />
            )
          ) : (
            <InsertLinkIcon />
          )}
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
            <TableCell
              numeric={true}
              style={{ paddingRight: "5px", textAlign: "center" }}
            >
              <RefEditButton
                name={row.name}
                row={row}
                description={row.description}
                isPrivate={row.isPrivate}
              />
            </TableCell>
            <TableCell
              numeric={true}
              style={{ paddingRight: "5px", textAlign: "center" }}
            >
              {!row.isFolder ? (
                <CopyToClipboard style={{ cursor: "pointer" }} text={row.name}>
                  <FileCopyIcon
                    onClick={this.handleOpenSnackbar.bind(this, "Link copied")}
                  />
                </CopyToClipboard>
              ) : null}
            </TableCell>
            <TableCell
              numeric={true}
              style={{ paddingRight: "5px", textAlign: "center" }}
            >
              <IconButton
                className={classes.button}
                aria-label="Delete"
                color="primary"
                style={{ cursor: "pointer" }}
              >
                <DeleteIcon
                  onClick={this.onDeleteClick.bind(this, row._id, "delete")}
                >
                  delete
                </DeleteIcon>
              </IconButton>
            </TableCell>
          </React.Fragment>
        ) : (
          <TableCell>
            {this.state.isFavorite ? (
              <FavoriteIcon
                style={{ color: "red", cursor: "pointer" }}
                onClick={this.onFavoriteClick.bind(this, row._id)}
              />
            ) : (
              <FavoriteBorderIcon
                style={{ cursor: "pointer" }}
                onClick={this.onFavoriteClick.bind(this, row._id)}
              />
            )}
          </TableCell>
        )}
      </TableRow>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteRef, showSnackbar, addFavorite }
)(withStyles(styles)(RefRow));
