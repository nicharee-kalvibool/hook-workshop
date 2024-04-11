import React from "react";

const Trick = () => {
    return (
        <div>
            {[
                {
                    name: "1",
                    type: "th",
                },
                {
                    name: "21",
                    type: "th",
                },
                {
                    name: "3",
                    type: "th",
                },
                {
                    name: "4",
                    type: "th",
                },
                {
                    name: "5",
                    type: "th",
                },
            ].map((val, index) => {
                const { name, type } = val;
                return <>{name}{type}</>;
            })}
        </div>
    );
};

export default Trick;
