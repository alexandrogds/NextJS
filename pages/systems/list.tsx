
import { useRouter } from 'next/router';
import Menu from '@components/Menu';

const SystemsListPage = () => {
  const router = useRouter();

  return (
    <>
      <Menu />
      {/* Your page content */}
    </>
  );
};

export default SystemsListPage;