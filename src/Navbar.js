import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        
            <div className="container-fluid navbar-container">
        <nav className="navbar navbar-expand-lg navbar-toggleable-md">

          <Link className="navbar-brand" to="/"><h1>Easy Mailing</h1></Link>

           <button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
       

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to="/create">Compose</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/history">History</Link>
            </li>
          </ul>
       </div>
      </nav>
    </div>
        
      );
}
 
export default Navbar;