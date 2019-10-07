import React from "react";
import { Card, Image } from "semantic-ui-react";

export default class MovieCard extends React.Component {
  render() {
    return (this.props.movie ? <Card className={"m-auto"}> 
        <Image src={this.props.movie.image} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{this.props.movie.title}</Card.Header>
          <Card.Meta>
            <span>{this.props.movie.rating + " // " + this.props.movie.length + " // " + this.props.movie.year}</span>
          </Card.Meta>
          <Card.Description>
            {this.props.movie.plot}
          </Card.Description>
        </Card.Content>
        </Card> : null)
  }
}