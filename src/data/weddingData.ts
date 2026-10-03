import { TimelineItem, PhotoMoment, BankAccount, WishMessage } from '../types';

// =========================================================================
// ⭐ NGÀY & GIỜ CƯỚI: CHỈ CẦN SỬA 2 DÒNG NÀY, TOÀN BỘ THIỆP SẼ TỰ CẬP NHẬT
// (Lưu ý: ngày âm lịch `lunarDateDisplay` bên dưới vẫn cần sửa tay)
// =========================================================================
const WEDDING_DATE = '2026-10-17'; // Định dạng YYYY-MM-DD
const WEDDING_TIME = '10:30'; // Định dạng HH:mm (giờ Việt Nam)

const [WEDDING_YEAR, WEDDING_MONTH, WEDDING_DAY] = WEDDING_DATE.split('-').map(Number);
const WEEKDAYS = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
const WEEKDAY = WEEKDAYS[new Date(Date.UTC(WEDDING_YEAR, WEDDING_MONTH - 1, WEDDING_DAY)).getUTCDay()];
const pad2 = (n: number) => String(n).padStart(2, '0');
const SOLAR_DATE = `${WEDDING_DATE}T${WEDDING_TIME}:00+07:00`;

export const WEDDING_DATA = {
  groom: {
    name: 'NGUYỄN TUẤN AN',
    shortName: 'Tuấn An',
    role: 'Chú Rể',
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

    // 4. 4 tấm ảnh polaroid mini hiển thị số ngày (ngày / tháng / năm)
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
    // Các giá trị ngày tháng dưới đây được tự động tính từ WEDDING_DATE / WEDDING_TIME ở đầu file
    solarDate: SOLAR_DATE,
    dateDisplay: `${WEEKDAY}, ${WEDDING_DAY} Tháng ${WEDDING_MONTH}, ${WEDDING_YEAR}`,
    timeDisplay: `${WEDDING_TIME}, ${WEEKDAY.toUpperCase()}`,
    dateDot: `${pad2(WEDDING_DAY)}.${pad2(WEDDING_MONTH)}.${WEDDING_YEAR}`, // 17.10.2026
    dateSlash: `${pad2(WEDDING_DAY)}/${pad2(WEDDING_MONTH)}/${WEDDING_YEAR}`, // 17/10/2026
    day: WEDDING_DAY,
    month: WEDDING_MONTH,
    year: WEDDING_YEAR,
    lunarDateDisplay: 'Tức ngày 08 tháng 09 năm Bính Ngọ',
    venueName: 'TƯ GIA NAM',
    venueAddress: 'Ấp Tân Đức A, xã Tân Thành Bình, tỉnh Vĩnh Long (Bến Tre cũ)',
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
    title: 'LỄ THÀNH HÔN',
    description: 'Nghi thức trao nhẫn và lời hẹn ước trăm năm',
    iconName: 'rings',
  },
  {
    time: '09:30',
    title: 'ĐÓN KHÁCH',
    description: 'Gia đình đón tiếp khách quý và chụp ảnh lưu niệm',
    iconName: 'feast',
  },
  {
    time: '10:00',
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

