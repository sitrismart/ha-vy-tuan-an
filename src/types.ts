export interface RSVPRow {
  id: string;
  name: string;
  wishes: string | null;
  attendance: 'yes' | 'no' | 'maybe';
  companions: string;
  invited_by: 'groom' | 'bride' | 'both';
  created_at: string;
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

export interface WishRow {
  id: string;
  author: string;
  side: 'groom' | 'bride' | 'both';
  message: string;
  created_at: string;
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
