import React, { useState } from "react";
import { Input } from "../../../shared/components/Input/Input";
import { Button } from "../../../shared/components/Button/Button";
import "../styles/_list.scss";

interface InlineCreateProps {
  triggerLabel: string;
  placeholder: string;
  confirmLabel: string;
  onCreate: (value: string) => void;
  className?: string;
}

export const InlineCreate: React.FC<InlineCreateProps> = ({
  triggerLabel,
  placeholder,
  confirmLabel,
  onCreate,
  className = "",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onCreate(trimmed);
    setValue("");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue("");
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <Button
        variant="inline"
        className={className}
        onClick={() => setIsEditing(true)}
      >
        {triggerLabel}
      </Button>
    );
  }

  return (
    <Input
      value={value}
      onChange={setValue}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      placeholder={placeholder}
      submitLabel={confirmLabel}
      showCancel
      containerClassName={className}
    />
  );
};