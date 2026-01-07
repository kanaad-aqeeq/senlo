"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { HexAlphaColorPicker } from "react-colorful";
import { cn } from "../../lib/cn";
import styles from "./color-picker.module.css";

export interface ColorPickerProps {
  /** Current color value (hex format) */
  value?: string;
  /** Default color value */
  defaultValue?: string;
  /** Callback when color changes */
  onChange?: (value: string) => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * A color picker component with hex input and alpha support.
 * Opens a popover with a visual color picker.
 *
 * @example
 * ```tsx
 * <ColorPicker
 *   value={color}
 *   onChange={setColor}
 * />
 * ```
 */
export const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  ({ value, defaultValue, onChange, className }, ref) => {
    // Internal state for the picker to be smooth and responsive
    const [localColor, setLocalColor] = useState(
      value || defaultValue || "#000000"
    );
    const [isOpen, setIsOpen] = useState(false);
    const [popoverCoords, setPopoverCoords] = useState<{
      vertical: "top" | "bottom";
      horizontal: "left" | "right";
    }>({ vertical: "bottom", horizontal: "left" });

    const internalRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    // Combine forwarded ref and internal ref
    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        (internalRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref]
    );

    // Track the color to avoid redundant updates
    const initialColorRef = useRef(localColor);
    const lastEmittedColorRef = useRef(localColor);

    // Sync internal state when controlled value changes externally (e.g. Undo/Redo)
    useEffect(() => {
      if (value !== undefined) {
        setLocalColor(value);
        lastEmittedColorRef.current = value;
      }
    }, [value]);

    // Handle smart positioning when opened
    useEffect(() => {
      if (isOpen && internalRef.current) {
        const rect = internalRef.current.getBoundingClientRect();
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Popover dimensions (approximate)
        const popoverWidth = 240;
        const popoverHeight = 320;

        const horizontal =
          rect.left + popoverWidth > screenWidth ? "right" : "left";
        const vertical =
          rect.bottom + popoverHeight > screenHeight ? "top" : "bottom";

        setPopoverCoords({ horizontal, vertical });
      }
    }, [isOpen]);

    const handleToggle = useCallback(() => {
      if (!isOpen) {
        initialColorRef.current = localColor;
      }
      setIsOpen((prev) => !prev);
    }, [isOpen, localColor]);

    const emitChange = useCallback(
      (color: string) => {
        if (onChange && color !== lastEmittedColorRef.current) {
          onChange(color);
          lastEmittedColorRef.current = color;
        }
      },
      [onChange]
    );

    const handleClose = useCallback(() => {
      setIsOpen(false);
      emitChange(localColor);
    }, [localColor, emitChange]);

    const handleColorChange = (newColor: string) => {
      setLocalColor(newColor);
    };

    // Trigger update when user finishes dragging or clicking in the picker
    const handlePointerUp = useCallback(() => {
      emitChange(localColor);
    }, [localColor, emitChange]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      const hex = val.startsWith("#") ? val : `#${val}`;
      setLocalColor(hex);
    };

    const handleInputBlur = () => {
      emitChange(localColor);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        emitChange(localColor);
      }
    };

    return (
      <div className={cn(styles.container, className)} ref={setRefs}>
        <div
          className={styles.trigger}
          onClick={handleToggle}
          title="Select color"
        >
          <div
            className={styles.swatch}
            style={{ backgroundColor: localColor }}
          />
          <span className={styles.value}>{localColor}</span>
        </div>

        {isOpen && (
          <>
            <div className={styles.overlay} onClick={handleClose} />
            <div
              ref={popoverRef}
              className={cn(
                styles.popover,
                styles[popoverCoords.horizontal],
                styles[popoverCoords.vertical]
              )}
              onPointerUp={handlePointerUp}
            >
              <HexAlphaColorPicker
                color={localColor}
                onChange={handleColorChange}
              />
              <div className={styles.inputWrapper}>
                <span className={styles.hash}>#</span>
                <input
                  className={styles.hexInput}
                  value={localColor.replace("#", "")}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  onKeyDown={handleInputKeyDown}
                  spellCheck={false}
                />
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
);

ColorPicker.displayName = "ColorPicker";








