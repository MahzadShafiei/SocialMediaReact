import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid} from 'uuid';

function App() {

  const [activities, setActivities]= useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  
function handleSelectActivity(id: string)
{
  setSelectedActivity(activities.find(c=> c.id === id));
}

function handleCancelActivity()
{
  setSelectedActivity(undefined);
}

function handleFormOpen(id? : string)
{
id ? handleSelectActivity(id) : handleCancelActivity();
setEditMode(true);
}

function handleFormClose()
{  
  setEditMode(false);  
}

function handleCreateOrEditActivity(activity: Activity)
{
  activity.id ? setActivities([...activities.filter(c=> c.id !== activity.id), activity]):
    setActivities([...activities, {...activity, id: uuid()}]);

    setEditMode(false);
    setSelectedActivity(activity);
}

function handleDeleteActivity(id: string)
{
  setActivities(activities.filter(c=> c.id !== id));
}

  useEffect(() =>{
    axios.get<Activity[]>('http://localhost:5000/api/Acitivities')
    .then(Response => {
      setActivities(Response.data);
    })
  }, [])

  return (
    <Fragment>
      <NavBar 
      formOpen={handleFormOpen}/>
      <Container style={{marginTop:'7em'}}>
      <ActivityDashboard 
      activities={activities}
      selectedActivity = {selectedActivity}
      selectActivity={handleSelectActivity}
      cancelSelectActivity={handleCancelActivity}
      editMode = {editMode}
      formOpen={handleFormOpen}
      formClose={handleFormClose}
      createOrEditActivity ={handleCreateOrEditActivity}
      deleteActivity ={handleDeleteActivity}/>
      </Container>           
    </Fragment>
  );
}

export default App;
