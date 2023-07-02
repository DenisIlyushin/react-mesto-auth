import {useEffect} from 'react';

export default function useCloseOnEsc({ isOpen, onClose }) {
  useEffect(()=> {
    function handleCloseOnEsc(event) {
      if (event.key === 'Escape') { onClose() }
    }

    if (!isOpen) {
      return
    }
    document.addEventListener('keyup', handleCloseOnEsc)
    return () => {
      document.removeEventListener('keyup', handleCloseOnEsc)
    }
  })
}