import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { GET_BUILDING_DATA } from "../gql/queries";
import { isMatchingCurrentTime } from "../utils/date";

export const Building = ({ buildingId }) => {
  const {
    loading,
    error,
    data: { Building: { meetingRooms = [], name } = {} } = {},
  } = useQuery(GET_BUILDING_DATA, {
    variables: { buildingId },
  });
  //   const [roomsAvailable, setRoomsAvailable] = React.useState([]);

  const { totalMeetings, meetingsHappening, roomsAvailable } =
    React.useMemo(() => {
      let totalMeetings = 0,
        meetingsHappening = 0,
        roomsAvailable = 0;
      meetingRooms?.forEach((room) => {
        totalMeetings += room?.meetings?.length ?? 0;
        let isRoomAvailable = true;
        room?.meetings?.forEach(({ date, startTime, endTime }) => {
          if (isMatchingCurrentTime(date, startTime, endTime)) {
            isRoomAvailable = false;
            meetingsHappening++;
          }
        });
        if (isRoomAvailable) roomsAvailable++;
      });
      return { totalMeetings, meetingsHappening, roomsAvailable };
    }, [meetingRooms]);

  if (loading) return <p className="loading">Fetching Building Details</p>;
  if (error)
    return <p className="error">Unable to get deatails! Try again later.</p>;

  return (
    <div className="building building-heading pb-10">
      <h5 className="sub-heading">Exploring {name}</h5>
      <div className="building-cards">
        <div className="building-card">
          <h3>Room Details</h3>
          <p>Total : {meetingRooms.length}</p>
          <p>Free: {roomsAvailable} </p>
        </div>
        <div className="building-card">
          <h3>Meeting Details</h3>
          <p>Total : {totalMeetings}</p>
          <p>On-Going meetings : {meetingsHappening} </p>
        </div>
      </div>
      <Link to={"/add/" + buildingId}>
        <button className="button btn-1 mt-1">Book a meeting</button>
      </Link>
    </div>
  );
};
