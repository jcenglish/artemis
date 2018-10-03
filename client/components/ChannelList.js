import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import ChannelListItem from "./ChannelListItem";
import List from "@material-ui/core/List";
import { fetchUserChannels } from "../reducers/channel";

class ChannelList extends Component {
  constructor() {
    super();
    this.state = {
      differentChannelSelected: false,
      channelId: ""
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(channelId) {
    //TODO: Implement a check for whether the user is already on the channel selected
    console.log("Clicked");
    this.setState({
      differentChannelSelected: true,
      channelId
    });
  }

  componentDidMount() {
    this.props.fetchUserChannels(this.props.userId);
  }

  render() {
    const { channels } = this.props;
    return this.state.differentChannelSelected ? (
      <Redirect to={`/channel/${this.state.channelId}`} />
    ) : (
      <div>
        <List>
          {channels.map(channel => (
            <ChannelListItem
              key={channel.id}
              channel={channel}
              handleClick={() => this.handleClick(channel.id)}
            />
          ))}
        </List>
      </div>
    );
  }
}

const mapState = state => {
  return {
    channels: state.channels.userChannels,
    userId: state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    fetchUserChannels: userId => dispatch(fetchUserChannels(userId))
  };
};

export default connect(
  mapState,
  mapDispatch
)(ChannelList);
