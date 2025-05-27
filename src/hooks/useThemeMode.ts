import {useEffect,useCallback} from 'react'
import {createGlobalState} from 'react-hooks-global-state'

type ThemeState = {
	isDarkmode: boolean
}

const initialState: ThemeState = {isDarkmode: false}
const {useGlobalState} = createGlobalState(initialState)

export const useThemeMode = () => {
	const [isDarkMode,setIsDarkMode] = useGlobalState('isDarkmode')

	const toDark = useCallback((): void => {
		setIsDarkMode(true)
		const root = document.querySelector('html')
		if (!root) return
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		!root.classList.contains('dark') && root.classList.add('dark')
		localStorage.setItem('theme','dark')
	},[setIsDarkMode])

	const toLight = useCallback((): void => {
		setIsDarkMode(false)
		const root = document.querySelector('html')
		if (!root) return
		root.classList.remove('dark')
		localStorage.setItem('theme','light')
	},[setIsDarkMode])

	// Khởi tạo theme
	useEffect(() => {
		const savedTheme = localStorage.getItem('theme')
		if (savedTheme === 'dark') {
			toDark()
		} else {
			toLight()
		}
	},[toDark,toLight])

	const _toggleDarkMode = useCallback((): void => {
		if (localStorage.getItem('theme') === 'light') {
			toDark()
		} else {
			toLight()
		}
	},[toDark,toLight])

	return {
		isDarkMode,
		toDark,
		toLight,
		_toggleDarkMode,
	}
}
