import React, { Fragment, useEffect, useState } from 'react';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {

  const [activities, setActivities]= useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
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
  setSubmitting(true);

  if(activity.id)
  {
    agent.activities.update(activity).then(() => {      
      setActivities([...activities.filter(c=> c.id !== activity.id), activity]);
      setEditMode(false);
      setSubmitting(false);
      setSelectedActivity(activity);
    });
  }
  else
  {
    activity.id= uuid();
    agent.activities.create(activity).then(() => 
    {
      setActivities([...activities, activity]);
      setEditMode(false);
      setSubmitting(false);
      setSelectedActivity(activity);
    })
  } 
}

function handleDeleteActivity(id: string)
{
  setSubmitting(true);
  agent.activities.delete(id).then(() => {
    setActivities(activities.filter(c=> c.id !== id));
    setSubmitting(false);
  });  
}

  useEffect(() =>{
    agent.activities.list().then(Response => {
      let activites : Activity[]=[];
      Response.forEach(c=> 
        {
          c.date = c.date.split('T')[0];
          activites.push(c);
        });
      setActivities(activites);
      setLoading(false);
    })
  }, [])

if(loading)
  return (<LoadingComponent content='Loading List'/>)

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
      deleteActivity ={handleDeleteActivity}
      submitting ={submitting}/>
      </Container>           
    </Fragment>
  );
}

export default App;
