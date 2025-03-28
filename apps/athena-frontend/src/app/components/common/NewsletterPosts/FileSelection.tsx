interface FileSelectionProps {
  onFileAdded: (file: File) => void;
  ref: React.MutableRefObject<HTMLInputElement | null>;
}

export function FileSelection(props: FileSelectionProps) {
  const { onFileAdded, ref } = props;

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _files = event.target.files;
    if (!_files || _files.length === 0) return;
    const fileLen = _files ? _files.length : 0;

    for (let f = 0; f < fileLen; f++) {
      const file = _files.item(f);
      if (!file) return;
      onFileAdded(file);
    }
  };

  return (
    <input
      type="file"
      multiple
      ref={ref}
      style={{ display: 'none' }}
      name="media"
      onChange={handleFileSelection}
    />
  );
}
