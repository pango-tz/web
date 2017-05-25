export interface ErrorResponse {
  title: string;
  status: number;
  detail: string;
  timeStamp: number;
  developerMessage: string;
  errors: string[];
}
