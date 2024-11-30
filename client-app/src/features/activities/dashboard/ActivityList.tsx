import React, {useState} from "react";
import { Activity } from "../../../app/models/activity";
import { Button, Item, Label, Segment } from "semantic-ui-react";

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity : (id: string) => void;
    submitting : boolean;
}

export default function ActivityList({ activities, selectActivity, deleteActivity, submitting}: Props) {

    const [target, setTarget] = useState('');

    function handleDelete(e: React.MouseEvent<HTMLButtonElement>, id: string)
    {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='view' color='blue' onClick={()=> selectActivity(activity.id)}/>
                                <Button floated='right' content='delete' color='red' name={activity.id}
                                    loading={submitting && target === activity.id}
                                    onClick={(e)=> handleDelete(e, activity.id)}/>
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}