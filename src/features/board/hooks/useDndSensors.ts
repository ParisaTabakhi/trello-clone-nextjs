'use client';

import {
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { pointerSensorOptions, mouseSensorOptions, touchSensorOptions } from '../lib/dnd-sensors.config';

/**
 * Hook to configure DnD sensors with proper options
 * Separates sensor configuration from component logic (Single Responsibility)
 */
export const useDndSensors = () => {
  const sensors = useSensors(
    useSensor(PointerSensor, pointerSensorOptions),
    useSensor(MouseSensor, mouseSensorOptions),
    useSensor(TouchSensor, touchSensorOptions),
    useSensor(KeyboardSensor)
  );

  return sensors;
};