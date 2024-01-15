import {Dispatch, SetStateAction, useCallback, useEffect, useRef} from "react"

const useAnalyzer = (setSpectroOpacities: Dispatch<SetStateAction<number[]>>) => {
    const audioContextRef = useRef<AudioContext | undefined>();
    const analyserNodeRef = useRef<AnalyserNode | undefined>();
    const dataArrayRef = useRef<Uint8Array | undefined>(undefined);
    useEffect(() => {
        (async () => {
            if (!audioContextRef.current) audioContextRef.current = new AudioContext()
            if (!analyserNodeRef.current) {
                const stream = await navigator.mediaDevices.getUserMedia({audio: true});
                const input = audioContextRef.current.createMediaStreamSource(stream);
                analyserNodeRef.current = audioContextRef.current.createAnalyser();

                analyserNodeRef.current.fftSize = 2048;
                dataArrayRef.current = new Uint8Array(analyserNodeRef.current.frequencyBinCount);

                input.connect(analyserNodeRef.current!);
            }
        })()
    })

    const loop = useCallback(() => {
        analyserNodeRef.current!.getByteFrequencyData(dataArrayRef.current!)
        const maxidx = dataArrayRef.current!.findIndex(v => v === Math.max(...dataArrayRef.current!))!

        setSpectroOpacities(Array(12).fill(0).map((_, index) => (
            dataArrayRef.current![maxidx * (index+1)] / 255
        )))
    }, [setSpectroOpacities])

    return {loop, audioContextRef}
}

export default useAnalyzer