import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface QuickSuggestionsProps {
  suggestions: string[];
  loadingSuggestions: boolean;
  onSuggestionClick: (suggestion: string) => void;
}

const QuickSuggestions: React.FC<QuickSuggestionsProps> = ({
  suggestions,
  loadingSuggestions,
  onSuggestionClick,
}) => {
  if (suggestions.length === 0 && !loadingSuggestions) {
    return null;
  }

  return (
    <div className="">
      <div className="text-base text-muted-foreground mb-2 opacity-70 flex items-center gap-2">
        <img src="/bondchat.svg" alt="" className="w-4 h-4" />
        <span className="grad font-bold">BondChat</span>
      </div>
      <div className="flex overflow-x-auto scrollbar-hide pb-2 -mx-2 px-2">
        <div className="flex gap-2 flex-nowrap">
          {loadingSuggestions ? (
            <>
              <Skeleton className="h-[32px] w-24 rounded-full flex-shrink-0" />
              <Skeleton className="h-[32px] w-32 rounded-full flex-shrink-0" />
              <Skeleton className="h-[32px] w-28 rounded-full flex-shrink-0" />
            </>
          ) : (
            suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="bg-muted border-2 border-primary cursor-pointer text-foreground px-3 py-2 rounded-full text-xs hover:bg-muted/80 transition-colors whitespace-nowrap flex-shrink-0"
                onClick={() => onSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickSuggestions;
