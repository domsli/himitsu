import React, { Component } from 'react';
import AnimateHeight from 'react-animate-height';

import '../scss/directory_tree.scss';

class DirectoryTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      collapsed: this.props.collapsed, // defaults to false
      files: this.props.files || [] // list of Objects { title, isDirectory, collapsed, files }
    };
    this.addFile = this.addFile.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
  }

  addFile(title, isDirectory) {
    const file = { title: title, isDirectory: isDirectory, files: [] }
    const files = this.state.files.concat([file]);
    this.setState({
      files
    });
  }

  toggleTab() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const className = this.state.collapsed ? "DirectoryTree collapsed" : "DirectoryTree";
    return (
      <div className={className} ref="myself">
        <p className="tab clickable" onClick={this.toggleTab}>{this.props.title}</p>
        <AnimateHeight
          duration={500}
          height={this.state.collapsed ? 0 : 'auto'}>
          <div className="directory-contents" ref="directoryContents">
            { this.state.files.map( (file, i) => {
              if (file.isDirectory) {
                return <DirectoryTree title={file.title} files={file.files} collapsed={file.collapsed} key={i}/>;
              }
              else {
                return <p className="clickable" key={i}>{file.title}</p>;
              }
            } )}
          </div>
        </AnimateHeight>
      </div>
    );
  }
}

export default DirectoryTree;