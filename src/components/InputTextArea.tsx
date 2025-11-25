import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface InputTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string | boolean | null | undefined;
  className?: string;
}

export const InputTextArea = ({ label, error, className, ...props }: InputTextAreaProps) => {
  return (
    <div>
      {label && (
        <Label htmlFor={props.id} className="mb-2.5 block">
          {label}
        </Label>
      )}
      <Textarea
        {...props}
        className={cn(
          'w-full rounded-md border px-3 py-2 text-sm shadow-sm',
          error && 'border-red-500 ring-1 ring-red-500',
          className,
        )}
      />
      {error && <p className="ml-1 mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
