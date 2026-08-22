export interface RSVPData {
  id: string;
  name: string;
  wishes: string;
  attendance: 'yes' | 'no' | 'maybe';
  companions: string;
  invitedBy: 'groom' | 'bride' | 'both';
  createdAt: string;
  dietary?: string;
}

export interface WishMessage {
  id: string;
  author: string;
  side: 'groom' | 'bride' | 'both';
  message: string;
  time: string;
  likes: number;
  isLiked?: boolean;
}

export interface TimelineItem {
  time: string;
  title: string;
  description?: string;
  iconName: 'bouquet' | 'rings' | 'feast' | 'music';
}

export interface PhotoMoment {
  id: string;
  url: string;
  caption?: string;
  aspectRatio?: 'tall' | 'square' | 'wide';
}

export interface BankAccount {
  title: string;
  name: string;
  bankName: string;
  accountNumber: string;
  qrCodeUrl: string;
  avatarUrl: string;
}
