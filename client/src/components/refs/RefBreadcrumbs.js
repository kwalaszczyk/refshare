import React, { Component } from "react";
import { connect } from "react-redux";
import RefBreadcrumbsItem from "./RefBreadcrumbsItem";

class RefBreadcrumbs extends Component {
  generateBreadcrumbs = arr => {
    if (arr.length === 0) return;
    arr = arr.map(folder => (
      <RefBreadcrumbsItem key={folder.id} folder={folder} id={folder.id} />
    ));
    if (this.props.refs._id)
      arr.push(
        <RefBreadcrumbsItem
          key={this.props.refs._id}
          folder={this.props.refs}
          id={this.props.refs._id}
        />
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
