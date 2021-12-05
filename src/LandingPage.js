import { Link } from 'react-router-dom'

export const LandingPage = () => {
    return (
        <div>
             <p align="center">
                This is a Page
                </p>
            
                    <Link to="/newpage">
                      aaaa
                    </Link>
                    <br/>
                    <Link to="/">
                      MAP
                    </Link>
                
        </div>
    )
}