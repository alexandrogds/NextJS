import Form from '@components/Form';
import Menu from '@components/Menu';

export default function EditModulePage() {
  const handleSubmit = (data: Record<string, string>) => {
    console.log('Form submitted:', data);
  };

  const fields = [
    { name: 'name', label: 'Module Name', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'status', label: 'Status', type: 'select' },
  ];

  return (
    <>
      <Menu />
      <Form onSubmit={handleSubmit} fields={fields} />
    </>
  );
}
