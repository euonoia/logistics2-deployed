import { Link } from 'react-router-dom'
export default function aboutpage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem', fontFamily: 'sans-serif' }}>
      <h1>About</h1>
      <p>This is your about page!</p>
      <Link to="/">Go to Home</Link>
    </div>
  )
}
