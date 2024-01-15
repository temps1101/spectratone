"use client"
import {useState} from "react";
import useAnimationFrame from "@/hooks/useAnimationFrame";
import useAnalyzer from "@/hooks/useAnalyzer";

const Home = () => {
    const [spectroOpacities, setSpectroOpacities] = useState<number[]>(Array(12).fill(0))
    const [spectroOpacitiesTemp, setSpectroOpacitiesTemp] = useState<number[]>(Array(12).fill(0))
    const [isRunning, setIsRunning] = useState<boolean>(false)

    const {loop, audioContextRef} = useAnalyzer(setSpectroOpacities)
    useAnimationFrame(isRunning, loop)

    return (
        <main className="p-1 w-screen h-screen grid grid-cols-11 gap-1">
            <div className="col-span-5 row-span-1 grid grid-rows-12 gap-1">
                {
                    spectroOpacities.map((opacity, index) => (
                        <div
                            className="text-indigo-900 text-4xl flex items-center justify-center"
                            style={{backgroundColor: `rgba(79, 70, 229, ${opacity})`}}
                            key={index}
                        >{`×${index+1}`}
                        </div>
                    ))
                }
            </div>
            <div className="col-span-1 row-span-1 grid grid-rows-12 gap-1">
                <h1 className="row-span-6 text-2xl text-indigo-900 sm:text-5xl flex items-center justify-center [writing-mode:vertical-lr]">
                    &quot;spectratone&quot;
                </h1>
                <button className="row-span-3 text-2xl font-bold flex items-center justify-center [writing-mode:vertical-lr]"
                        onClick={async () => {
                            setIsRunning(!isRunning)
                            if (audioContextRef.current?.state === "suspended") {
                                await audioContextRef.current?.resume()
                            }
                        }}
                >
                    {isRunning ? "stop" : "start"}
                </button>
                <button className="row-span-3 text-2xl font-bold flex items-center justify-center [writing-mode:vertical-lr]" onClick={() => setSpectroOpacitiesTemp(spectroOpacities)}>
                    freeze↑
                </button>
            </div>
            <div className="col-span-5 row-span-1 grid grid-rows-12 gap-1">
                {
                    spectroOpacitiesTemp.map((opacity, index) => (
                        <div
                            className="text-indigo-900 text-4xl flex items-center justify-center"
                            style={{backgroundColor: `rgba(79, 70, 229, ${opacity})`}}
                            key={index}
                        >{`×${index+1}`}
                        </div>
                    ))
                }
            </div>
        </main>
    )
}

export default Home