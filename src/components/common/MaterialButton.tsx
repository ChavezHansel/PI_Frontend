import { Button } from "@material-tailwind/react";
import React from "react";
type MaterialButtonProp = {
    children: string;
    onClick: () => void;
    className: string;
};
const MaterialButton: React.FC<MaterialButtonProp> = ({
    children,
    onClick,
    className,
}) => {
    return (
        <Button onClick={onClick} className={className}>
            {children}
        </Button>
    );
};

export default MaterialButton;
