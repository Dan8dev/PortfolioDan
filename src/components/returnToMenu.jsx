export const ReturnToMenu = () => {
    return (
        <p className="inline-block m-2 p-1 rounded-md bg-white" onClick={() => window.location.assign('/menu')}>
            Return
        </p>
    );
}