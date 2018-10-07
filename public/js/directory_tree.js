import React, { Component } from 'react';
import AnimateHeight from 'react-animate-height';

import '../scss/directory_tree.scss';

class DirectoryTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      metadata: this.props.metadata
    };
    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleTab() {
    this.state.metadata.collapsed = !this.state.metadata.collapsed;
    this.setState({
      metadata: this.state.metadata
    });
  }

  render() {
    const className = this.state.metadata.collapsed ? "DirectoryTree collapsed" : "DirectoryTree";
    return (
      <div className={className} ref="myself">
        <p className="tab clickable" onClick={this.toggleTab}>{this.state.metadata.title}</p>
        <AnimateHeight
          duration={500}
          height={this.state.metadata.collapsed ? 0 : 'auto'}>
          <div className="directory-contents" ref="directoryContents">
            { this.state.metadata.childrenMetadata.map( (metadata, i) => {
              if (metadata.isDirectory) {
                return <DirectoryTree metadata={metadata} key={i}/>;
              }
              else {
                return <p className="clickable" key={i}>{metadata.title}</p>;
              }
            } )}
          </div>
        </AnimateHeight>
      </div>
    );
  }
}

export default DirectoryTree;