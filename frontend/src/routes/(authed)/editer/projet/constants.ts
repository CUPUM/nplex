// General
export const TITLE_MIN_WORDS = 3;
export const TITLE_MAX_WORDS = 24;
export const DESCRIPTION_MAX_WORDS = 250;
export const COST_MIN = 0;
export const COST_MAX_SMALL = 250_000;
export const COST_MAX_BIG = 1_250_000;
export const COST_MAX_DELTA_R = 0.5;
export const COST_STEP = 500;
// Location
export const LOCATION_DEFAULT_RADIUS = 500;
export const LOCATION_MAX_RADIUS = 2_500;
export const ADJACENT_STREETS_MIN = 0;
export const ADJACENT_STREETS_MAX = 4;
export const ADJACENT_ALLEYS_MIN = 0;
export const ADJACENT_ALLEYS_MAX = 2;
export const LOCATION_FEATURE_FLAG = 'projectLocationCircle';
export const BUILDING_MIN_LEVELS = 1;
export const BUILDING_MAX_LEVELS = 10;
export const BUILDING_MIN_HEIGHT = 0;
export const BUILDING_MAX_HEIGHT = 300;
export const BUILDING_YEAR_MIN = 1800;
export const BUILDING_YEAR_MAX = new Date().getFullYear();
// Gallery
export const IMAGE_MAX_PAYLOAD = 3.8 * 1024 * 1024; // Cumulative image files' max size. Vercel's hard limit is 4MB per request. We here leave 200KB headroom for the rest of the request.;
export const IMAGE_MAX_SIZE = 5e6; // Individual image size limit. Currently useless due to vercel's hard limit.
export const IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const IMAGE_MAX_RESOLUTION = 1_600;
export const IMAGE_TITLE_MAX_LENGTH = 200;
export const IMAGE_DESCRIPTION_MAX_LENGTH = 500;
