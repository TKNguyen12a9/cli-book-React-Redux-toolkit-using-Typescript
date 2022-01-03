import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store"

export const useAppDispatch = () => useDispatch<AppDispatch>()
// help accessing any app's state
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
