import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.isLoggedIn = Boolean(req.session.isLoggedIn);
  res.locals.loggedInUser = req.session.loggedInUser || {};
  next();
};

export const loginRequiredMiddleware = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const uploadTrackMiddleware = multer({
  dest: "uploads/tracks/",
  limits: {
    fileSize: 10000000,
  },
});
