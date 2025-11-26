import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | boolean | null | undefined;
  className?: string;
}

export const InputField = ({ label, error, className, ...props }: InputFieldProps) => {
  return (
    <div>
      {label && (
        <Label htmlFor={props.id} className="mb-2.5 block text-left">
          {label}
        </Label>
      )}
      <Input {...props} className={cn(error && 'border-red-500 ring-1 ring-red-500 ', className)} />

      {error && <p className="mt-1.5 ml-1 text-sm text-left text-red-500">{error}</p>}
    </div>
  );
};
