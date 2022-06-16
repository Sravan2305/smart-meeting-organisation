import { gql } from "@apollo/client";

export const GET_BUILDINGS = gql`
  query Buildings {
    Buildings {
      id
      name
    }
  }
`;

export const GET_BUILDING_DATA = gql`
  query Buildings($buildingId: Int!) {
    Building(id: $buildingId) {
      name
      id
      meetingRooms {
        id
        name
        meetings {
          title
          date
          startTime
          endTime
        }
      }
    }
  }
`;

export const GET_MEETING_ROOMS = gql`
  query Buildings($buildingId: Int!) {
    Building(id: $buildingId) {
      name
      meetingRooms {
        id
        floor
        name
        meetings {
          date
          startTime
          endTime
        }
      }
    }
  }
`;
