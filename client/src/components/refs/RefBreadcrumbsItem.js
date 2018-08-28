import React, { Component } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";

class RefBreadcrumbsItem extends Component {
  render() {
    const { folder, id } = this.props;
    return (
      <React.Fragment>
        <span> > </span>
        <Link to={id}>
          {folder.name === "root" ? <HomeIcon /> : folder.name}
        </Link>
      </React.Fragment>
    );
  }
}

export default RefBreadcrumbsItem;
