import React from "react";
import { SampleAttendee, SampleRoom } from "./testConfig/config";
import { App } from "./App";
import Button from "./components/ui/Button";
import { purgeVoxeetConference } from "./core/voxeet/sdk";
const url = new URL((window as any).location);
const attendee = {
  ...SampleAttendee,
  isConferenceCreator: Boolean(url.searchParams.get("creator")),
  name: url.searchParams.get("id")
    ? `User ${url.searchParams.get("id")}`
    : SampleAttendee.name,
  id: url.searchParams.get("id") || SampleAttendee.id,
};

interface State {
  visible: boolean;
}

export class Root extends React.Component<{}, State> {
  state = {
    visible: true,
  };

  private remount = () => {
    this.setState({ visible: false }, () => {
      setTimeout(() => {
        this.setState({ visible: true });
      }, 1000);
    });
  };

  componentWillMount() {
    purgeVoxeetConference();
  }

  render() {
    return (
      <>
        <Button onClick={this.remount}> Remount </Button>
        {this.state.visible && (
          <App
            apiConfig={{
              consumerKey: "nw5wqOFjDuzrHbTsQXJj6Q==",
              consumerSecret: "u1dXQWADNBbQ44jdg4Skl_Jc3Xw82JGDEDq6zGBTxc0=",
            }}
            attendee={attendee}
            room={SampleRoom}
            disablePurgeOnRemount={true}
          />
        )}
      </>
    );
  }
}
