import Form from './form';

const MainPage = () => {
    localStorage.removeItem("results");
    return (
        <main className="masthead">
            <div className="container px-lg-5 d-flex h-100 align-items-center justify-content-center">
                <div className="row d-flex justify-content-center">
                    <div className="col-auto text-center text-white">
                        <h1 className="mb-4">How is the weather today?</h1>
                        <Form />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default MainPage;