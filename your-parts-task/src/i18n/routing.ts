import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/comments': {
      en: '/comments',
      ar: '/التعليقات'
    }
  }
});

export type Pathnames = keyof typeof routing.pathnames;


// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);