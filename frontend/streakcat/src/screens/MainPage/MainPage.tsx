import { useEffect, useState } from "react"
import { CatMainPage } from "./CatMainPage"
import './MainPage.css'
import type { Task } from "../../Types/types"
import toast from 'react-hot-toast'

export function MainPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const token = localStorage.getItem('access_token')


  useEffect(() => {
    if (!token) {
      toast("Please login to see info on tasks", { id: 'login-toast' })
      return;
    }
    const handleFetchTasks = async () => {
      try {
        const res = await fetch(`http://localhost:8000/tasks/me`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        const data = await res.json();
        if (res.ok) {
          setTasks(data)
        } else {
          console.log('Failed to fetch tasks.')
        }
      } catch (error) {
        console.error('Failed to fetch tasks', error)
      }
    }
    handleFetchTasks();
  }, [])

  const handleSend = async () => {
    if (!message.trim()) return
    if (!token) {
      toast('Please login first', { id: 'login-toast' })
      return
    }
    const userMessage = { role: 'user', content: message }
    setChatHistory(prev => [...prev, userMessage])
    setMessage('')
    setIsLoading(true)

    try {
      const res = await fetch('http://localhost:8000/chat', {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
      })
      const data = await res.json()
      if (res.ok) {
        setChatHistory(prev => [...prev, { role: 'assistant', content: data.reply }])
      } else {
        toast.error("Failed to get a response")
      }
    } catch (error) {
      console.error('Chat error', error)
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='main-page'>
      <CatMainPage />
      {token ? (
        <div>
          <h1>
            Chat Bot Regarding Your Schedule
          </h1>
          <h1>Ask Whiskers about your schedule</h1>
        </div>
      ) : (
        <div>
          <h1>Log in to ask whiskers about your schedule</h1>
        </div>
      )
      }
      {token && (
        <div className="chat-container">
          <div className="chat-messages">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`chat-bubble ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            {isLoading && <div className="chat-bubble assistant">Thinking...</div>}
          </div>

          <div className="chat-input">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about your tasks..."
            />
            <button onClick={handleSend} disabled={isLoading}>Send</button>
          </div>
        </div>
      )}
    </div>
  )
}