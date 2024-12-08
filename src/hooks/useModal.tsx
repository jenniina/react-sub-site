import { FC, createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { ModalProps } from '../interfaces'

interface ModalContextType {
  modal: ModalProps | null
  setModal: (modal: ModalProps | null) => void
  show: ({ children }: { children: ReactNode }) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [modal, setModal] = useState<ModalProps | null>(null)

  const show = ({ children }: { children: ReactNode }) => {
    setModal({ children })
  }

  return (
    <ModalContext.Provider value={{ modal, setModal, show }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
