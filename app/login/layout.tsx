export const metadata = {
  title: 'Calensync',
  description: 'fix unnecessary discusion '
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <section className=" flex flex-col h-screen w-full ">{children}</section>;
}
