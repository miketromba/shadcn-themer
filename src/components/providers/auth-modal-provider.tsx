'use client'

import * as React from 'react'

type AuthModalContextValue = {
	isOpen: boolean
	mode: 'login' | 'signup'
	openAuthModal: (mode?: 'login' | 'signup') => void
	closeAuthModal: () => void
}

const AuthModalContext = React.createContext<AuthModalContextValue>({
	isOpen: false,
	mode: 'login',
	openAuthModal: () => {},
	closeAuthModal: () => {}
})

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
	const [isOpen, setIsOpen] = React.useState(false)
	const [mode, setMode] = React.useState<'login' | 'signup'>('login')

	const openAuthModal = React.useCallback(
		(authMode: 'login' | 'signup' = 'login') => {
			setMode(authMode)
			setIsOpen(true)
		},
		[]
	)

	const closeAuthModal = React.useCallback(() => {
		setIsOpen(false)
	}, [])

	const value = React.useMemo(
		() => ({ isOpen, mode, openAuthModal, closeAuthModal }),
		[isOpen, mode, openAuthModal, closeAuthModal]
	)

	return (
		<AuthModalContext.Provider value={value}>
			{children}
		</AuthModalContext.Provider>
	)
}

export function useAuthModal() {
	const context = React.useContext(AuthModalContext)
	if (!context) {
		throw new Error('useAuthModal must be used within AuthModalProvider')
	}
	return context
}
