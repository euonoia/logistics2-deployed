import { Link } from 'react-router-dom'

export default function Homepage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Hello World</h1>
      <p>Welcome to your React + TypeScript app!</p>
      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  )
}
