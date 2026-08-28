import { useState, type FormEvent } from 'react'
import { Send } from 'lucide-react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'

type ChatInputProps = {
  onSend: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    onSend(trimmed)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="flex-1">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask about your accounts or Marigold Bank policies..."
          disabled={disabled}
        />
      </div>
      <Button type="submit" disabled={disabled || !value.trim()} aria-label="Send">
        <Send size={16} />
      </Button>
    </form>
  )
}
