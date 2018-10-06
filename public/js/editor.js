import React, { Component } from 'react';
import ReactQuill from 'react-quill';

class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Editor">
        <ReactQuill/>
      </div>
    )
  }
};

export default Editor;
