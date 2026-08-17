import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {

  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState('')
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false)
  const [backendStatus, setBackendStatus] = useState('checking')

  useEffect(() => {
    fetch('http://localhost:3001/health')
      .then(res => setBackendStatus(res.ok? 'online': 'offline'))
      .catch(() => setBackendStatus('offline'));
  }, [])

  const handleClick = async () => {
    setLoading(true);
    try{
      const response = await fetch('http://localhost:3001/tailor', {
        method: 'POST',
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({jobDescription, resume})
      }) 

      const data = await response.json()
      setSummary(data.summary)

    } catch(err){
      console.error(err);
    } finally {
      setLoading(false)
    }
 
  }

  return (
    <div className="app">
      <div className="app-header">
        <h1>JobBot</h1>
        <div className={`status ${backendStatus}`}>
          <span className="status-dot" />
          {backendStatus}
        </div>
      </div>

      <div className="card">
        <div className="field">
          <label htmlFor="job-description">Job description</label>
          <textarea
            id="job-description"
            placeholder="Paste job description here"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="resume">Resume</label>
          <textarea
            id="resume"
            placeholder="Paste your resume here"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />
        </div>

        <button className="submit-btn" type="button" onClick={() => handleClick()} disabled={loading}>
          {loading ? 'Generating..' : 'Submit'}
        </button>
      </div>

      {summary && <p className="summary">{summary}</p>}
    </div>
  )
}

export default App