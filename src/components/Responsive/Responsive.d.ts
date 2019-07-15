import * as React from 'react'

export interface ResponsiveProps {
  children: (
    screenSize: string,
    width: number,
  ) => React.ReactNode | React.ReactNode
  maximum?: string
  minimum?: string
  resizeInterval?: number
  screenSizes: { [key: string]: number }
}

export declare const Responsive: React.ComponentType<ResponsiveProps>
