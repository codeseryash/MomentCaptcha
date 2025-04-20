export interface FileTreeNode {
  name: string;
  path: string;
  type: string;//'file' | 'folder';
  isImage: boolean;
  filesAndFolder?: FileTreeNode[];
  File?:File;
  expanded?: boolean;
}