import React, { useEffect, RefObject } from 'react'

function OutsideClick(ref: RefObject<HTMLElement>, callback: () => void) {
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                callback();
            }
        }
        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick)
        }
    }, [ref, callback])

}

export default OutsideClick