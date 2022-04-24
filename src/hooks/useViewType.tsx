import { useState } from 'react';

export default function useViewType() {
  const [type, setType] = useState<ViewType>((localStorage.getItem('VIEW_TYPE') as ViewType) || 'card');

  const toggleType = (type: ViewType) => {
    localStorage.setItem('VIEW_TYPE', type);
    setType(type);
  };

  return [type, toggleType] as const;
}
