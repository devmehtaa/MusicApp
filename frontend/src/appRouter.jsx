import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/login';

function appRouter() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoginPage/>}/>
                {/* <Route path='/home' element={}/>     */}
            </Routes>
        </BrowserRouter>
    )
};

export default appRouter;