// app/layout.tsx
import React from 'react';
import '../shared/styles/globals.scss';
export const metadata = {
  title: 'Trello Clone',
  description: 'Simple Trello Clone built with Next.js, TypeScript, and SCSS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}