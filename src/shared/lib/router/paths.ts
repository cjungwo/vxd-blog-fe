import { Path } from "./path.interface";

export const paths: Path[] = [
  {
    name: 'Home',
    path: '/',
    group: ['main', 'dev'],
  },
  {
    name: 'About',
    path: '/about',
    group: ['main'],
  },
  {
    name: 'Contact',
    path: '/contact',
    group: ['main'],
  },
  {
    name: 'Sign In',
    path: '/sign-in',
    group: 'dev',
  },
  {
    name: 'Sign Up',
    path: '/sign-up',
    group: 'dev',
  },
  {
    name: 'Post Detail',
    path: '/1',
    group: 'dev',
  },
  {
    name: 'Post Create',
    path: '/create-post',
    group: 'dev',
  },
];
