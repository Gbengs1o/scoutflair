import { Metadata } from 'next';
import HomePage from './home/page';

export const metadata: Metadata = {
  title: 'Home',
};

export default async function LandingPage() {
  return (
    <HomePage />
  );
}
