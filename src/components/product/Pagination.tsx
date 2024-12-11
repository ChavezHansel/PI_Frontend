import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
type PaginationProps = {
    currentPage: number;
    handlePageChange: (value: number) => void;
    totalPages: number;
    className?: string;
};
const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    handlePageChange,
    totalPages,
    className,
}) => {
    return (
        <div
            className={`flex justify-center md:justify-end items-center gap-2 ${className}`}
        >
            <button
                className={`p-2 h-8 w-8 flex items-center justify-center rounded ${
                    currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-blue-600 hover:bg-gray-200"
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <IoIosArrowBack />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                    <button
                        key={page}
                        className={`p-2 h-8 w-8 flex items-center justify-center rounded ${
                            currentPage === page
                                ? "bg-blue-600 text-white"
                                : "text-blue-600 hover:bg-gray-200"
                        }`}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                className={`p-2 h-8 w-8 flex items-center justify-center rounded ${
                    currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-blue-600 hover:bg-gray-200"
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <IoIosArrowForward />
            </button>
        </div>
    );
};

export default Pagination;
