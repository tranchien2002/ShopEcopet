import React from 'react';
import { Card, CardTitle, CardBody, CardHeader, CardFooter, Button } from 'reactstrap';
import 'components/Card/Card.scss';
import 'components/Card/Card.scss';

const ShopCard = (props) => {
  return (
    <div className='card-item '>
      <Card className='maincard'>
        <CardHeader className='card-header'>
          <img alt='...' className='img-center img-fluid item-img' src={props.src} />
        </CardHeader>
        <CardBody>
          <CardTitle>{props.name} </CardTitle>
          Limit: {props.limit}
          <br />
          Price: {props.price} Tomo
        </CardBody>
        <CardFooter>
          <Button color='success'> Buy</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ShopCard;
