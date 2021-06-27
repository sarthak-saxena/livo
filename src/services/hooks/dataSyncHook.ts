import { DataSyncContextType } from "../../types/context";
import { useContext } from "react";
import { DataSyncContext } from "../context/dataSyncContext";

export const useDataSync: () => DataSyncContextType = () => {
  return useContext(DataSyncContext);
};
