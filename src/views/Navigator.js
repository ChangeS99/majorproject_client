import { Fragment, useEffect, useState } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';

import { connect } from 'react-redux';

//toast
import { ToastContainer } from 'react-toastify';

// views
import Auth from './auth/Auth';
import Hospital from './hospital/Hospital';
import Dashboard from './hospital/Dashboard';

// redux actions
import {
    reSigninUser
} from '../actions/user/authentication';
import {
    setHospital
} from '../actions/hospital/information';

//components
import Navbar from '../components/layout/Navbar';
import Body from '../components/layout/Body';
import { MainContainer, Header, Footer, SubHeader, FixedMargin } from '../style/container';
import DashboardNav from '../components/layout/DashboardNav';


const Navigator = ({ reSigninUser, user, setHospital, hospital }) => {

    const [loading, setLoading] = useState(true);

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("user");
        if (token) {
            reSigninUser(token).then(() => {
                setHospital().then((data) => {
                    setLoading(false);
                    console.log(data);
                })
                    .catch(error => {
                        console.log(error);
                        setLoading(false);

                    })
            }).catch(error => {
                setLoading(false);
                if (location.pathname === "/") {
                    history.push("/auth/signin");
                }
            })
        } else {
            setLoading(false);
            if (location.pathname === "/") {
                history.push("/auth/signin");
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <Fragment>
        <Body>
            <ToastContainer />
            {
                loading ? null : <Header>
                    <Navbar hospital={hospital} user={user} />
                </Header>
            }
            {
                location.pathname.includes("dashboard") && hospital.name ?
                    <Fragment>
                        <SubHeader>
                            <DashboardNav hospital={hospital} />
                        </SubHeader>
                        {/* <FixedMargin value="1rem" /> */}
                    </Fragment> : <FixedMargin value="5rem" />
            }

            <MainContainer>
                {
                    loading ? <h1>Loading</h1> :
                        <Fragment>
                            <Switch>
                                <Route path="/exist" exact component={() => <div><h1>You exist!</h1></div>} />


                                <Route path="/auth/:authMode" exact component={Auth} />


                                <Route path="/auth/:authMode/:token" exact component={Auth} />


                                <Route path="/hospital/:hospitalMode" exact component={Hospital} />

                                <Route path="/hospital/:hospitalMode/activate/:activateToken" exact component={Hospital} />

                                <Route path="/hospital/register/configure/:token" exact component={Hospital} />

                                <Route path="/hospital/:hospitalName/dashboard/:dashmode" exact component={Dashboard} />

                                <Route path="/hospital/:hospitalName/dashboard/:dashmode/:crudmode" exact component={Dashboard} />

                                <Route path="/" exact component={() => <>
                                    <div className="main-container-info">
                                        <div>
                                            <h1>Major Project</h1>
                                            <h3>By Sanjem Pranim Luyang</h3>
                                        </div>
                                    </div>
                                </>} />

                                <Route path='*' component={() => <h1>404 LMAO </h1>}>
                                </Route>
                            </Switch>
                        </Fragment>
                }
            </MainContainer>
            <Footer>
                <div className="footer-github-logo">
                    <a
                        title="github profile"
                        href="https://github.com/ChangeS99"
                        target="_blank" rel="noreferrer">
                        <i className="fab fa-github-square">
                        </i>
                    </a>
                </div>
                <div className="footer-email">
                    <p>luyangpranim@gmail.com</p>
                </div>
            </Footer>
        </Body>
    </Fragment>
}

const mapStateToProps = (state) => {
    console.log("Navigator: ", state);
    return {
        user: state.user,
        hospital: state.hospital
    }
}

export default connect(mapStateToProps, {
    reSigninUser,
    setHospital
})(Navigator);