import {useState} from 'react';

export default function useHover() {
  const [hovering, setHovering] = useState(false);

  const mouseOver = () => setHovering(true);
  const mouseLeave = () => setHovering(false);

  return [hovering, {
    onMouseOver: mouseOver,
    onMouseLeave: mouseLeave
  }]
};
