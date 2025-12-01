import { useState, useCallback } from "react";

export interface UseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

/**
 * Custom hook for managing a single modal state
 * @param initialState - Initial open state (default: false)
 * @returns Object with isOpen state and control functions
 * 
 * @example
 * const modal = useModal();
 * 
 * // Usage:
 * <Button onClick={modal.open}>Open Modal</Button>
 * <Modal open={modal.isOpen} onClose={modal.close} />
 */
export function useModal(initialState = false): UseModalReturn {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}
