import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";

class RefBreadcrumbs extends Component {
  generateBreadcrumbs = arr => {
    if (arr.length === 0) return;
    arr = arr.map(folder => (
      <React.Fragment>
        <span>></span>{" "}
        <Link to={folder.name === "root" ? "home" : folder.id}>
          {folder.name === "root" ? <HomeIcon /> : folder.name}
        </Link>
      </React.Fragment>
    ));
    if (this.props.refs._id)
      arr.push(
        <React.Fragment>
          <span>></span>{" "}
          <Link to={this.props.refs._id}>{this.props.refs.name} </Link>
        </React.Fragment>
      );
    return arr;
  };

  render() {
    const { breadcrumbs } = this.props;
    return (
      <div style={{ float: "left", marginTop: "20px", marginLeft: "30px" }}>
        {breadcrumbs && this.generateBreadcrumbs(breadcrumbs)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  breadcrumbs: state.refs.breadcrumbs,
  refs: state.refs.refs
});

export default connect(mapStateToProps)(RefBreadcrumbs);
