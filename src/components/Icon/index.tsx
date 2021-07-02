import React, { useCallback } from 'react';

interface Props {
  name: string;
}

const Icon: React.FC<Props> = (props) => {
  const { name } = props;

  const getIcon = useCallback(() => {
    switch (name) {
      case 'telegram':
        return null;
      case 'instagram':
        return null;
      case 'smushortcut':
        return null;
      default:
        return <span className="material-icons-round">{name}</span>;
    }
  }, [name]);

  return getIcon();
};

export default Icon;
