import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import confirm from "react-alert-confirm";
import { ADD_MEETING } from "../gql/mutations";
import { GET_MEETING_ROOMS } from "../gql/queries";
import { isMatchingCurrentTime } from "../utils/date";
let counter = 0;
export const ShowBooking = ({ schedule }) => {
  const [roomSelected, setRoomSelected] = React.useState({});
  const { buildingId } = useParams();
  const { loading, error, data } = useQuery(GET_MEETING_ROOMS, {
    variables: { buildingId: +buildingId },
  });
  const [
    addMeeting,
    { data: meetingData, error: meetingError, loading: meetingLoading },
  ] = useMutation(ADD_MEETING, {
    context: {
      headers: {
        token: "abcdef",
      },
    },

    variables: {
      ...roomSelected,
      id: counter++,
    },
  });
  React.useEffect(() => {
    if (
      meetingData &&
      window.confirm(
        "Booking Succesful. \n Meeting : " + meetingData.Meeting.title
      )
    ) {
      window.location = "/";
    }
  }, [meetingData, meetingLoading]);
  if (loading) return <p className="loading">Loading rooms. Please wait ...</p>;
  if (error) return <p className="error">Unable to fetch rooms</p>;

  const { Building: { name: buildingName = "", meetingRooms = [] } = {} } =
    data;
  const rooms = meetingRooms.map(({ floor, id, name, meetings }, index) => {
    let isRoomAvailable = true;
    for (let i = 0; i < meetings.length; i++) {
      const { date, start, end } = meetings[i];
      if (
        isMatchingCurrentTime(
          date,
          start,
          end,
          schedule.date,
          schedule.start
        ) ||
        isMatchingCurrentTime(date, start, end, schedule.date, schedule.end)
      ) {
        isRoomAvailable = false;
        break;
      }
    }
    if (isRoomAvailable)
      return (
        <div
          key={index}
          onClick={() => {
            setRoomSelected({ ...schedule, roomId: id, index: index });
          }}
          className={`card ${roomSelected.index === index && "selected"}`}
        >
          <h4>{name}</h4>
          <p>floor: {floor}</p>
          <p>{buildingName}</p>
        </div>
      );
    return null;
  });
  const handleSubmit = () => {
    if (!roomSelected.roomId) return;
    addMeeting();
  };

  function handleSuccess() {
    confirm({
      title: "This is title",
      language: "en",
      content: <h2>This is content !</h2>,
      onOk: () => console.log("ok"),
    });
  }
  return (
    <div>
      <h1>Please select one of the room: </h1>
      <div className="container">{rooms}</div>
      <button
        onClick={handleSubmit}
        className={`button mt-1 ${!roomSelected.roomId && "button-disabled"}`}
      >
        Proceed
      </button>
    </div>
  );
};
