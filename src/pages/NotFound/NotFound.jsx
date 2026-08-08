import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="container">
        <h1 className="nf-code">404</h1>
        <h2 className="nf-title">الصفحة غير موجودة</h2>
        <p className="nf-text">عذراً، الصفحة التي تبحثين عنها غير موجودة أو تم نقلها.</p>
        <Link to="/"><Button variant="primary" size="lg">العودة للرئيسية</Button></Link>
      </div>
    </div>
  )
}
