import { lazy, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { fetchCurrentUser } from 'redux/auth/auth-options';
import style from './App.module.css';

// Pages and Components
import Navigation from '../components/Navigation/Navigation';
import { PrivateRoute } from 'components/PrivateRoute/PrivateRoute';
import { PublicRoute } from 'components/PublicRoute/PublicRoute';
// import Modal from 'components/Modal';

// const Navigation = lazy(() => import('../components/Navigation/Navigation'));
const HomePage = lazy(() => import('./HomePage/HomePage'));
const PhonebookPage = lazy(() => import('./PhonebookPage/PhonebookPage'));
const LoginPage = lazy(() => import('./LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('./RegisterPage/RegisterPage'));
const NotFoundPage = lazy(() => import('./NotFoundPage/NotFoundPage'));

function App() {
  const dispatch = useDispatch();
  const isFetchCurrentUser = useSelector(
    state => state.auth.isFetchCurrentUser
  );

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <Suspense
          fallback={
            // <Modal>
            //   <h1>Loading...</h1>
            // </Modal>
            <h1>Loading...</h1>
          }
        >
          <Routes>
            <Route path="/" element={<Navigation />}>
              {!isFetchCurrentUser ? (
                <>
                  <Route
                    index
                    path="/"
                    element={
                      <PublicRoute>
                        <HomePage />
                      </PublicRoute>
                    }
                  ></Route>

                  <Route
                    path="contacts"
                    element={
                      <PrivateRoute>
                        <PhonebookPage />
                      </PrivateRoute>
                    }
                  ></Route>

                  <Route
                    path="login"
                    element={
                      <PublicRoute restricted>
                        <LoginPage />
                      </PublicRoute>
                    }
                  ></Route>
                  <Route
                    path="register"
                    element={
                      <PublicRoute restricted>
                        <RegisterPage />
                      </PublicRoute>
                    }
                  ></Route>

                  <Route path="*" element={<NotFoundPage />}></Route>
                </>
              ) : (
                <>Smth wrong!</>
              )}
            </Route>
          </Routes>
        </Suspense>

        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
