import Form from './form';

const MainPage = () => {
    localStorage.removeItem("results");
    return (
        <header className="home">
            <div className="container position-relative">
                <div className="row justify-content-center">
                    <div className="col-xl-6">
                        <div className="text-center text-white">
                            <h1 className="mb-4">How is the weather today?</h1>
                            <Form />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default MainPage;