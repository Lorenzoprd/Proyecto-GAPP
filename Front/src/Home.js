import Helmet from 'react-helmet';
import Register from './Register';

import { Link } from 'react-router-dom';
import Search from './Search';

function Home() {
  return (
    <div>
      <div className="home">
        <h1>GAPP</h1>
        <Helmet>
          <title>Welcome to GAPP</title>
        </Helmet>
        This is the motherfreakin' programming utlimate search engine
      </div>
      <div>
        <Search />
      </div>
      <div>
        <Register />
      </div>
    </div>
  );
}

export default Home;