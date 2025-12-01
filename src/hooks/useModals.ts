import { useState, useMemo } from "react";

export interface ModalControl {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export type ModalsState<T extends string> = Record<T, ModalControl>;

/**
 * Custom hook for managing multiple modals with a single hook
 * @param modalNames - Array of modal identifiers
 * @returns Object with modal controls for each modal name
 * 
 * @example
 * const modals = useModals(['create', 'update', 'delete']);
 * 
 * // Usage:
 * <Button onClick={modals.create.open}>Create</Button>
 * <Modal open={modals.create.isOpen} onClose={modals.create.close} />
 * 
 * <Button onClick={modals.update.open}>Update</Button>
 * <Modal open={modals.update.isOpen} onClose={modals.update.close} />
 */
export function useModals<T extends string>(
  modalNames: readonly T[]
): ModalsState<T> {
  // Initialize state with all modals closed
  const initialState = useMemo(
    () =>
      modalNames.reduce((acc, name) => {
        acc[name] = false;
        return acc;
      }, {} as Record<T, boolean>),
    [modalNames]
  );

  const [openStates, setOpenStates] = useState<Record<T, boolean>>(initialState);

  // Create control functions for each modal
  const modals = useMemo(() => {
    const result = {} as ModalsState<T>;

    modalNames.forEach((name) => {
      result[name] = {
        isOpen: openStates[name],
        open: () => {
          setOpenStates((prev) => ({ ...prev, [name]: true }));
        },
        close: () => {
          setOpenStates((prev) => ({ ...prev, [name]: false }));
        },
        toggle: () => {
          setOpenStates((prev) => ({ ...prev, [name]: !prev[name] }));
        },
      };
    });

    return result;
  }, [modalNames, openStates]);

  return modals;
}
