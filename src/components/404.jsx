import NotFound from '../assets/svg/404.svg';

const Error = () => {
    return (
        <div className="container position-relative">
            <div className="row justify-content-center">
                <div className="col-xl-6">
                    <div className="text-center text-white">
                        <img src={NotFound} alt="404" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Error;