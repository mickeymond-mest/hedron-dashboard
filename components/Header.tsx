import Link from 'next/link';

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <nav className="navbar hedron-navbar" role="navigation" aria-label="main navigation">

    <div className="navbar-menu">
      <div className="navbar-start">
        <div className="navbar-item field">
          <div className="control has-icons-left has-icons-right">
            <input className="input hedron-navbar-search" type="text" placeholder="What do you want to find today?" />
            <span className="icon is-small is-left">
              <i className="material-icons">search</i>
            </span>
          </div>
        </div>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <a href="/api/logout" className="button is-danger">
              <strong>Log Out</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
);
      
export default Header;