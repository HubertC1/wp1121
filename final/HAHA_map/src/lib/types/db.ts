export type User = {
  id: string;
  username: string;
  email: string;
  provider:"credentials";
};

export type Document = {
  id: string;
  title: string;
  content: string;
};

export type Activity = {
  displayId: string;
  title: string;
  description: string;
  location: string;
  dateStart: string;
  dateEnd: string;
  schedule_name: string[];
  schedule_location: string[];
  messages_content: string[];
  messages_senderId: string[];
  messages_senderName: string[];
}

export type Activity_detial = {
  displayId: string;
  title: string;
  description: string;
  location: string;
  dateStart: string;
  dateEnd: string;
  schedule_name: string[];
  schedule_location: string[];
}

export type Activity_message = {
  displayId: string;
  messages_content: string[];
  messages_senderId: string[];
  messages_senderName: string[];
}

export type Message = {
  id: string;
  content: string;
  time: string;
}

export type memberType = {
  displayId: string;
  username: string;
  email: string;
}