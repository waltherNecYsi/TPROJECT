import { sub } from "date-fns";
//
import {
  age,
  role,
  price,
  title,
  email,
  rating,
  percent,
  country,
  boolean,
  sentence,
  lastName,
  fullName,
  firstName,
  description,
  fullAddress,
  phoneNumber,
} from "./assets";

// ----------------------------------------------------------------------

const _mock = {
  id: (index) => `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${index + 1}`,
  email: (index) => email[index],
  phoneNumber: (index) => phoneNumber[index],
  time: (index) => sub(new Date(), { days: index, hours: index }),
  boolean: (index) => boolean[index],
  role: (index) => role[index],
  address: {
    fullAddress: (index) => fullAddress[index],
    country: (index) => country[index],
  },
  name: {
    firstName: (index) => firstName[index],
    lastName: (index) => lastName[index],
    fullName: (index) => fullName[index],
  },
  text: {
    title: (index) => title[index],
    sentence: (index) => sentence[index],
    description: (index) => description[index],
  },
  number: {
    percent: (index) => percent[index],
    rating: (index) => rating[index],
    age: (index) => age[index],
    price: (index) => price[index],
  },
  image: {
    cover: (index) =>
      // `https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_${index + 1}.jpg`,
      `https://wootag.com/assets/images/showcase${index + 1}.png`,
    product: (index) =>
      // `https://api-dev-minimal-v4.vercel.app/assets/images/products/product_${index + 1}.jpg`,
      `https://wootag.com/assets/images/showcase${index + 1}.png`,

    avatar: (index) =>
      // `https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_${index + 1}.jpg`,
      `https://wootag.com/assets/images/showcase${index + 1}.png`,
  },
};

export default _mock;