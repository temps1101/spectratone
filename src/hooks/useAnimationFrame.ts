import {useCallback, useEffect, useRef} from "react"

const useAnimationFrame = (isRunning: boolean, callback = () => {}) => {
    const reqIdRef = useRef<number>()
    const loop = useCallback(() => {
        if (isRunning) {
            reqIdRef.current = requestAnimationFrame(loop)
            callback()
        }
    }, [isRunning, callback])

    useEffect(() => {
        reqIdRef.current = requestAnimationFrame(loop)
        return () => cancelAnimationFrame(reqIdRef.current!)
    }, [loop])
}

export default useAnimationFrame