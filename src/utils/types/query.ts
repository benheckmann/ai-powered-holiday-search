export interface Query {
  filters: {
    departureAirport: string;
    destinationAirport: string;
    departureDate: Date;
    returnDate: Date;
    countAdults: number;
    countChildren: number;
  };
  pageNumber: number;
}
