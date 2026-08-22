import { TimelineItem, PhotoMoment, BankAccount, WishMessage } from '../types';

export const WEDDING_DATA = {
  groom: {
    name: 'NGUYỄN TUẤN AN',
    shortName: 'Tuấn An',
    role: 'Chú Rể',
    birthday: '19.02.1998',
    parents: {
      father: 'Nguyễn Văn Lai',
      mother: 'Nguyễn Thị Thanh',
    },
    hometown: 'Tỉnh Vĩnh Long',
  },
  bride: {
    name: 'NGUYỄN THANH HẠ VY',
    shortName: 'Hạ Vy',
    role: 'Cô Dâu',
    birthday: '05.09.1998',
    parents: {
      father: 'Nguyễn Thành Vỹ',
      mother: 'Nguyễn Thị Thanh Thúy',
    },
    hometown: 'TP. Đà Nẵng',
  },
  // =========================================================================
  // BẠN CÓ THỂ THAY ĐỔI TOÀN BỘ ẢNH TẠI ĐÂY (Link online hoặc file trong public/images/)
  // =========================================================================
  images: {
    // 1. Ảnh bìa Save the Date đầu trang
    heroCover: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    
    // 2. Ảnh chân dung cô dâu (phần viền xé)
    bridePortrait: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=1200&q=85',
    
    // 3. Ảnh chân dung chú rể (phần viền xé)
    groomPortrait: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85',
    
    // 4. 4 tấm ảnh polaroid mini hiển thị số ngày (23 / 10 / 26)
    miniPolaroids: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=400&q=80',
    ],

    // 5. Ảnh kết thúc (Thank you ở chân trang)
    footerCover: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
  },
  event: {
    solarDate: '2026-09-19T10:30:00+07:00',
    dateDisplay: 'Thứ Bảy, 19 Tháng 9, 2026',
    timeDisplay: '10:30, THỨ BẢY',
    day: 19,
    month: 9,
    year: 2026,
    lunarDateDisplay: 'Tức ngày 09 tháng 08 năm Bính Ngọ',
    venueName: 'HOA CAU PALACE',
    venueSubName: 'Sảnh 1',
    venueAddress: '180-184 Hùng Vương, Đại Lộc, Đà Nẵng',
    mapLink: 'https://maps.app.goo.gl/q7aJeXMmAWsWyUu89',
    googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=L%E1%BB%85+Th%C3%A0nh+H%C3%B4n+Tu%E1%BA%A5n+An+%26+H%E1%BA%A1+Vy&dates=20260919T033000Z/20260919T073000Z&details=Tr%C3%A2n+tr%E1%BB%8Dng+k%C3%ADnh+m%E1%BB%9Di+b%E1%BA%A1n+%C4%91%E1%BA%BFn+tham+d%E1%BB%B1+L%E1%BB%85+Th%C3%A0nh+H%C3%B4n+c%E1%BB%A7a+Tu%E1%BA%A5n+An+%26+H%E1%BA%A1+Vy+t%E1%BA%A1i+Hoa+Cau+Palace.&location=Hoa+Cau+Palace,+180-184+H%C3%B9ng+V%C6%B0%C6%A1ng,+%C4%90%E1%BA%A1i+L%E1%BB%99c,+%C4%90%C3%A0+N%E1%BA%B5ng',
  },
  quotes: {
    hero: 'SAVE the DATE',
    monogram: 'V & A',
    quoteEnglish: 'We step into a new chapter together, hand in hand, ready to build our home and embrace a lifetime of love.',
    quoteVietnamese: 'Hai tâm hồn cùng chung một nhịp đập, hai con đường giờ đã hòa làm một trên hành trình hạnh phúc trăm năm.',
    rsvpHeader: 'Vui lòng xác nhận sự tham dự của bạn để chúng mình chuẩn bị đón tiếp một cách chu đáo nhất. Trân trọng cảm ơn!',
    closing: 'Hẹn gặp bạn trong ngày đặc biệt nhất của chúng mình. Sẽ thật hạnh phúc khi có bạn ở đó, cùng sẻ chia niềm vui và chứng kiến khoảnh khắc ý nghĩa này của chúng mình. Thank you!',
  },
  dresscode: [
    { name: 'Đỏ Rượu / Burgundy', hex: '#7A121D', textDark: false },
    { name: 'Hồng Phấn / Rose Blush', hex: '#DDA7A5', textDark: true },
    { name: 'Kem Nude / Champagne', hex: '#EADBC8', textDark: true },
    { name: 'Nâu Mocha / Warm Sand', hex: '#8E6E53', textDark: false },
  ],
  music: {
    title: 'một đời x người tốt nhất cho em',
    url: '/audio/mot-doi-x-nguoi-tot-nhat-cho-em.mp3',
  },
};

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    time: '14:00',
    title: 'RƯỚC DÂU',
    description: 'Nghi thức gia tiên trang trọng tại tư gia',
    iconName: 'bouquet',
  },
  {
    time: '09:00',
    title: 'LỄ VU QUY',
    description: 'Khoảnh khắc trao nhẫn và lời thề nguyện trăm năm',
    iconName: 'rings',
  },
  {
    time: '10:30',
    title: 'ĐÓN KHÁCH',
    description: 'Khai vị, chúc rượu cùng ẩm thực tinh hoa',
    iconName: 'feast',
  },
  {
    time: '11:30',
    title: 'KHAI TIỆC',
    description: 'Khai vị, chúc rượu cùng ẩm thực tinh hoa',
    iconName: 'music',
  },
];

