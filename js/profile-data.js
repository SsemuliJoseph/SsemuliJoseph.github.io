/*
 * PROFILE DATA
 * ------------
 * Controls the small avatar in the top-left of the nav bar, next to your
 * name. Leave `image` empty and it shows your initials instead (the
 * default gold/terracotta "JS" mark).
 *
 * TO ADD OR CHANGE YOUR PROFILE PICTURE:
 *   Open admin.html — the "Profile Picture" panel at the top lets you
 *   upload a photo and exports an updated copy of this exact file.
 *   Download it and replace this file, then push to GitHub.
 *
 * TO DO IT BY HAND INSTEAD:
 *   Save your photo into assets/ (e.g. assets/profile.jpg) and set
 *   `image` below to that path.
 *
 * FIELD REFERENCE:
 *   image    (optional) — path to an image ("assets/profile.jpg") or a
 *                          data: URI (what admin.html produces on upload)
 *                          leave as "" to show initials instead
 *   initials (optional) — fallback text shown when no image is set
 */

const PROFILE = {
  image: "assets/Profile.jpg",
  initials: "JS"
};

// Support both browser <script> usage and module usage (for admin.html)
if (typeof module !== "undefined" && module.exports) {
  module.exports = PROFILE;
}
