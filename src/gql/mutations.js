import { gql } from "@apollo/client";

export const ADD_MEETING = () => gql`
  mutation {
    Meeting(
      id: 1
      title: "Booked3"
      date: "13/02/2019"
      startTime: "21:00"
      endTime: "22:00"
      meetingRoomId: 1
    ) {
      id
      title
    }
  }
`;
