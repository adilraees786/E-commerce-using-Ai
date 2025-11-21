import { useEffect, useState } from 'react';
import '../App.css';

const PageLoader = ({ isLoading }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isLoading) {
            setIsVisible(true);
            // 2-3 seconds ke baad loader hide karein
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 2500); // 2.5 seconds

            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (!isVisible && !isLoading) return null;

    return (
        <div className={`page-loader ${!isLoading ? 'fade-out' : ''}`}>
            {/* Spinner loader - circular */}
            <div className="loader-spinner"></div>

            {/* Dots loader - modern look */}
            {/* <div className="loader-dots">
                <div className="loader-dot"></div>
                <div className="loader-dot"></div>
                <div className="loader-dot"></div>
            </div> */}
        </div>
    );
};

export default PageLoader;