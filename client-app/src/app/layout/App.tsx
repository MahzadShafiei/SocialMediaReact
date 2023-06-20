import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header , List} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {

  const [activities, setActivities]= useState<Activity[]>([]);
  
  useEffect(() =>{
    axios.get<Activity[]>('http://localhost:5000/api/Acitivities')
    .then(Response => {
      setActivities(Response.data);
    })
  }, [])

  return (
    <Fragment>
      <NavBar/>
      <Container style={{marginTop:'7em'}}>
      <ActivityDashboard activities={activities}/>
      </Container>           
    </Fragment>
  );
}

export default App;
