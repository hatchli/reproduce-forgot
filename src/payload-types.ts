/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    pages: Page;
    users: User;
    reservations: Reservation;
    cities: City;
    restaurants: Restaurant;
    media: Media;
    cuisines: Cuisine;
    recomendations: Recomendation;
    orders: Order;
    locations: Location;
    details: Detail;
    addresses: Address;
    newsletters: Newsletter;
    search: Search;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {
    nav: Nav;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: number;
  title: string;
  slug?: string | null;
  heroImage: number | Media;
  content?:
    | (
        | {
            faqGroup?: {
              description?: string | null;
              linkArray?:
                | {
                    lType?: ('popover' | 'link' | 'none') | null;
                    lLocation?: ('internal' | 'external') | null;
                    iMatch?: string | null;
                    pCopy?: string | null;
                    eCopy?: string | null;
                    icon?: ('info' | 'warn' | 'none') | null;
                    link?: string | null;
                    openNewTab?: boolean | null;
                    id?: string | null;
                  }[]
                | null;
            };
            faqs?:
              | {
                  question: string;
                  answer: string;
                  linkArray?:
                    | {
                        lType?: ('popover' | 'link' | 'none') | null;
                        lLocation?: ('internal' | 'external') | null;
                        iMatch?: string | null;
                        pCopy?: string | null;
                        eCopy?: string | null;
                        icon?: ('info' | 'warn' | 'none') | null;
                        link?: string | null;
                        openNewTab?: boolean | null;
                        id?: string | null;
                      }[]
                    | null;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'faq';
          }
        | {
            linkArray?:
              | {
                  lType?: ('popover' | 'link' | 'none') | null;
                  lLocation?: ('internal' | 'external') | null;
                  iMatch?: string | null;
                  pCopy?: string | null;
                  eCopy?: string | null;
                  icon?: ('info' | 'warn' | 'none') | null;
                  link?: string | null;
                  openNewTab?: boolean | null;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'linkPopover';
          }
        | {
            bullets?:
              | {
                  bullet?: string | null;
                  linkArray?:
                    | {
                        lType?: ('popover' | 'link' | 'none') | null;
                        lLocation?: ('internal' | 'external') | null;
                        iMatch?: string | null;
                        pCopy?: string | null;
                        eCopy?: string | null;
                        icon?: ('info' | 'warn' | 'none') | null;
                        link?: string | null;
                        openNewTab?: boolean | null;
                        id?: string | null;
                      }[]
                    | null;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'bullets';
          }
        | {
            'short-text': {
              copy: string;
              linkArray?:
                | {
                    lType?: ('popover' | 'link' | 'none') | null;
                    lLocation?: ('internal' | 'external') | null;
                    iMatch?: string | null;
                    pCopy?: string | null;
                    eCopy?: string | null;
                    icon?: ('info' | 'warn' | 'none') | null;
                    link?: string | null;
                    openNewTab?: boolean | null;
                    id?: string | null;
                  }[]
                | null;
            };
            id?: string | null;
            blockName?: string | null;
            blockType: 'short-text';
          }
        | {
            'long-text': {
              copy: string;
              linkArray?:
                | {
                    lType?: ('popover' | 'link' | 'none') | null;
                    lLocation?: ('internal' | 'external') | null;
                    iMatch?: string | null;
                    pCopy?: string | null;
                    eCopy?: string | null;
                    icon?: ('info' | 'warn' | 'none') | null;
                    link?: string | null;
                    openNewTab?: boolean | null;
                    id?: string | null;
                  }[]
                | null;
            };
            id?: string | null;
            blockName?: string | null;
            blockType: 'long-text';
          }
      )[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  user?: (number | null) | User;
  blurhash?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  first: string;
  last: string;
  newsletter?: boolean | null;
  tos?: boolean | null;
  phone?: string | null;
  reservations?: (number | Reservation)[] | null;
  stripeAccountId?: string | null;
  transacionCost?: number | null;
  availableFunds?: number | null;
  reservedFunds?: number | null;
  pendingFunds?: number | null;
  payoutsEnabled?: boolean | null;
  points?: number | null;
  servicePoints?: number | null;
  disabledReason?: string | null;
  address?: (number | null) | Address;
  detailsSubmitted?: boolean | null;
  role: 'admin' | 'user';
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  _verified?: boolean | null;
  _verificationToken?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "reservations".
 */
export interface Reservation {
  id: number;
  name?: string | null;
  owner: number | User;
  purchaser?: (number | null) | User;
  rareFind?: boolean | null;
  order?: (number | null) | Order;
  tos?: boolean | null;
  serviceFee?: boolean | null;
  date: string;
  timeInterval?: ('12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23') | null;
  tonight?: boolean | null;
  seats: number;
  score?: number | null;
  mealCredit?: number | null;
  price: number;
  restaurant: number | Restaurant;
  publicId?: string | null;
  priceId?: string | null;
  stripeId?: string | null;
  saleStatus?: ('sold' | 'pending' | 'withheld' | 'available') | null;
  adminComments?: string | null;
  approvedForSale?: ('pending' | 'approved' | 'denied') | null;
  reservationProof: number | Detail;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "orders".
 */
export interface Order {
  id: number;
  _isPaid: boolean;
  orderStatus?: ('paid' | 'pending' | 'failed' | 'initiated') | null;
  _pi?: string | null;
  _paidOut?: boolean | null;
  _paidOutDate?: string | null;
  serviceFee?: number | null;
  discount?: number | null;
  orderGroup?: string | null;
  sourceTransaction?: string | null;
  user?: (number | null) | User;
  sleeping: boolean;
  first: string;
  last: string;
  email: string;
  phone: string;
  reservation: number | Reservation;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "restaurants".
 */
export interface Restaurant {
  id: number;
  city?: (number | null) | City;
  name: string;
  composite?: string | null;
  slug?: string | null;
  trending?: number | null;
  location: number | Location;
  address: string;
  avg: number;
  description: string;
  recomendation: (number | Recomendation)[];
  signature: string;
  views: number;
  score: number;
  booked: number;
  cuisine: number | Cuisine;
  price: '4' | '3' | '2' | '1';
  michelin?: ('3' | '2' | '1' | '0') | null;
  live?: boolean | null;
  image: number | Media;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "cities".
 */
export interface City {
  id: number;
  name: string;
  slug?: string | null;
  live?: boolean | null;
  image: number | Media;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "locations".
 */
export interface Location {
  id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "recomendations".
 */
export interface Recomendation {
  id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "cuisines".
 */
export interface Cuisine {
  id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "details".
 */
export interface Detail {
  id: number;
  link: string;
  reservationFor: string;
  user?: (number | null) | User;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "addresses".
 */
export interface Address {
  id: number;
  street: string;
  streetSecondary?: string | null;
  city: string;
  state: string;
  zip: number;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "newsletters".
 */
export interface Newsletter {
  id: number;
  email: string;
  verified?: boolean | null;
  token?: string | null;
  user?: (number | null) | User;
  newsletter?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "search".
 */
export interface Search {
  id: number;
  title?: string | null;
  priority?: number | null;
  doc: {
    relationTo: 'restaurants';
    value: number | Restaurant;
  };
  city?: string | null;
  citySlug?: string | null;
  slug?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "nav".
 */
export interface Nav {
  id: number;
  items: {
    page?: (number | null) | Page;
    id?: string | null;
  }[];
  noPageItems?:
    | {
        title?: string | null;
        slug?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}