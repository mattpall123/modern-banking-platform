import ReactMarkdown from 'react-markdown'

export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ ...props }) => <p className="mb-2 last:mb-0" {...props} />,
        strong: ({ ...props }) => <strong className="font-semibold" {...props} />,
        ul: ({ ...props }) => <ul className="mb-2 list-disc pl-5" {...props} />,
        ol: ({ ...props }) => <ol className="mb-2 list-decimal pl-5" {...props} />,
        li: ({ ...props }) => <li className="mb-1" {...props} />,
        code: ({ ...props }) => (
          <code className="rounded bg-neutral-100 px-1 py-0.5 text-[0.85em]" {...props} />
        ),
        a: ({ ...props }) => (
          <a className="text-marigold-600 underline" target="_blank" rel="noreferrer" {...props} />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  )
}
