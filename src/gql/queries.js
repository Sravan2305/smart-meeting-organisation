import { gql } from "@apollo/client";

export const GET_BUILDINGS = gql`
  {
    MeetingRooms {
      name
      floor
      building {
        name
      }
      meetings {
        title
      }
    }
  }
`;

export const GET_MEETING_ROOMS = gql`
  {
    MeetingRooms {
      name
      floor
      building {
        name
      }
      meetings {
        title
      }
    }
  }
`;
