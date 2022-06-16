import React from "react";
import { MIN_MEETING_DURATION } from "../constants";
import {
  convertFromMinutes,
  getCurrentTime,
  getTimeAsNumberOfMinutes,
  getTodaysDate,
} from "../utils/date";
import { ShowBooking } from "./ShowBooking";

export const AddMeeting = () => {
  const [allowBooking, setAllowBooking] = React.useState(false);
  const [data, setData] = React.useState({
    date: "",
    start: "",
    end: "",
    title: "",
  });
  const changeHandler = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAllowBooking(true);
  };

  return !allowBooking ? (
    <form onSubmit={handleSubmit}>
      <h3 className="sub-heading">Please tell us your schedule:</h3>
      <table>
        <tbody>
          <tr>
            <td>Title:</td>
            <td>
              <input
                type="text"
                value={data.title}
                name="title"
                onChange={changeHandler}
                required
              />
            </td>
          </tr>
          <tr>
            <td>Date:</td>
            <td>
              <input
                min={getTodaysDate()}
                type="date"
                value={data.date}
                name="date"
                onChange={changeHandler}
                required
              />
            </td>
          </tr>
          <tr>
            <td>Start Time:</td>
            <td>
              <input
                type="time"
                value={data.start}
                name="start"
                onChange={changeHandler}
                min={data.date === getTodaysDate() ? getCurrentTime() : null}
                required
              />
            </td>
          </tr>
          <tr>
            <td>End Time:</td>
            <td>
              <input
                type="time"
                value={data.end}
                name="end"
                onChange={changeHandler}
                required
                min={convertFromMinutes(
                  getTimeAsNumberOfMinutes(data.start) + MIN_MEETING_DURATION
                )}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit " className="button btn-1 mt-1">
        Next
      </button>
    </form>
  ) : (
    <ShowBooking schedule={data} />
  );
};
