// Libraries
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

// JS
import Note from './note';
import DirectoryTree from './directory_tree';
import FileMetadata from './file'

// Styles
import '../scss/style.scss';

$(document).ready(() => {
  ReactDOM.render(<Note/>, document.getElementById("note-react"));
  
  const childrenMetadata = [
    FileMetadata.makeNoteMetadata('hello'),
    FileMetadata.makeNoteMetadata('Another'),
    FileMetadata.makeFolderMetadata('Folder 2', true, [
        FileMetadata.makeNoteMetadata('world'),
        FileMetadata.makeFolderMetadata('Folder 3', true, [
            FileMetadata.makeNoteMetadata('Note'),
            FileMetadata.makeNoteMetadata('Note 2')
          ]),
        FileMetadata.makeNoteMetadata('This is going to be a fiarly long one. Should extend more than one line'),
        FileMetadata.makeNoteMetadata('But there is more!'),     
      ]),
    FileMetadata.makeNoteMetadata('Great stuff!'),
  ];
  const metadata = FileMetadata.makeFolderMetadata('Folder', true, childrenMetadata);
  ReactDOM.render(<DirectoryTree
    metadata={metadata}/>, document.getElementById("directory-tree-react"));
});
