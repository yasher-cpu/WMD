import { useState } from "react";
import { Card, Button } from "react-bootstrap";


export default function CourseCard({coursesData}){

  const {_id, imgLink, name, description, price} = coursesData;

    return(
    <Card className="w-100 p-2 mx-2 my-2 shadow card-height">
      <Card.Img variant="top" src={imgLink || "https://networkslearning.com/wp-content/uploads/2020/02/Screenshot-2020-02-15-at-15.54.25.png"} className="center-crop"/>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Card.Subtitle>Price</Card.Subtitle>
        <Card.Text>
          {price}
        </Card.Text>
        <Card.Footer>
        <Button variant="primary" className="w-100 rounded-pill">Enroll</Button>
        </Card.Footer>
        
      </Card.Body>
    </Card>
    )
}
