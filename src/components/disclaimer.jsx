const Disclaimer = () => {
    localStorage.setItem("results", "true");
    return (
        <section className="disclaimer bg-secondary text-center">
            <div className="container">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    <div className="col">
                        <div className="card h-100">
                            <div className="card-header">
                                <h5 className="card-title">Demo</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text">This demo was developed with the goal to further learn the use of third-party APIs as well as Bootstrap v5 while using React.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card h-100">
                            <div className="card-header">
                                <h5 className="card-title">API</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text">This Demo uses the <a href='https://docs.mapbox.com/api/search/geocoding/' className="link-primary">Mapbox API</a> for location auto-complete and the <a href='https://www.weatherapi.com' className="link-primary">Weather API</a> for the weather in the desired location.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card h-100">
                            <div className="card-header">
                                <h5 className="card-title">Sources</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text"><a href='https://github.com/StartBootstrap/startbootstrap-landing-page' className="link-primary">Based on this CSS</a></p>
                                <p className="card-text"><a href='https://getbootstrap.com/docs/5.0/getting-started/introduction/' className="link-primary">Bootstrap v5.0</a></p>
                                <p className="card-text"><a href='https://unsplash.com/photos/i2Q-6YN6uSg' className="link-primary">Background Photo</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Disclaimer;