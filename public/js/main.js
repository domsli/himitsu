// Libraries
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

// JS
import Note from './note';
import DirectoryTree from './directory_tree';

// Styles
import '../scss/style.scss';

$(document).ready(() => {
  ReactDOM.render(<Note/>, document.getElementById("note-react"));
  
  const files = [
    {title: 'hello', isDirectory: false},
    {title: 'Another', isDirectory: false},
    {title: 'Folder 2', isDirectory: true, collapsed: true, files: [
      {title: 'world', isDirectory: false},
      {title: 'Folder 3', isDirectory: true, collapsed: false, files: [
        {title: 'Note', isDirectory: false},
        {title: 'Note 2', isDirectory: false}
      ]},
      {title: 'This is going to be a fairly long one. Should extend more than one line', isDirectory: false},
      {title: 'But there is more!', isDirectory: false}
    ]}
  ];
  ReactDOM.render(<DirectoryTree
    title={'Folder'}
    files={files}
    collapsed={true}/>, document.getElementById("directory-tree-react"));
});
