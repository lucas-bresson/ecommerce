import { Nav, NavLink } from '../../components/Nav';

// see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const dynamic = 'force-dynamic';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <NavLink href='/'>Home</NavLink>
        <NavLink href='/products'>Products</NavLink>
        <NavLink href='/orders'>Orders</NavLink>
      </Nav>
      <div className='container mx-auto my-6 px-4'>{children}</div>
    </>
  );
}
