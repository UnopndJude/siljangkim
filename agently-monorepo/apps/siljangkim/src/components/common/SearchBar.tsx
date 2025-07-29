import React from 'react'
import { Button } from '@/components/ui/button'

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
}

export function SearchBar({
  placeholder = "지역 또는 코디네이터 이름으로 검색",
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
      />
      <Button type="submit" size="lg" className="px-8">
        검색
      </Button>
    </form>
  )
}