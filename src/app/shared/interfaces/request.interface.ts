

// Generated by https://quicktype.io

export interface RequestResponse {
  client:        Client;
  status:        Status;
  requestType:   RequestType;
  id:            number;
  description:   string;
  amount:        number;
  plazo:         number;
  startDate:     string;
  endDate:       string;
  clientId:      number;
  requestTypeId: number;
  advisorId:     number;
  statusId:      number;
}

export interface Client {
  id:         number;
  firstName:  string;
  lastName:   string;
  fullName:   string;
  documentId: string;
}

export interface RequestType {
  id:        number;
  name:      string;
  minAmount: number;
  maxAmount: number;
  term:      string;
}

export interface Status {
  id:          number;
  name:        string;
  description: string;
}

// Generated by https://quicktype.io

export interface RequestUpdateResponse {
  id:            number;
  description:   string;
  amount:        number;
  plazo:         number;
  startDate:     string;
  endDate:       string;
  clientId:      number;
  requestTypeId: number;
  advisorId:     number;
  statusId:      number;
}
