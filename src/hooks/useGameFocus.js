import { useDispatch } from "react-redux"
import { setFocus } from "redux/gameReducer"

const useGameFocus = target => {
	const dispatch = useDispatch()

	const setGameFocus = () => dispatch(setFocus(target))

	return setGameFocus
}
	
export default useGameFocus