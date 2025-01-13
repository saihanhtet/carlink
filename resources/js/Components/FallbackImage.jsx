import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

// Enhanced ImageWithFallback Component
export const ImageWithFallback = ({ src, alt, className }) => {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            {isLoading && !hasError && (
                <Skeleton className="w-full h-full min-h-[250px] rounded-none bg-gray-300" />
            )}
            {!hasError && (
                <img
                    src={src}
                    alt={alt}
                    className={`${className} ${isLoading ? "hidden" : "block"}`}
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        setHasError(true);
                        setIsLoading(false);
                    }}
                />
            )}
            {hasError && (
                <Skeleton className="w-full h-full min-h-[250px] rounded-none bg-gray-300 flex items-center justify-center">
                    <span className="text-sm text-gray-500">Image not available</span>
                </Skeleton>
            )}
        </>
    );
};
