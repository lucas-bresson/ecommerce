import { Nav, NavLink } from '../components/Nav';

// see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const dynamic = 'force-dynamic';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <NavLink href='/admin'>Dashboard</NavLink>
        <NavLink href='/admin/products'>Products</NavLink>
        <NavLink href='/admin/users'>Customers</NavLink>
        <NavLink href='/admin/orders'>Sales</NavLink>
      </Nav>
      <div className='container mx-auto my-6'>{children}</div>
    </>
  );
}
