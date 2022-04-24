import { useEffect, useState } from 'react';

export default function useViewType() {
  const [type, setType] = useState<ViewType>('card');

  const toggleType = (type: ViewType) => {
    localStorage.setItem('VIEW_TYPE', type);
    setType(type);
  };

  useEffect(() => {
    setType((localStorage.getItem('VIEW_TYPE') as ViewType) || 'card');
  }, []);

  return [type, toggleType] as const;
}
