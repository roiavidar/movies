import React from "react";
import { List, Image } from "semantic-ui-react";
import "./SelectableList.scss";

export default class SelectableList extends React.Component {
    static counter = 0;

    render() {
        return (
        <List className={"selectable-list " + this.props.customClass}>
            {this.props.items && this.props.items.map((item) => {
                return (
                <List.Item 
                        key={item.id + (SelectableList.counter++).toString()}
                        onClick={() => { this.props.select(item.id, false) }}
                        className={"cursor-pointer"}>
                            <Image avatar src={item.image} />
                            <List.Content>
                                <List.Header>{item.title}</List.Header>
                                {item.content}
                            </List.Content>
                </List.Item>)
            })}
        </List>)
  }
}