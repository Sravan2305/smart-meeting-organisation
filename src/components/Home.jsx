import { useQuery } from "@apollo/client";
import React from "react";
import { GET_BUILDINGS } from "../gql/queries";
import { Building } from "./Building";

export const Home = () => {
  const [buildingSelected, setBuildingSelected] = React.useState("");

  const {
    loading,
    error,
    data: { Buildings = [] } = {},
  } = useQuery(GET_BUILDINGS, {
    onCompleted: (data) => {
      setBuildingSelected(data?.Buildings?.[0]?.id ?? "");
    },
  });

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Something went wrong :(</p>;
  if (Buildings.length === 0)
    return <p className="no-data">No buildings found</p>;
  return (
    <div className="px-10">
      <div>
        <h2>Hi Guest,</h2>
        <div className="">
          {" "}
          <h4>Please choose a building first</h4>
          <select
            className="select"
            onChange={(e) => setBuildingSelected(+e.target.value)}
            required
          >
            {Buildings.map(({ name, id }) => {
              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <Building buildingId={buildingSelected} />
    </div>
  );
};
