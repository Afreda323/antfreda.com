import { profile } from "@/content/resume";

/** Every Email me opens a message with a subject already set, so it lands sorted in the inbox. */
export const MAILTO = `mailto:${profile.email}?subject=${encodeURIComponent("Hello from antfreda.com")}`;
