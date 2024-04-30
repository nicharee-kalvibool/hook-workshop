const DetailLoader = () => {
    return (
        <div className="flex pt-[85px] flex-col flex-1 items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
                <div className="w-[400px] h-[360px]">
                    <img
                        className="w-full h-full object-cover opacity-30"
                        src="/src/assets/images/pokemon-suggess.png"
                        alt=""
                    />
                </div>
                <span className="text-xl mt-5">Loading...</span>
            </div>
        </div>
    );
};

export default DetailLoader;
