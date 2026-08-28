import { clsx } from 'clsx'
import { Markdown } from '../ui/Markdown'

type ChatBubbleProps = {
  role: 'user' | 'assistant' | 'error'
  content: string
}

export function ChatBubble({ role, content }: ChatBubbleProps) {
  const isUser = role === 'user'
  return (
    <div className={clsx('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={clsx(
          'max-w-[75%] rounded-xl px-4 py-2.5 text-sm',
          isUser && 'bg-marigold-500 text-white',
          role === 'assistant' && 'bg-surface border border-border text-text',
          role === 'error' && 'bg-danger-50 text-danger-700 border border-danger-500',
        )}
      >
        {isUser ? <p className="whitespace-pre-wrap">{content}</p> : <Markdown>{content}</Markdown>}
      </div>
    </div>
  )
}
