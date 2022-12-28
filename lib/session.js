export const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: "isno-user-cookie",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
