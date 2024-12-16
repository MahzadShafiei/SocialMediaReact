import React from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer (function ActivityDashboard() {

    const {activityStore} = useStore();
    const {editMode, selectedActivity} = activityStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetail/>}
                
                {editMode &&
                <ActivityForm/>}
            </Grid.Column>
        </Grid>
    )
})