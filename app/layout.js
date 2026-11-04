import './globals.css';

export const metadata = {
  title: 'Rental Management System',
  description: 'Manage properties, tenants, and payments.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
