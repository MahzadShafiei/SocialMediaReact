import { action, makeAutoObservable, observable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid} from 'uuid';

export default class ActivityStore{    
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false
    loadingInitial = false;

    constructor()
    {
        makeAutoObservable(this)
    }

    get activitiesByDate ()
    {
        return Array.from(this.activityRegistry.values())
        .sort((a,b) => Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivities = async () =>{
        this.setLoadingInitial(true);

        try {
            const activities = await agent.activities.list();
            activities.forEach(c=> 
                {
                  c.date = c.date.split('T')[0];
                  this.activityRegistry.set(c.id, c);
                });
                this.setLoadingInitial(false);

        } catch (error) {
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectActivity = (id : string) => {
        this.selectedActivity = this.activityRegistry.get(id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity= undefined;
    }

    openForm = (id? : string) =>{
        id? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }
    
    closeForm = () =>{
        this.editMode = false;
    }

    createActivity = async (activity: Activity) =>{
        try {
            this.loading = true;
            activity.id = uuid();
            await agent.activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {                
                this.loading = false;
            })
        }    
    }

    updateActivity = async (activity: Activity) =>{
        try {
            this.loading = true;           
            await agent.activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {                
                this.loading = false;
            })
        }    
    }

    deleteActivity = async(id: string) =>
    {
        try {
            this.loading = true;
            await agent.activities.delete(id);
            runInAction(() => {
                this.loading = false;
                this.activityRegistry.delete(id);

                if(this.selectedActivity?.id === id)
                    {
                        this.cancelSelectedActivity();
                        this.editMode = false;
                    }
            })
        } catch (error) {
            runInAction(() => {

            })
        }        
    }
}