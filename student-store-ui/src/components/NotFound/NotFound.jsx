import "./NotFound.css"
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const history = useNavigate()
    const handleGoBack = () => {
        history('/')
    }
    return (
        <div className="notfound-content">Page not found.
        <button onClick={handleGoBack} className="go-back">Go Back</button></div>
    )
}