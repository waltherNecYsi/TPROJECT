import _mock from "../_mock";
import { randomInArray } from "../utils";

// ----------------------------------------------------------------------

export const _bookings = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  avatar: _mock.image.avatar(index),
  checkIn: _mock.time(index),
  checkOut: _mock.time(index),
  phoneNumber: _mock.phoneNumber(index),
  status: randomInArray(["pending", "un_paid", "paid"]),
  roomType: randomInArray(["double", "king", "single"]),
}));

export const _bookingsOverview = [...Array(3)].map((_, index) => ({
  status: ["Pending", "Cancel", "Done"][index],
  quantity: _mock.number.percent(index) * 1000,
  value: _mock.number.percent(index),
}));

export const _bookingReview = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  description: _mock.text.description(index),
  avatar: _mock.image.avatar(index),
  rating: _mock.number.rating(index),
  postedAt: _mock.time(index),
  tags: ["Great Sevice", "Recommended", "Best Price"],
}));

// export const _bookingNew = [...Array(5)].map((_, index) => ({
//   id: _mock.id(index),
//   name: _mock.name.fullName(index),
//   avatar: _mock.image.avatar(index),
//   bookdAt: _mock.time(index),
//   roomNumber: 'A-21',
//   roomType: randomInArray(['double', 'king', 'single']),
//   person: '3-5',
//   cover: `/assets/images/rooms/room_${index + 1}.jpg`,
// }));

export const _bookingNew = [
  {
    id: 1,
    name: "Sukha Spa",
    avatar: "/assets/images/avatars/sukhaprofile.jpg",
    bookdAt: "2022-01-01T00:00:00.000Z",
    roomNumber: "A-21",
    roomType: "double",
    person: "3-5",
    cover:
      "https://instagram.flim20-1.fna.fbcdn.net/v/t39.30808-6/449387452_454406380678977_6598637797428233465_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYzMDgwOCJ9&_nc_ht=instagram.flim20-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=2mp77r1iDzcQ7kNvgFQcq1Y&gid=0e9c63f25aa54b95871486b7b310b1cb&edm=ANTKIIoAAAAA&ccb=7-5&oh=00_AYDtwbKO-wXpOfMttRajqJFc303Q7DZBHAo1OxVYCNOuxw&oe=6690AE5F&_nc_sid=d885a2",
  },
  {
    id: 2,
    name: "Sukha Spa",
    avatar: "/assets/images/avatars/sukhaprofile.jpg",
    bookdAt: "2022-01-01T00:00:00.000Z",
    roomNumber: "A-21",
    roomType: "double",
    person: "3-5",
    cover:
      "https://instagram.flim20-1.fna.fbcdn.net/v/t39.30808-6/449565542_454409384012010_5158773486416299851_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&_nc_ht=instagram.flim20-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=T1jBVZLhgT4Q7kNvgHjRq0L&edm=ANTKIIoAAAAA&ccb=7-5&oh=00_AYDaNHsMchRt_R2RhIEdaC0NvMMJwaVAw4SjavVKxT7Hlw&oe=66909809&_nc_sid=d885a2",
  },
  {
    id: 3,
    name: "Sukha Spa",
    avatar: "/assets/images/avatars/sukhaprofile.jpg",
    bookdAt: "2022-01-01T00:00:00.000Z",
    roomNumber: "A-21",
    roomType: "double",
    person: "3-5",
    cover:
      "https://instagram.flim20-1.fna.fbcdn.net/v/t39.30808-6/449379530_454407397345542_2751767345910092406_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&_nc_ht=instagram.flim20-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=iwKUyszpCC8Q7kNvgEKPnkG&edm=APU89FAAAAAA&ccb=7-5&oh=00_AYAdv4RCmsO-FK4XFKxpludLgQDl2bTrJg7D3X4QUv8nCA&oe=66909B0C&_nc_sid=bc0c2c",
  },
  {
    id: 4,
    name: "Sukha Spa",
    avatar: "/assets/images/avatars/sukhaprofile.jpg",
    bookdAt: "2022-01-01T00:00:00.000Z",
    roomNumber: "A-21",
    roomType: "double",
    person: "3-5",
    cover:
      "https://instagram.flim20-1.fna.fbcdn.net/v/t39.30808-6/449159974_18017642084341263_7165139521297447118_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08&_nc_ht=instagram.flim20-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=SMFrbG_xnhsQ7kNvgF5buM4&edm=APU89FAAAAAA&ccb=7-5&oh=00_AYAd_o83Xoi2P1Hu3T1wDxnxHJ8N2nph4zYDl6APc2OFBg&oe=6690B213&_nc_sid=bc0c2c",
  },
  {
    id: 5,
    name: "Sukha Spa",
    avatar: "/assets/images/avatars/sukhaprofile.jpg",
    bookdAt: "2022-01-01T00:00:00.000Z",
    roomNumber: "A-21",
    roomType: "double",
    person: "3-5",
    cover:
      "https://instagram.flim20-1.fna.fbcdn.net/v/t39.30808-6/429640613_18006060044341263_1144070231496539086_n.jpg?stp=dst-jpg_e35_s1080x1080_sh0.08&_nc_ht=instagram.flim20-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=AdJZ8fwfuXUQ7kNvgFTJgJ0&edm=ANTKIIoAAAAA&ccb=7-5&oh=00_AYAxDkXoepsLJxV6cLAq0lE09a_4CLVtjHdJpp_h4hUi-w&oe=6690A66A&_nc_sid=d885a2",
  },
];
