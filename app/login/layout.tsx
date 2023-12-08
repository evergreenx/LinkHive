export const metadata = {
  title: 'linkhive || login',
  description: ' '
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <section className=" flex flex-col h-screen w-full ">{children}</section>;
}
