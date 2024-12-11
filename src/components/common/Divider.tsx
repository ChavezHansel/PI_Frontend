import React from "react";

const Divider: React.FC = () => {
    return (
        <div className="flex items-center justify-center">
            <span className="h-px w-1/4 bg-gray-300"></span>
            <span className="text-gray-500 px-4 text-sm">o continúa con</span>
            <span className="h-px w-1/4 bg-gray-300"></span>
        </div>
    );
};

export default Divider;
