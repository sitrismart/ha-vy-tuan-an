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
    heroCover: '/images/anh-bia-1.jpg',

    // 2. Ảnh chân dung cô dâu (phần viền xé)
    bridePortrait: '/images/chan-dung-cd-2.jpg',

    // 3. Ảnh chân dung chú rể (phần viền xé)
    groomPortrait: '/images/chan-dung-cr-3.jpg',

    // 4. 4 tấm ảnh polaroid mini hiển thị số ngày (19 / 09 / 26)
    miniPolaroids: [
      '/images/polaroidmini-4-1.jpg',
      '/images/polaroimini-4-2.jpg',
      '/images/polaroidmini-4-3.jpg',
      '/images/polaroimini-4-4.jpg',
    ],

    // 5. Ảnh kết thúc (Thank you ở chân trang)
    footerCover: '/images/anh-chan-trang-5.jpg',
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
    googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=L%E1%BB%85+Th%C3%A0nh+H%C3%B4n+H%E1%BA%A1+Vy+%26+Tu%E1%BA%A5n+An&dates=20260919T033000Z/20260919T073000Z&details=Tr%C3%A2n+tr%E1%BB%8Dng+k%C3%ADnh+m%E1%BB%9Di+b%E1%BA%A1n+%C4%91%E1%BA%BFn+tham+d%E1%BB%B1+L%E1%BB%85+Th%C3%A0nh+H%C3%B4n+c%E1%BB%A7a+H%E1%BA%A1+Vy+%26+Tu%E1%BA%A5n+An+t%E1%BA%A1i+Hoa+Cau+Palace.&location=Hoa+Cau+Palace,+180-184+H%C3%B9ng+V%C6%B0%C6%A1ng,+%C4%90%E1%BA%A1i+L%E1%BB%99c,+%C4%90%C3%A0+N%E1%BA%B5ng',
  },
  quotes: {
    hero: 'SAVE the DATE',
    monogram: 'V & A',
    quoteEnglish: 'We step into a new chapter together, hand in hand, ready to build our home and embrace a lifetime of love.',
    quoteVietnamese: 'Hai tâm hồn cùng chung một nhịp đập, hai con đường giờ đã hòa làm một trên hành trình hạnh phúc trăm năm.',
    rsvpHeader: 'Vui lòng xác nhận sự tham dự của bạn để chúng mình chuẩn bị đón tiếp một cách chu đáo nhất. Trân trọng cảm ơn!',
    closing: 'Hẹn gặp bạn trong ngày đặc biệt nhất của chúng mình. Sẽ thật hạnh phúc khi có bạn ở đó, cùng sẻ chia niềm vui và chứng kiến khoảnh khắc ý nghĩa này của chúng mình. Thank you!',
  },
  music: {
    title: 'thế-giới-của-anh',
    url: '/audio/the-gioi-cua-anh.mp3',
  },
};

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    time: '09:00',
    title: 'LỄ ĐÍNH HÔN',
    description: 'Nghi thức trao nhẫn và lời hẹn ước trăm năm',
    iconName: 'rings',
  },
  {
    time: '10:30',
    title: 'ĐÓN KHÁCH',
    description: 'Khai vị, chúc rượu cùng ẩm thực tinh hoa',
    iconName: 'feast',
  },
  {
    time: '11:00',
    title: 'KHAI TIỆC',
    description: 'Khai vị, chúc rượu cùng ẩm thực tinh hoa',
    iconName: 'music',
  },
];

export const PHOTO_GALLERY: PhotoMoment[] = [
  {
    id: 'p1',
    url: '/images/khoanh-khac-1.JPG',
    caption: 'Tình yêu bắt đầu từ những điều bình dị nhất...',
    aspectRatio: 'tall',
  },
  {
    id: 'p2',
    url: '/images/khoanh-khac-2.jpg',
    caption: 'Tay trong tay bước vào một chương mới',
    aspectRatio: 'square',
  },
  {
    id: 'p3',
    url: '/images/khoanh-khac-3.jpg',
    caption: 'Mỗi nụ cười trao nhau là một lời hứa trọn đời',
    aspectRatio: 'tall',
  },
  {
    id: 'p4',
    url: '/images/khoanh-khac-4.jpg',
    caption: 'Forever & Always ❤️',
    aspectRatio: 'wide',
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

