import dock from "./dock";
import settings from "./dock.settings";
import experience from "./experience";
import home from "./home";
import journal from "./journal";
import works from "./works";
export default {
  ...journal,
  ...settings,
  ...works,
  ...home,
  ...dock,
  ...experience,
} as const;
