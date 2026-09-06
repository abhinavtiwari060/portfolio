import React from "react";
import { Loader2, FolderOpen, AlertCircle, RefreshCw } from "lucide-react";
import ClayButton from "./ClayButton";

export const LoadingState: React.FC<{ message?: string }> = ({
  message = "Loading portfolio content...",
}) => {
  return (
    <div className="w-full min-h-[300px] flex flex-col items-center justify-center p-8 text-center">
      <div className="w-12 h-12 rounded-2xl bg-charcoal-800 border border-white/10 flex items-center justify-center text-orange-400 mb-4 shadow-clay-pill animate-pulse">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
      <p className="text-sm font-medium text-charcoal-300">{message}</p>
    </div>
  );
};

export const EmptyState: React.FC<{
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}> = ({
  title = "No items found",
  description = "There are no entries currently available in this section.",
  actionText,
  onAction,
}) => {
  return (
    <div className="w-full min-h-[260px] flex flex-col items-center justify-center p-8 text-center clay-card border border-dashed border-white/10">
      <div className="w-12 h-12 rounded-2xl bg-charcoal-800/80 border border-white/5 flex items-center justify-center text-charcoal-400 mb-3">
        <FolderOpen className="w-6 h-6" />
      </div>
      <h4 className="text-base font-bold text-white mb-1">{title}</h4>
      <p className="text-xs text-charcoal-400 max-w-sm mb-4 leading-relaxed">{description}</p>
      {actionText && onAction && (
        <ClayButton variant="primary" size="sm" onClick={onAction}>
          {actionText}
        </ClayButton>
      )}
    </div>
  );
};

export const ErrorState: React.FC<{
  title?: string;
  message?: string;
  onRetry?: () => void;
}> = ({
  title = "Something went wrong",
  message = "Unable to fetch data from the server. Please check your connection and try again.",
  onRetry,
}) => {
  return (
    <div className="w-full min-h-[260px] flex flex-col items-center justify-center p-8 text-center clay-card border border-rose-500/20">
      <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center justify-center mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h4 className="text-base font-bold text-white mb-1">{title}</h4>
      <p className="text-xs text-charcoal-400 max-w-sm mb-5 leading-relaxed">{message}</p>
      {onRetry && (
        <ClayButton
          variant="secondary"
          size="sm"
          onClick={onRetry}
          icon={<RefreshCw className="w-3.5 h-3.5" />}
        >
          Try Again
        </ClayButton>
      )}
    </div>
  );
};
