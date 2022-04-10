import NotFound from '../assets/svg/404.svg';

const Error = () => {
    return (
        <section className="notfound bg-secondary text-center">
            <div className="container">
                <img src={NotFound} alt="404" />
            </div>
        </section>
    );
}

export default Error;