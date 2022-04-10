import Form from './form';

const Header = () => {
    localStorage.clear();
    return (
        <header className="home">
            <div className="container position-relative">
                <div className="row justify-content-center">
                    <div className="col-xl-6">
                        <div className="text-center text-white">
                            <h1 className="mb-5">How is the weather today?</h1>
                            <Form />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;