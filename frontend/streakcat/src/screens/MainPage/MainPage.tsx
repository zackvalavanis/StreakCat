import { useEffect, useState } from "react"
import { CatMainPage } from "./CatMainPage"
import './MainPage.css'
import type { Task } from "../../Types/types"
import toast from 'react-hot-toast'
import { UseAuth } from "../../Auth/UseAuth"
import ReactMarkdown from 'react-markdown'
import { useNavigate } from "react-router"

export function MainPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const token = localStorage.getItem('access_token')
  const { user } = UseAuth()
  const navigate = useNavigate()
  const [refreshKey, setRefreshKey] = useState(0)
  const now = new Date()
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  const api = import.meta.env.VITE_BACKEND_API


  useEffect(() => {
    if (!token) {
      toast("Please login to see info on tasks", { id: 'login-toast' })
      return;
    }
    const handleFetchTasks = async () => {
      try {
        const res = await fetch(`${api}/tasks/me`, {
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
  }, [refreshKey])


  useEffect(() => {
    if (token && user) {
      setChatHistory([{
        role: 'assistant',
        content: `Hello ${user.first_name}, I'm your personal assistant Whiskers 🐱 Ask me anything about your tasks and schedule!`
      }])
    }
  }, [user])

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
      const res = await fetch(`${api}/chat`, {
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
        setRefreshKey(prev => prev + 1)
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
      {token && user ? (
        <div>

        </div>
      ) : (
        <div>
          <h2 style={{ marginTop: '20px', marginBottom: '20px', fontFamily: 'DM Sans' }}>Log in to ask Whiskers about your schedule</h2>
          <button className='btn-login' onClick={() => navigate('/login-page')}>Login</button>
        </div>
      )}
      {token && user && (
        <div className="chat-container">
          <div className="chat-messages">
            {chatHistory.map((msg, i) => (
              <div style={{ textAlign: 'left' }} key={i} className={`chat-bubble ${msg.role}`}>
                <strong className='name-bubble'>{msg.role === 'user' ? user.first_name : 'Whiskers'}</strong>
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            ))}
            {isLoading && <div style={{ textAlign: 'left' }} className="chat-bubble assistant"><b>Whiskers Thinking...</b></div>}
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
      {token && user && (
        <div className='tasks-container'>
          <h2>Today's Tasks</h2>
          {tasks.filter(task => String(task.time_start).split('T')[0] === today).length === 0 ? (
            <p>No tasks today</p>
          ) : (
            tasks.map((task) => {
              const taskDate = String(task.time_start).split('T')[0]
              return taskDate === today ? (
                <p key={task.id}>{task.task_name} {task.completed ? '✅' : '❌'}</p>
              ) : null
            })
          )}
        </div>
      )}
    </div>
  )
}