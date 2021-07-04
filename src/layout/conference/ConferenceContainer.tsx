import React from "react";
import Conference from "./Conference";
import { ConferenceMode } from "../../types/App";

interface Props {
  mode: ConferenceMode;
}

const ConferenceContainer = ({ mode }: Props) => {
  return <Conference />;
};

export default ConferenceContainer;
