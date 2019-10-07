import React from "react";
import { List, Image } from "semantic-ui-react";

export default class SelectableItemsList extends React.Component {
    static counter = 0;

    render() {
        return (
        <List className={this.props.customClass}>
            {this.props.items && this.props.items.map((item) => {
                return (
                <List.Item 
                        key={item.id + (SelectableItemsList.counter++).toString()}
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