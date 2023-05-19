
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import MusicType from './pages/musicType'
import Blog from './pages/Blog';
import Songs from './pages/musicList'
import User from './pages/User';
import NotFound from './pages/Page404';
import ArtistDetail from './components/artistDetail/artistDetail';
import TypePage from './components/typeDetail/typeDetail'


// ----------------------------------------------------------------------

export default function Router() {

  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'musictype', element: <MusicType /> },
        { path: 'songList', element: <Songs /> },
        { path: 'blog', element: <Blog /> },
        { path: 'artistPage', element: <ArtistDetail /> },
        { path: 'typePage', element: <TypePage /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/login" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
