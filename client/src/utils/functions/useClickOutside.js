import { useEffect, useRef } from 'react';

export default function useClickOutside(handler) {
    let domNode = useRef()

    useEffect(() => {
        let onActiveHandler = (e) => {
            if(!domNode.current.contains(e.target)) {
               handler()
            }
        } 
        document.addEventListener('mousedown', onActiveHandler);
        return () => {
            document.removeEventListener('mousedown', onActiveHandler)
        }
    });
    return domNode
}