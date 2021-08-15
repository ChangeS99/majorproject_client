import { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

// components
import SetLocation from '../location/SetLocation';
import Information from './Information';

//action
import { resetMarker } from '../../actions/hospital/location';

import server from '../../axiosConfig';
import { ConfButton } from '../../style/button';
import { ConfigureCont } from '../../style/hospital/hospital__styles';

const mapApiKey = process.env.REACT_APP_MAPBOX_API_KEY;

mapboxgl.accessToken = mapApiKey;

const Configure = ({ token, marker, resetMarker }) => {

  // const [proceed, setProceed] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emails, setEmails] = useState({});

  useEffect(() => {
    server.post("/hospital/register/verify", {
      token
    }).then(response => {
      setLoading(false);
      setError(null);
      setEmails({
        userEmail: response.data.email,
        hospitalEmail: response.data.hospitalEmail
      })
      console.log(response.data)
    }).catch(error => {
      if (error.response) {
        // console.log(error.response.data);
        setLoading(false);
        setError(error.response.data.error);
      } else {
        setLoading(false);
        setError("Network error.")
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const nextStepHandler = () => {
    if (marker.lng) {
      setStep((value) => value + 1);
      // setProceed(false);
    } else {
      setError("Please set a marker on the map first before clicking next.")
    }
  }

  const prevStepHandler = () => {
    if (step === 1) {
      return;
    }

    resetMarker();
    setStep(value => value - 1);
  }

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   setProceed(true);
  // }


  const nextButtonCondition = () => {
    if(marker.lng) {
      if(step === 2) {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  }

  const StepConditionRendering = () => {
    switch (step) {
      case 1: return <SetLocation token={token} />;
      case 2: return <Information emails={emails} token={token} />;
      default: return <h1>{error}</h1>
    }
  }

  const ConditionalRendering = () => {
    if (loading) {
      return <h1>loading...</h1>
    } else if (error) {
      return <h1>{error}</h1>
    } else {
      return (
        <Fragment>
          <div>
            {
              StepConditionRendering()
            }
          </div>
          <div>
            {error ? error : null}
          </div>
          <div className="conf_button_cont">
            {
              step !== 1 ? <ConfButton onClick={prevStepHandler}>prev</ConfButton> : null
            }

            <ConfButton disabled={nextButtonCondition()} onClick={nextStepHandler}>next</ConfButton>
          </div>
        </Fragment>
      )
    }
  }


  return (
    <ConfigureCont>
      {
        ConditionalRendering()
      }
    </ConfigureCont>
  )
}

const mapStateToProps = state => {
  console.log("in configure: ", state);

  return {
    marker: state.marker
  }
}

export default connect(mapStateToProps, {
  resetMarker
})(Configure);