import { useEffect } from "react"
import useTimeout from "./useTimeout"

export default function useDebounce(callback: Function, delay: number, dependencies: Array<string | number | ConstantSourceNode>) {
    const { reset, clear } = useTimeout(callback, delay)
    useEffect(reset, [...dependencies, reset]) //reset when dependencies change
    useEffect(clear, [])//to stop it from running on the first render
}
