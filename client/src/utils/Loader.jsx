function Loader({ loadingText }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="flex flex-col items-center">
                {/* Loader */}
                <svg
                    className="animate-spin h-10 w-10 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                </svg>
                <p className="text-white mt-2">{loadingText}</p>
                <span className="text-white mt-1">Thanks for your patience</span>
            </div>
        </div>
    )
}

export default Loader;