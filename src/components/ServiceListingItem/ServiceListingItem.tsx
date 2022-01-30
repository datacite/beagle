import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

import './ServiceListingItem.css';

export interface ServiceListingData {
    id: string;
    doi: string;
    name: string;
    description: string;
    creators: string[];
}

type Props = {
    service: ServiceListingData;
};

export const ServiceListingItem: React.FunctionComponent<Props> = ({ service }) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title><Link to={"/services/" + service.doi}>{service.name}</Link></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{service.creators.join(", ")}</Card.Subtitle>
                <Card.Text>
                    {service.description}
                </Card.Text>
                <Card.Link href={service.id}>Access Service</Card.Link>
            </Card.Body>
        </Card >
    )
}

export default ServiceListingItem;
