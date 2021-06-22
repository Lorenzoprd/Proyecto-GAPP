import Helmet from 'react-helmet';
import { NavLink, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import RandomQuestions from './RandomQuestions';
import LastQuestions from './LastQuestions';
import HotQuestions from './HotQuestions';
import './Home.css';
import NotAnsweredQuestions from './NotAnsweredQuestions';
import Search from './Search';
import { useSelector } from 'react-redux';
import bienvenido from './images/bienvenido2.png';

function Home() {
    const isLoggedIn = useSelector((u) => !!u.user.token);
    const user = useSelector((u) => u.user.info);
    const history = useHistory();
    if (!isLoggedIn) {
        return <Redirect to="/landing" />;
    } else {
        history.push('/lastquestions');
    }

    return (
        user && (
            <>
                <div className="home-grid">
                    <div
                        className="home-welcome"
                        style={{ backgroundImage: `url(${bienvenido})` }}
                    />

                    <div className="home">
                        <Helmet>
                            <title>Welcome to GAPP</title>
                        </Helmet>
                        <Search />
                    </div>
                    <div className="home-questions-answers">
                        <div className="home-tabs-div">
                            <div className="home-tabs">
                                {user.rol === 'expert' ||
                                    (user.rol === 'admin' && (
                                        <NavLink
                                            to={'/notanswered'}
                                            activeClassName="active-not"
                                            className="tab-not"
                                        >
                                            Not Answered
                                        </NavLink>
                                    ))}
                                <NavLink
                                    to={`/allquestions`}
                                    activeClassName="active"
                                >
                                    All
                                </NavLink>
                                <NavLink
                                    to={`/lastquestions`}
                                    exact
                                    activeClassName="active"
                                >
                                    Last
                                </NavLink>
                                <NavLink
                                    to={`/hotquestions`}
                                    exact
                                    activeClassName="active"
                                >
                                    Hot
                                </NavLink>
                            </div>
                            <div className="content">
                                <Switch>
                                    <Route path={`/notanswered`} exact>
                                        <NotAnsweredQuestions />
                                    </Route>
                                    <Route path={`/allquestions`} exact>
                                        <RandomQuestions />
                                    </Route>
                                    <Route path={`/lastquestions`} exact>
                                        <LastQuestions />
                                    </Route>
                                    <Route path={`/hotquestions`} exact>
                                        <HotQuestions />
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    );
}

export default Home;
