import { useState, useEffect } from "react";

export default function HomeScreen() {
    const[isNowLoading, setIsNowLoading] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                setIsNowLoading(true)
            }
        };

        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (isNowLoading) {
            setTimeout(() => {
                window.location.assign('/menu');
            }, 2000);
        }
    }, [isNowLoading])
    
    return (
        <main
            className="w-screen h-screen relative bg-no-repeat bg-350% md:bg-170% lg:bg-cover bg-center"
            style={{backgroundImage: `${isNowLoading ? `url('')` : `url('/img/bgMain.png')`}`}}
        >
		    {
                isNowLoading ? (
                    <section className={`${ isNowLoading ? 'animate-fade animate-duration-5000 animate-ease-linear animate-normal animate-fill-forwards' : ''} w-full h-full flex justify-center items-center lg:justify-end lg:items-end lg:p-5`}>
                        <p className="text-base md:text-xl lg:text-2xl xl:text-3xl text-white">Now Loading ...</p>
                    </section>
                ) : (
                    <>
                        <div className="absolute inset-0 mix-blend-multiply bg-zinc-400"></div>
                        <section className="relative z-10 w-full h-full flex flex-col justify-center items-center gap-16 md:gap-24 lg:gap-20 text-center text-white bg-transparent">
                            <h1 className="text-4xl md:text-5xl xl:text-7xl uppercase bg-clip-text">Daniel Meneses</h1>
                            <span className="text-sm md:text-xl xl:text-2xl border-b-2 border-teal-500 bg-clip-text">Web Developer <i className="snes-logo"></i></span>
                            <button
                                type="button"
                                className="nes-btn is-primary animate-bounce"
                                onClick={() => setIsNowLoading(true)}
                            >
                                Press Enter
                            </button>
                        </section>
                    </>
                )
            }
	    </main>
    );
}