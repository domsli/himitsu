import React, { Component } from 'react';
import ReactQuill from 'react-quill';

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: ''
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.saveContent = this.saveContent.bind(this);
  }

  onTitleChange(event) {
    this.setState({
      title: event.target.value
    });
  }

  onContentChange(value) {
    this.setState({
      content: value
    });
  }

  saveContent(event) {
    alert('Saving the content: ' + this.state.content);
    alert('Save the title: ' + this.state.title);
  }

  render() {
    return (
      <div className="Note">
        <input type="text" onChange={this.onTitleChange}/>
        <ReactQuill
          value={this.state.content}
          onChange={this.onContentChange}/>
        <button onClick={this.saveContent}>Save</button>
      </div>
    )
  }
};

export default Note;
