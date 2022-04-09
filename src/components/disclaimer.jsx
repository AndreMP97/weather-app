const Disclaimer = () => {
    return (
        <section class="showcase bg-secondary">
            <div class="container-fluid p-0">
                <div class="row g-0">
                    <div class="col-lg-6 order-lg-2 text-white showcase-img"></div>
                    <div class="col-lg-6 order-lg-1 my-auto showcase-text">
                        <h2 className="text-light">Demo</h2>
                        <p class="lead mb-0 text-light">This demo was developed with the goal to further learn the use of third-party APIs as well as Bootstrap while using React.</p>
                    </div>
                </div>
                <div class="row g-0">
                    <div class="col-lg-6 text-white showcase-img"></div>
                    <div class="col-lg-6 my-auto showcase-text">
                        <h2 className="text-light">API</h2>
                        <p class="lead mb-0 text-light">This Demo uses the <a href='https://docs.mapbox.com/api/search/geocoding/' className="link-light">Mapbox API</a> for location auto-complete and the <a href='https://www.weatherapi.com' className="link-light">Weather API</a> for the weather in the desired location.</p>
                    </div>
                </div>
                <div class="row g-0">
                    <div class="col-lg-6 order-lg-2 text-white showcase-img"></div>
                    <div class="col-lg-6 order-lg-1 my-auto showcase-text">
                        <h2 className="text-light">Sources</h2>
                        <p class="lead mb-0 text-light"><a href='https://github.com/StartBootstrap/startbootstrap-landing-page' className="link-light"> CSS</a></p>
                        <p class="lead mb-0 text-light"><a href='https://www.svgrepo.com/' className="link-light"> SVG</a></p>
                        <p class="lead mb-0 text-light"><a href='https://unsplash.com/photos/i2Q-6YN6uSg' className="link-light"> Background Photo</a></p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Disclaimer;