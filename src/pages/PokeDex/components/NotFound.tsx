const NotFound = () => {
    return (
        <div className="flex pt-[85px] flex-col flex-1 items-center justify-center">
            <div className="flex flex-col items-center bg-black bg-opacity-20 rounded-md w-[50vw] p-10">
                <div className="w-[200px] h-[180px]">
                    <img
                        className="w-full h-full object-cover opacity-30"
                        src="/src/assets/images/pokemon-suggess.png"
                        alt=""
                    />
                </div>
                <span className="text-xl mt-5">Not Found Pokemon!</span>
            </div>
        </div>
    );
};

export default NotFound;
