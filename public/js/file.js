class FileMetadata {
  constructor(title, isDirectory, collapsed, childrenMetadata) {
    this.title = title;
    this.isDirectory = isDirectory;
    this.collapsed = collapsed;
    this.childrenMetadata = childrenMetadata;
  }

  static makeNoteMetadata(title) {
    return new FileMetadata(title, false, false, []);
  }

  static makeFolderMetadata(title, collapsed, childrenMetadata) {
    return new FileMetadata(title, true, collapsed, childrenMetadata || []);
  }

}

export default FileMetadata;