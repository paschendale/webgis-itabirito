import { DragEventHandler, MouseEventHandler } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { Button } from "./styles";

interface MapButtonProps {
    onClick?: MouseEventHandler;
    onDrag?: DragEventHandler;
    children?: React.ReactNode;
}

export default function MapButton({onClick,onDrag,children}: MapButtonProps) {

    return (
        <>
            <Button key={JSON.stringify(Date.now())} onClick={onClick} onDrag={onDrag}>
                {children}
            </Button>
        </>
    )
}