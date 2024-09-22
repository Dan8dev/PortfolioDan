import { useEffect, useState, useRef } from "react";

export function TextAboutMe({ textAboutMe }) {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        if (index < textAboutMe.length) {
            const timeout = setTimeout(() => {
                setText(prev => prev + textAboutMe[index]);
                setIndex(prev => prev + 1);

                if (containerRef.current) {
                    containerRef.current.scrollTop = containerRef.current.scrollHeight;
                }
            }, 75);

            return () => clearTimeout(timeout);
        }
    }, [index, text]);

    const handleSetFullText = () => {
        setText(textAboutMe);
        setIndex(textAboutMe.length);
    }

    return (
        <main
            ref={containerRef}
            className="md:w-7/12 h-44 md:h-56 lg:h-64 xl:h-auto xl:overflow-auto overflow-y-scroll bg-gray-nes"
            onClick={handleSetFullText}
        >
            <p className="w-full text-center md:text-left bg-gray-nes lg:text-base xl:text-xl">
                {text}
            </p>
        </main>
    );
}