import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { ConferenceMode } from "./types/App";
import { SampleAttendee, SampleRoom } from "./testConfig/config";
import { App } from "./App";
const url = new URL((window as any).location);

const attendee = {
  ...SampleAttendee,
  isConferenceCreator: Boolean(url.searchParams.get("creator")),
  name: url.searchParams.get("id")
    ? `User ${url.searchParams.get("id")}`
    : SampleAttendee.name,
  id: url.searchParams.get("id") || SampleAttendee.id,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      apiConfig={{
        consumerKey: "nw5wqOFjDuzrHbTsQXJj6Q==",
        consumerSecret: "u1dXQWADNBbQ44jdg4Skl_Jc3Xw82JGDEDq6zGBTxc0=",
      }}
      attendee={attendee}
      room={SampleRoom}
      mode={ConferenceMode.AudioConference}
    />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
