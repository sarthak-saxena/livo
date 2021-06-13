import { UserContextType } from "../../types/context";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

export const useAttendee: () => UserContextType = () => {
  return useContext(UserContext);
};
