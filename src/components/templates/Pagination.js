"use client";
import { Button } from "@/components/atoms/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight 
} from "lucide-react";

export default function Pagination({ page, setPage, totalPages }) {
  const canGoPrevious = page > 1;
  const canGoNext = page < totalPages;

  const goToFirstPage = () => setPage(1);
  const goToPreviousPage = () => setPage(prev => Math.max(1, prev - 1));
  const goToNextPage = () => setPage(prev => Math.min(totalPages, prev + 1));
  const goToLastPage = () => setPage(totalPages);

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={goToFirstPage}
          disabled={!canGoPrevious}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={goToPreviousPage}
          disabled={!canGoPrevious}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={goToNextPage}
          disabled={!canGoNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={goToLastPage}
          disabled={!canGoNext}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}