import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="">
        <input
          type={type}
          className={cn(
            'flex h-10 w-full mobile:!text-base text-sm !border-b-2 border-l-0 border-r-0 border-t-0 border-stone-700 bg-transparent px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:ring-stone-500 focus:border-stone-500 focus:ring-stone-500 focus-visible:outline-none focus-visible:ring-stone-500  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }

export interface AltInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: JSX.Element
  endAdornment?: JSX.Element
}

const AltInput = React.forwardRef<HTMLInputElement, AltInputProps>(
  ({ className, type, startAdornment, endAdornment, ...props }, ref) => {
    const hasAdornment = Boolean(startAdornment) || Boolean(endAdornment)
    return (
      <>
        {hasAdornment ? (
          <div
            className="flex h-10 w-full !border-b-2 border-l-0 border-r-0 border-t-0 border-stone-700 bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:ring-stone-500 focus:border-stone-500 focus:ring-stone-500 focus-visible:outline-none focus-visible:ring-stone-500  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50"
            data-disabled={props.disabled}
          >
            {startAdornment && <div className={cn('text-muted-foreground')}>{startAdornment}</div>}
            <input
              type={type}
              className={cn(
                'flex h-full w-full mobile:!text-base  bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:ring-stone-500 focus:border-stone-500 focus:ring-stone-500 focus-visible:outline-none focus-visible:ring-stone-500  focus-visible:ring-offset-8 disabled:cursor-not-allowed disabled:opacity-50',
                className,
              )}
              ref={ref}
              {...props}
            />
            {endAdornment && <div className={cn('text-muted-foreground')}>{endAdornment}</div>}
          </div>
        ) : (
          <input
            type={type}
            className={cn(
              'flex h-10 w-full mobile:!text-base !border-b-2 border-l-0 border-r-0 border-t-0 border-stone-700 bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:ring-stone-500 focus:border-stone-500 focus:ring-stone-500 focus-visible:outline-none focus-visible:ring-stone-500  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              className,
            )}
            ref={ref}
            {...props}
          />
        )}
      </>
    )
  },
)
AltInput.displayName = 'AltInput'

export { AltInput }
