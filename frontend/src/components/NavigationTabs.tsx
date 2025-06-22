import { Tabs, Tab, AppBar } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const tabRoutes = [
  { label: 'Dashboard', path: '/' },
  { label: 'Add Transaction', path: '/add' },
  { label: 'History', path: '/history' },
  { label: 'Card Rules', path: '/cards' },
];

export default function NavigationTabs() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentTab = tabRoutes.findIndex(tab => tab.path === location.pathname) !== -1
    ? tabRoutes.findIndex(tab => tab.path === location.pathname)
    : 0;

  const handleChange = (_: any, newValue: number) => {
    navigate(tabRoutes[newValue].path);
  };

  return (
    <AppBar position="static" color="default" sx={{ mb: 2 }}>
      <Tabs
        value={currentTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        {tabRoutes.map((tab) => (
          <Tab key={tab.path} label={tab.label} />
        ))}
      </Tabs>
    </AppBar>
  );
} 