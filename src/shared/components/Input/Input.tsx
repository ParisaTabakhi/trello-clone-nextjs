"use client";

import React from "react";
import { Button } from "../Button/Button";
import "./_input.scss";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onCancel?: () => void;
  submitLabel?: string;
  showCancel?: boolean;
  autoFocus?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  actionsClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  onSubmit,
  onCancel,
  submitLabel = "Add",
  showCancel = false,
  autoFocus = false,
  containerClassName = "",
  inputClassName = "",
  actionsClassName = "",
  ...props
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // ⭐⭐ مهم: جلوگیری از انتشار رویداد به والدین
    e.stopPropagation();
    
    if (e.key === "Enter") {
      e.preventDefault(); // جلوگیری از رفتار پیش‌فرض مرورگر
      onSubmit();
    }
    if (e.key === "Escape" && onCancel) {
      e.preventDefault();
      onCancel();
    }
  };

  return (
    <div className={`input-field-container ${containerClassName}`}>
      <input
        type="text"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className={`input-field ${inputClassName}`}
        {...props}
      />

      <div className={`input-field-actions ${actionsClassName}`}>
        <Button variant="primary" size="sm" onClick={onSubmit}>
          {submitLabel}
        </Button>
        {showCancel && onCancel && (
          <Button variant="secondary" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};