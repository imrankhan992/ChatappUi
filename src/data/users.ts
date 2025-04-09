import { User } from '../types';

export const users: User[] = [
  {
    id: '1',
    firstName: 'Patrick',
    lastName: 'Hendricks',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    status: 'online',
    lastSeen: '02:50 PM',
    isTyping: false,
    lastMessage: 'hey! there I\'m available',
    unseenCount: 0
  },
  {
    id: '2',
    firstName: 'Mark',
    lastName: 'Messer',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop',
    status: 'online',
    lastSeen: '10:30 AM',
    isTyping: false,
    lastMessage: 'Images',
    unseenCount: 2
  },
  {
    id: '3',
    firstName: 'Emily',
    lastName: 'Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    status: 'away',
    lastSeen: '2:06 min',
    isTyping: false,
    lastMessage: 'This theme is Awesome!',
    unseenCount: 0
  },
  {
    id: '4',
    firstName: 'Doris',
    lastName: 'Brown',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    status: 'online',
    lastSeen: '10:05 PM',
    isTyping: true,
    lastMessage: 'typing...',
    unseenCount: 0
  }
];

export const pinnedUserIds = ['1', '2'];

export const userMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      content: 'Hey! How are you?',
      timestamp: '02:50 PM',
      senderId: '1',
      align: 'left',
      type: 'text'
    },
    {
      id: '2',
      content: 'I\'m good, thanks! How about you?',
      timestamp: '02:51 PM',
      senderId: 'current-user',
      align: 'right',
      type: 'text'
    }
  ],
  '2': [
    {
      id: '1',
      content: 'Check out these designs',
      timestamp: '10:30 AM',
      senderId: '2',
      align: 'left',
      type: 'text'
    },
    {
      id: '2',
      type: 'image',
      content: 'Design Preview',
      fileUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80',
      timestamp: '10:31 AM',
      senderId: '2',
      align: 'left'
    }
  ],
  '4': [
    {
      id: '1',
      content: 'Good Morning',
      timestamp: '10:00',
      senderId: '4',
      align: 'left',
      type: 'text'
    },
    {
      id: '2',
      content: 'Good morning, How are you? What about our next meeting?',
      timestamp: '10:02',
      senderId: 'current-user',
      align: 'right',
      type: 'text'
    },
    {
      id: '3',
      content: 'Yeah everything is fine',
      timestamp: '10:04',
      senderId: '4',
      align: 'left',
      type: 'text'
    },
    {
      id: '4',
      content: '& Next meeting tomorrow 10.00AM',
      timestamp: '10:05',
      senderId: '4',
      align: 'left',
      type: 'text'
    }
  ]
};