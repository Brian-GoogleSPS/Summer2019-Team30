/**
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview All links used by this app.
 * Client links do not need redirect to an external server.
 */

/** Prefix for all servlet fetch links. */
const servletPrefix = '/api';

/** Link to the login servlet. */
export const LOGIN = servletPrefix + '/login';
/** Link to the logout servlet. */
export const LOGOUT = servletPrefix + '/logout';
/**Link to the login status servlet. */
export const LOGIN_STATUS = servletPrefix + '/login-status';
/** Link to the message servlet.  */
export const MESSAGE = servletPrefix + '/messages';
/** Link to the stats servlet. */
export const STATS_SERVLET = servletPrefix + '/stats';
/** Link to the user-page servlet. */
export const COMMUNITY_PAGE_SERVLET = servletPrefix + '/user-list';
/** Link to the MESSAGE FEED servlet. */
export const MESSAGE_FEED_SERVLET = servletPrefix + '/feed';
/** Link to the TRANSLATION servlet. */
export const TRANSLATION_SERVLET = servletPrefix + '/translate';
/** Link to the aboutMe servlet. */
export const ABOUT_ME_SERVLET = servletPrefix + '/about';
/** Link to the markers servlet. */
export const MARKERS_SERVLET = servletPrefix + '/markers';
/** Link to the restaurant servlet. */
export const RESTAURANT_SERVLET = servletPrefix + '/restaurant';
/** Link to the search servlet. */
export const SEARCH_SERVLET = servletPrefix + '/search';
/**Link to the upload profile pic servlet */
export const PROFILE_UPLOAD_SERVLET = servletPrefix + '/profile-upload-url';
/**Link to the profile picture servlet */
export const PROFILE_PIC_SERVLET = servletPrefix + '/store-image';

export const MESSAGE_FEED = '/feed';
/** Client link to the about page. */
export const ABOUT_US = '/aboutus';
/** Client link to the home page. */
export const HOME = '/';
/** Client link to the user's page. */
export const USER_PAGE = '/userpage';
/** Client link to the stats page. */
export const STATS = '/stats';
/**Client link to the community page. */
export const COMMUNITY_PAGE = '/user-list';
/**Client link to the search page. */
export const SEARCH_RESULTS = '/search';
