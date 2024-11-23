import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    formOpen: (id: string) => void;
    formClose: () => void;
    createOrEditActivity: (activity: Activity) => void;
    deleteActivity : (id: string) => void;
}

export default function ActivityDashboard({ activities, selectedActivity, selectActivity, 
    cancelSelectActivity, editMode, formOpen, formClose, createOrEditActivity, deleteActivity }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList 
                activities={activities}
                selectActivity={selectActivity} 
                deleteActivity ={deleteActivity}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetail 
                activity={selectedActivity}
                cancelActivity={cancelSelectActivity} 
                formOpen={formOpen}/>}
                
                {editMode &&
                <ActivityForm 
                formClose={formClose}
                selectedActivity={selectedActivity}
                createOrEditActivity ={createOrEditActivity}/>}
            </Grid.Column>
        </Grid>
    )
}