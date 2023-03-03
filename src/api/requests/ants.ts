import { api } from "../config";
import { AntGroup } from "../../interfaces/AntGroup";

export const fetchAntGroup = async () => {
  const { data } = await api.get<AntGroup>("ants");
  return data;
};
