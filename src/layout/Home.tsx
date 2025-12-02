import { useState, useEffect } from "react";
import { Console } from "../components/Console";
import { FileInput } from "../components/FileInput";

export function Home() {
    const [asciiArt, setAsciiArt] = useState<string | null>(null);

    useEffect(() => {}, [asciiArt]);

    return (
        <>
            <Console content={asciiArt} />
            <FileInput setFinalArt={setAsciiArt} />
        </>
    );
}
