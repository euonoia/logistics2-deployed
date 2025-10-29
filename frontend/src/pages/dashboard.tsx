import { Link } from 'react-router-dom'
export default function Dashboard() {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Dashboard</h1>
      <p>This is your dashboard page!</p>
      <Link to="/about">Go to About</Link>
    </div>
  )
}
