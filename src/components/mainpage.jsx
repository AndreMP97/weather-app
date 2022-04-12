import Form from './form';

const MainPage = () => {
    localStorage.removeItem("results");
    return (
        <main className="home vh-100">
            <div className="container homecontainer position-relative">
                <div className="row justify-content-center">
                    <div className="col-xl-6">
                        <div className="text-center text-white">
                            <h1 className="mb-4">How is the weather today?</h1>
                            <Form />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default MainPage;