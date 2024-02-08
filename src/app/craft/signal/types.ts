export type SignalIncomingMessage = {
  timestamp: number;
  attachments: any[]; // You might want to specify a type for attachments if there's a specific structure
  id: string;
  type: "incoming";
  conversationId: string;
  readStatus?: number;
  received_at: number;
  received_at_ms: number;
  seenStatus?: number;
  sent_at: number;
  serverGuid?: string;
  serverTimestamp?: number;
  source?: string;
  sourceDevice?: number;
  sourceServiceId?: string;
  unidentifiedDeliveryReceived?: boolean;
  schemaVersion: number;
  body: string;
  bodyRanges: any[]; // You might want to specify a type for bodyRanges if there's a specific structure
  contact: any[]; // You might want to specify a type for contact if there's a specific structure
  decrypted_at?: number;
  errors: any[]; // You might want to specify a type for errors if there's a specific structure
  flags?: number;
  hasAttachments: number;
  isViewOnce?: boolean;
  mentionsMe?: boolean;
  preview: any[]; // You might want to specify a type for preview if there's a specific structure
  requiredProtocolVersion?: number;
  supportedVersionAtReceive?: number;
  quote?: {
    id: number;
    authorAci: string;
    text: string;
    attachments: any[]; // You might want to specify a type for attachments if there's a specific structure
    bodyRanges: any[]; // You might want to specify a type for bodyRanges if there's a specific structure
    type: number;
    referencedMessageNotFound: boolean;
    isGiftBadge: boolean;
    isViewOnce: boolean;
    messageId: string;
  };
};

export type SignalOutgoingMessage = {
  timestamp: number;
  attachments: any[]; // You might want to specify a type for attachments if there's a specific structure
  id: string;
  type: "outgoing";
  body: string;
  conversationId: string;
  contact: any[]; // You might want to specify a type for contact if there's a specific structure
  preview: any[]; // You might want to specify a type for preview if there's a specific structure
  sent_at: number;
  received_at: number;
  received_at_ms: number;
  expirationStartTimestamp: number;
  readStatus: number;
  seenStatus: number;
  bodyRanges: any[]; // You might want to specify a type for bodyRanges if there's a specific structure
  sendHQImages: boolean;
  sendStateByConversationId: {
    [conversationId: string]: {
      status: string;
      updatedAt: number;
    };
  };
  schemaVersion: number;
  hasAttachments: number;
  unidentifiedDeliveries: string[];
  errors: any[]; // You might want to specify a type for errors if there's a specific structure
  synced: boolean;
};

export type SignalUser = {
  id: string;
  name: string;
  profileName: string;
  number: string;
};

export type SignalWordFrequencies = {
  [word: string]: number;
};

// export type SignalEmotions = {
//   fear?: number;
//   joy?: number;
//   anger?: number;
//   sadness?: number;
//   love?: number;
//   surprise?: number;
// };

export type SignalEmotions = {
  [emotion : string] : number
}

export type SignalTimedSchedule = {
  [time: string]: SignalIncomingMessage | SignalOutgoingMessage;
};

export type SignalQuote = (SignalIncomingMessage | SignalOutgoingMessage)[];

export type SignalWordsPerPerson = {
  [word: string]: {
    [username: string]: number;
  };
};

export type SignalMessageLength = {
  [username: string]: {
    total: number;
    length: number;
    average: number;
  };
};

export type SignalData = {
  contacts: {
    [cid: string]: SignalUser;
  };
  quotes: {
    [cid: string]: SignalQuote[];
  };
  emotions: {
    [cid: string]: SignalEmotions;
  };
  sleepschedule: {
    [cid: string]: SignalTimedSchedule;
  };
  goodmorning: {
    [cid: string]: SignalTimedSchedule;
  };
  words_per_person: {
    [cid: string]: SignalWordsPerPerson;
  };
  message_length: {
    [cid: string]: SignalMessageLength;
  };
};
