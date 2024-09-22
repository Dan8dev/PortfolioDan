export function MenuButton({ text, href }) {
    return (
        <a
            className="nes-btn hover:scale-110"
            href={href}
        >
            {text}
        </a>
    );
}