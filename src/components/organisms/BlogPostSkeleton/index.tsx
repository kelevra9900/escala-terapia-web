import React from 'react'

const Line = ({ className = '' }: { className?: string }) => (
  <div className={`h-4 rounded bg-neutral-200/80 dark:bg-neutral-700/60 ${className}`} />
)

const Circle = ({ className = '' }: { className?: string }) => (
  <div className={`rounded-full bg-neutral-200/80 dark:bg-neutral-700/60 ${className}`} />
)

export default function BlogPostSkeleton() {
  return (
    <div className="pt-8 lg:pt-16 animate-pulse">
      <header className="container flex justify-center rounded-xl">
        <div className="mx-auto w-full max-w-(--breakpoint-md) px-4 sm:px-6">
          <div className="inline-block rounded-full bg-neutral-200/80 dark:bg-neutral-700/60 h-6 w-40 mb-4" />
          <Line className="h-8 sm:h-10 w-11/12 mb-3" />
          <Line className="w-9/12 mb-1" />
          <Line className="w-7/12 mb-6" />

          <div className="h-px w-full bg-neutral-200 dark:bg-neutral-700 my-6" />

          <div className="flex items-center gap-3">
            <Circle className="size-10" />
            <div className="flex-1">
              <Line className="w-40 mb-1" />
              <Line className="w-28 h-3" />
            </div>
            <div className="hidden sm:flex gap-2 ms-auto">
              <Circle className="size-6" />
              <Circle className="size-6" />
              <Circle className="size-6" />
            </div>
          </div>
        </div>
      </header>

      <div className="container my-8 sm:my-12 flex justify-center">
        <div className="mx-auto w-full max-w-(--breakpoint-md) px-4 sm:px-6">
          <div className="w-full aspect-[16/9] rounded-3xl bg-neutral-200/80 dark:bg-neutral-700/60" />
        </div>
      </div>

      <div className="container flex flex-col items-center gap-y-10">
        <div className="mx-auto w-full max-w-(--breakpoint-md) px-4 sm:px-6">
          <Line className="w-11/12 mb-3" />
          <Line className="w-10/12 mb-3" />
          <Line className="w-9/12 mb-6" />
          <Line className="w-11/12 mb-3" />
          <Line className="w-8/12 mb-10" />
        </div>

        <div className="mx-auto w-full max-w-(--breakpoint-md) px-4 sm:px-6 flex gap-2 flex-wrap">
          <div className="h-7 w-16 rounded-full bg-neutral-200/80 dark:bg-neutral-700/60" />
          <div className="h-7 w-20 rounded-full bg-neutral-200/80 dark:bg-neutral-700/60" />
          <div className="h-7 w-24 rounded-full bg-neutral-200/80 dark:bg-neutral-700/60" />
        </div>

        <div className="mx-auto w-full max-w-(--breakpoint-md) px-4 sm:px-6">
          <div className="flex items-center">
            <Circle className="size-12" />
            <div className="ml-4 flex-1">
              <Line className="w-40 mb-2" />
              <Line className="w-56" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

