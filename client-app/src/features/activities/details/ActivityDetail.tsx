import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
   activity : Activity 
   cancelActivity: () => void;
   formOpen: (id: string) => void;
}

export default function ActivityDetail({activity, cancelActivity, formOpen} : Props){
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
        <Card.Content>
            <Card.Header>{activity.title}</Card.Header>
        <Card.Meta> {activity.date}</Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
        <Card.Content extra>
            <Button.Group widths='2'>
                <Button onClick={()=> formOpen(activity.id)} basic color='blue' content='Edit'/>
                <Button onClick={cancelActivity} basic color='grey' content='Cancel'/>
            </Button.Group>
        </Card.Content>
        </Card.Content>
        </Card>
    )
}