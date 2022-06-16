import { gql } from "@apollo/client";

export const ADD_MEETING = gql`
  mutation AddMeeting(
    $id: Int!
    $title: String!
    $date: String!
    $start: String!
    $end: String!
    $roomId: Int!
  ) {
    Meeting(
      id: $id
      title: $title
      date: $date
      startTime: $start
      endTime: $end
      meetingRoomId: $roomId
    ) {
      id
      title
    }
  }
`;