export const PHOTO_GALLERY: PhotoMoment[] = [
  {
    id: 'p1',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    caption: 'Tình yêu bắt đầu từ những điều bình dị nhất...',
    aspectRatio: 'tall',
  },
  {
    id: 'p2',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    caption: 'Tay trong tay bước vào một chương mới',
    aspectRatio: 'square',
  },
  {
    id: 'p3',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    caption: 'Mỗi nụ cười trao nhau là một lời hứa trọn đời',
    aspectRatio: 'tall',
  },
  {
    id: 'p4',
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
    caption: 'Forever & Always ❤️',
    aspectRatio: 'wide',
  },
  {
    id: 'p5',
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    caption: 'Hạnh phúc ngập tràn trong ánh mắt người thương',
    aspectRatio: 'tall',
  },
  {
    id: 'p6',
    url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80',
    caption: 'Cùng nhau già đi theo năm tháng',
    aspectRatio: 'square',
  },
];

export const INITIAL_WISHES: WishMessage[] = [
  {
    id: 'w1',
    author: 'Minh Hoàng & Thu Trang',
    side: 'both',
    message: 'Chúc mừng hạnh phúc hai bạn! Chúc Tuấn An & Hạ Vy trăm năm tình viên mãn, đầu bạc răng long, luôn tràn ngập tiếng cười và yêu thương nhé!',
    time: 'Vừa xong',
    likes: 12,
  },
  {
    id: 'w2',
    author: 'Hội Bạn Thân',
    side: 'groom',
    message: 'Cuối cùng chú rể Tuấn An cũng rước được cô dâu xinh đẹp về dinh! Chúc đôi bạn trẻ sớm đón thiên thần nhỏ, hạnh phúc bất tận!',
    time: '20 phút trước',
    likes: 8,
  },
  {
    id: 'w3',
    author: 'Chị Mai Linh',
    side: 'bride',
    message: 'Hạ Vy xinh đẹp ơi, chúc em gái luôn là cô dâu hạnh phúc và rạng rỡ nhất! Hai vợ chồng thật xứng đôi vừa lứa ❤️',
    time: '1 giờ trước',
    likes: 15,
  },
];

// =========================================================================
// THÔNG TIN TÀI KHOẢN MỪNG CƯỚI (Bạn có thể sửa số tài khoản, tên ngân hàng tại đây)
// =========================================================================
export const BANK_ACCOUNTS: BankAccount[] = [
  {
    title: 'Mừng Cưới Chú Rể (Tuấn An)',
    name: 'NGUYEN TUAN AN',
    bankName: 'Vietcombank (VCB)',
    accountNumber: '1018899668',
    qrCodeUrl: 'https://api.vietqr.io/image/970436-1018899668-compact.png?amount=0&addInfo=Mung%20cuoi%20Tuan%20An%20Ha%20Vy&accountName=NGUYEN%20TUAN%20AN',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  },
  {
    title: 'Mừng Cưới Cô Dâu (Hạ Vy)',
    name: 'NGUYEN THANH HA VY',
    bankName: 'Techcombank (TCB)',
    accountNumber: '190367888999',
    qrCodeUrl: 'https://api.vietqr.io/image/970407-190367888999-compact.png?amount=0&addInfo=Mung%20cuoi%20Ha%20Vy%20Tuan%20An&accountName=NGUYEN%20THANH%20HA%20VY',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
  },
];


