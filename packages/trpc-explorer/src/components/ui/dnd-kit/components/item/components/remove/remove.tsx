import React from 'react';

import {Action, ActionProps} from '../action/action';
import  { XIcon } from "lucide-react";

export function Remove(props: ActionProps) {
  return (
    <Action
      {...props}
      active={{
        fill: 'rgba(255, 70, 70, 0.95)',
        background: 'rgba(255, 70, 70, 0.1)',
      }}
    >
      <XIcon size={16} />
    </Action>
  );
}
