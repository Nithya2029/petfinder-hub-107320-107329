import { useCallback, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * useModal
 * Simple generic hook to manage modal open/close state, with optional attached data (e.g. selected pet).
 *
 * @param {boolean} [defaultOpen=false] - Initial open state.
 * @returns {{
 *   isOpen: boolean,
 *   open: (data?: any) => void,
 *   close: () => void,
 *   toggle: () => void,
 *   data: any,
 *   setData: (data: any) => void
 * }}
 */
function useModal(defaultOpen = false) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [data, setData] = useState(undefined);

  // PUBLIC_INTERFACE
  const open = useCallback((newData) => {
    setIsOpen(true);
    setData(newData);
  }, []);
  // PUBLIC_INTERFACE
  const close = useCallback(() => {
    setIsOpen(false);
    setData(undefined);
  }, []);
  // PUBLIC_INTERFACE
  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return { isOpen, open, close, toggle, data, setData };
}

export default useModal;
