// import { setAuthenticated } from '@/lib/rtk/slice/authReducer';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const AuthComponent = (props: P) => {
        const router = useRouter();
        const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
        const dispatch = useDispatch();

        useEffect(() => {
            const authToken = getCookie('isAuthenticated');
            // dispatch(setAuthenticated(!!authToken));
        }, [dispatch]);

        useEffect(() => {
            if (!isAuthenticated) {
                router.push('/login');
            }
        }, [isAuthenticated, router]);

        return <WrappedComponent {...props} />;
    };

    return AuthComponent;
};

export default withAuth;