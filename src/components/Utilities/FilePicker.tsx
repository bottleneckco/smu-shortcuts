import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import Icon from '../Icon';

interface Props {
  handleFiles: (files: FileList) => void;
  onFailure?: () => void;
  fileType?: string;
  customPlaceholder?: string;
}

const Wrapper = styled.div`
  label {
    display: inline-block;
    cursor: pointer;
    background-color: ${(props) => props.theme.icon.background};
    border-radius: 8px;
    width: 50%;
    max-width: 450px;
    padding: 12px;
  }

  .message {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: ${(props) => props.theme.text900};
    overflow: hidden;
    text-overflow: ellipsis;

    .text {
      font-weight: 500;
    }
  }

  .placeholder {
    color: ${(props) => props.theme.text600};
  }

  .material-icons-round {
    padding-right: 8px;
  }
`;

const FilePicker: React.FC<Props> = (props) => {
  const { customPlaceholder, fileType, handleFiles, onFailure } = props;
  const [newLabel, setNewLabel] = useState<string | null>(null);
  const [labelClassName, setLabelClassName] = useState('');

  const placeholder = useMemo(() => {
    if (newLabel) {
      setLabelClassName('message');
      return newLabel;
    }
    setLabelClassName('message placeholder');
    return customPlaceholder
      ? customPlaceholder
      : 'Choose a file from your computer';
  }, [customPlaceholder, newLabel]);

  const handleSuccess = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;

      if (files === null || files.length === 0) {
        if (onFailure) {
          onFailure();
        }
        return;
      }

      if (files.length > 1) {
        setNewLabel(`${files.length} files`);
      }
      setNewLabel(files[0].name);

      handleFiles(files);
    },
    [handleFiles, onFailure]
  );

  return (
    <Wrapper>
      <input
        id="upload-file"
        type="file"
        placeholder={placeholder}
        onChange={handleSuccess}
        hidden
        accept={fileType}
      />
      <label htmlFor="upload-file">
        <span className={labelClassName}>
          <Icon name="file_upload" />
          <span className="text">{placeholder}</span>
        </span>
      </label>
    </Wrapper>
  );
};

export default FilePicker;
