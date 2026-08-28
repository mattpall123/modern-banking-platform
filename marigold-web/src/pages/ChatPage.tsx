import { useEffect, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { sendChatMessage } from '../api/chat'
import { ChatBubble } from '../components/chat/ChatBubble'
import { ChatInput } from '../components/chat/ChatInput'
import { Spinner } from '../components/ui/Spinner'
import { Card } from '../components/ui/Card'
import { getErrorMessage } from '../lib/errors'

type Message = {
  role: 'user' | 'assistant' | 'error'
  content: string
}

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)

  const chatMutation = useMutation({
    mutationFn: sendChatMessage,
    onSuccess: (response) => {
      setMessages((current) => [...current, { role: 'assistant', content: response.reply }])
    },
    onError: (error) => {
      setMessages((current) => [
        ...current,
        { role: 'error', content: getErrorMessage(error, 'Something went wrong, try again.') },
      ])
    },
  })

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, chatMutation.isPending])

  const handleSend = (message: string) => {
    setMessages((current) => [...current, { role: 'user', content: message }])
    chatMutation.mutate(message)
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-10rem)] max-w-2xl flex-col gap-4">
      <div>
        <h1 className="font-display text-2xl font-semibold text-text">Marigold AI Assistant</h1>
        <p className="text-sm text-text-muted">
          Ask about your accounts, transactions, or bank policies. Conversations aren't saved between visits.
        </p>
      </div>
      <Card className="flex flex-1 flex-col gap-3 overflow-y-auto">
        {messages.length === 0 && (
          <p className="m-auto text-sm text-text-muted">Try asking "What's my balance?" or "How do disputes work?"</p>
        )}
        {messages.map((message, i) => (
          <ChatBubble key={i} role={message.role} content={message.content} />
        ))}
        {chatMutation.isPending && (
          <div className="flex justify-start">
            <div className="rounded-xl border border-border bg-surface px-4 py-2.5">
              <Spinner size={16} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </Card>
      <ChatInput onSend={handleSend} disabled={chatMutation.isPending} />
    </div>
  )
}
